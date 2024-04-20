import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
} from '@angular/core';
import * as echarts from 'echarts';
import { IBizyPieChartData } from './pie-chart.types';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import { BehaviorSubject, Subscription, filter, take } from 'rxjs';

const EMPTY_CHART = [0];

@Component({
  selector: 'bizy-pie-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyPieChartComponent {
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() downloadLabel: string = 'Descargar';

  #mutationObserver: MutationObserver | null = null;
  #subscription = new Subscription();
  #afterViewInit = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(DecimalPipe) private decimalPipe: DecimalPipe
  ) {}

  ngAfterViewInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (this.elementRef.nativeElement && this.elementRef.nativeElement.offsetWidth && this.elementRef.nativeElement.offsetHeight) {
        this.#afterViewInit.next(true);
        this.#mutationObserver.disconnect();
      }
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  @Input() set data(data: Array<IBizyPieChartData>) {
    if (data && data.length > 0) {
      this.#setChartData(data);
    } else if (data && data.length === 0) {
      this.#setChartData(EMPTY_CHART);
    }
  }

  async #setChartData(data: Array<IBizyPieChartData> | typeof EMPTY_CHART) {
    this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      const color: Array<string> = [];
      let total = 0;
      data.forEach(_d => {
        total += (_d as IBizyPieChartData).value;
        if ((_d as IBizyPieChartData).color) {
          color.push((_d as IBizyPieChartData).color as string);
        }
      });

      const option: any = {
        tooltip: {
          trigger: 'item',
          formatter: (item: any) => `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, '1.2-2')}${this.suffix} (${item.percent.toFixed(2)}%)`
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              title: this.downloadLabel
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
            center: ['50%', '50%'],
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
                    return `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, '1.2-2')}${this.suffix} (${item.percent.toFixed(2)}%)`;
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
      echarts.init(this.elementRef.nativeElement).setOption(option);
    }));
  }

  ngOnDestroy() {
    this.#mutationObserver.disconnect();
    this.#subscription.unsubscribe();
  }

}
