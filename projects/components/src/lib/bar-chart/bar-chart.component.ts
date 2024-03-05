import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Renderer2
} from '@angular/core';
import * as echarts from 'echarts';
import { IBarChartData } from './bar-chart.types';
import { DOCUMENT, DecimalPipe } from '@angular/common';

@Component({
  selector: 'bizy-bar-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  @Input() saveAsImageButtonLabel: string = 'Descargar';
  @Input() xLabelPrefix: string = '';
  @Input() xLabelSuffix: string = '';
  @Input() yLabelPrefix: string = '';
  @Input() yLabelSuffix: string = '';
  @Input() labelsX: Array<string> = [];
  @Input() height: number;
  @Input() width: number;
  @Input() tooltip: boolean = true;

  chartContainer: HTMLDivElement | null = null;

  @Input() set data(data: Array<IBarChartData>) {
    if (data && data.length > 0) {
      this.#setChartData(data);
    }
  }

  constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(DecimalPipe) private decimalPipe: DecimalPipe
  ) {}

  async #setChartData(data: Array<IBarChartData>) {
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

    const _data = [];
    const legendData: Array<string> = [];
    data.forEach(_d => {
      if (_d.color) {
        color.push(_d.color);
      }

      legendData.push(_d.name);

      _data.push({
        type: 'bar',
        id: _d.id ?? String(Math.random()),
        name: _d.name,
        smooth: true,
        data: !_d.values || _d.values.length === 0 ? [0] : _d.values
      });
    });

    const option: any = {
      tooltip: {
        show: this.tooltip,
        trigger: 'axis',
        appendToBody: true,
        formatter: this.#tooltipFormatter
      },
      legend: {
        y: 'bottom',
        padding: [0, 0, 0, 0],
        data: legendData
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
      xAxis: [
        {
          type: 'category',
          data: this.labelsX,
          axisLabel: {
            formatter: `${this.xLabelPrefix}{value}${this.xLabelSuffix}`,
            fontSize: 10,
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: `${this.yLabelPrefix}{value}${this.yLabelSuffix}`,
            fontSize: 10
          }
        }
      ],
      series: _data
    };

    option.grid = {
      bottom: `${Math.max(legendData.length * 2.4, 10)}%`,
      containLabel: true,
      left: '3%',
      right: '3%' 
    };

    if (color.length > 0) {
      option.color = color;
    }

    if ((legendData.length / 18) > 1) {
      this.renderer.setStyle(this.chartContainer, 'height', `${this.height * (legendData.length / 18)}px`);
    }

    echarts.init(this.chartContainer!).setOption(option);
  }

  #tooltipFormatter = (params: Array<any>) => {
    let tooltip = `${params[0].name}`;
    const barParam = params.filter(_param => _param.componentSubType === 'bar');

    barParam.forEach(_param => {
      const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
      tooltip += `<br/>${bullet} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
    });

    return tooltip;
  }

  #getChartSize(): Promise<{width: number, height: number}> {
    return new Promise<{width: number, height: number}>(resolve => {
      const mutationObserver = new MutationObserver(() => {
        const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
        if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
          let width = (this.width || parentRef.offsetWidth);
          let height = (this.height || parentRef.offsetHeight);

          mutationObserver.disconnect();
          resolve({width, height});
        }
      });

      mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    })
  }
}
