import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Renderer2
} from '@angular/core';
import * as echarts from 'echarts';
import { IPieChartData } from './pie-chart.types';
import { DOCUMENT, DecimalPipe } from '@angular/common';

const EMPTY_CHART = [0];

@Component({
  selector: 'bizy-pie-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
  @Input() title = '';
  @Input() currency = '';
  @Input() saveAsImageButtonLabel: string = 'Descargar';
  @Input() isCurrency: boolean = false;
  @Input() decimals: number = 2;
  @Input() height: number;
  @Input() width: number;

  chartContainer: HTMLDivElement | null = null;

  constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(DecimalPipe) private decimalPipe: DecimalPipe
  ) {}

  @Input() set data(data: Array<IPieChartData>) {
    if (data && data.length > 0) {
      this.#setChartData(data);
    } else if (data && data.length === 0) {
      if (this.chartContainer) {
        this.renderer.removeChild(this.elementRef.nativeElement, this.chartContainer);
        this.chartContainer = null;
      }

      this.#setChartData(EMPTY_CHART);
    }
  }

  async #setChartData(data: Array<IPieChartData> | typeof EMPTY_CHART) {
    let size = {width: this.width, height: this.height};
    if (!this.width || !this.height) {
      size = await this.#getChartSize();
    }

    if (!this.chartContainer) {
      this.chartContainer = this.renderer.createElement('div');
      this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
      this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
      this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer)
    }

    const color: Array<string> = [];
    let total = 0;
    data.forEach(_d => {
      total += (_d as IPieChartData).value;
      if ((_d as IPieChartData).color) {
        color.push((_d as IPieChartData).color as string);
      }
    });

    const option: any = {
      tooltip: {
        trigger: 'item',
        formatter: (item: any) => `${item.name}: ${this.currency ? this.currency + this.decimalPipe.transform(item.value, '1.2-2') : this.decimalPipe.transform(item.value, '1.2-2')} (${item.percent.toFixed()}%)`
      },
      title: {
        show: this.title,
        text: this.title,
        left: 'left',
        textStyle: {
          color: '#2484c6',
          width: this.width - 40,
          overflow: 'break'
        },
        subtext: `Total: ${this.currency ? this.currency + this.decimalPipe.transform(total, '1.2-2') : this.decimalPipe.transform(total, '1.2-2')}`
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: this.saveAsImageButtonLabel
          }
        },
        iconStyle: {
          emphasis: {
            textAlign: 'right'
          }
        }
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: this.width >= 576 ? ['50%', '50%'] : ['50%', '65%'],
          data,
          itemStyle: {
            emphasis: {
              label: {
                show: true
              }
            },
            normal: {
              label: {
                position: 'outer',
                formatter: (item: any) => {
                  return `${item.name}: ${this.currency ? this.currency + this.decimalPipe.transform(item.value, '1.2-2') : this.decimalPipe.transform(item.value, '1.2-2')} (${item.percent.toFixed()}%)`;
                }
              },
              labelLine: {
                show: true
              }
            }
          }
        }
      ]
    };

    if (color.length > 0 && color.length === data.length) {
      option.color = color;
    }

    echarts.init(this.chartContainer!).setOption(option);
  }

  #getChartSize(): Promise<{width: number, height: number}> {
    return new Promise<{width: number, height: number}>(resolve => {
      const mutationObserver = new MutationObserver(() => {
        const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
        if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
          let width = this.width || parentRef.offsetWidth;
          let height = this.height || parentRef.offsetHeight;

          mutationObserver.disconnect();
          resolve({width, height});
        }
      });

      mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    })
  }
}
