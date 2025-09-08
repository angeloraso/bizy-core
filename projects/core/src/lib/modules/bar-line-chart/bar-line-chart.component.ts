import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  DOCUMENT,
  inject
} from '@angular/core';
import { IBizyBarLineChartData } from './bar-line-chart.types';
import { CommonModule } from '@angular/common';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';

const Y_AXIS_OFFSET = 80;
const GRID_BOTTOM = 30;
const DEFAULT_CHART_SIZE = '300px';
@Component({
  selector: 'bizy-bar-line-chart',
  template: '',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBarLineChartComponent implements OnDestroy, AfterViewInit {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);

  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: { show?: boolean, formatter?: (item: any ) => string} | null = null;
  @Input() download: {show?: boolean, label?: string, name?: string} | null = null;
  @Input() axisPointer: 'line' | 'cross' = 'line';
  @Input() xAxis: { labels?: Array<string>, formatter?: (item: any ) => string} | null = null;
  @Output() onDownload = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();

  #echarts: echarts.ECharts | null = null

  #resizeObserver: ResizeObserver | null = null;
  #afterViewInitSubscription = new Subscription();
  #resizeSubscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  #resize$ = new Subject<void>();
  #data:  Array<IBizyBarLineChartData> = [];

  #rightYAxis: number = 0;
  #leftYAxis: number = 0;
  #chartStacks: Array<string> = [];
  #chartNames: Array<string> = [];

  ngAfterViewInit() {
    this.#afterViewInit.next(true);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  @Input() set data(data: Array<IBizyBarLineChartData> | null) {
    if (!data) {
      return;
    }

    if (data.length > 0) {
      this.#setChartData(data);
    } else {
      this.#deleteChartContainer();
    }
  }

  async #setChartData(data: Array<IBizyBarLineChartData>) {
    this.#data = data;
    this.#rightYAxis = 0;
    this.#leftYAxis = 0;
    this.#chartStacks = [];
    this.#chartNames = [];
    this.#afterViewInitSubscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      this.#createChartContainer()

      if (!this.#chartContainer) {
        return;
      }

      const series: Array<any> = [];
      const legends: Array<string> = [];
      const yAxis: Array<any> = [];
  
      this.#data.forEach((_d, _i) => {
        if (!_d.type) {
          _d.type = 'bar';
        }

        if (!_d.values) {
          _d.values = [];
        }

        const axisLine = {
          show: true,
          lineStyle: {}
        };

        const color = {
          lineStyle: {
            color: null
          },
          itemStyle: {
              color: null
          }
        };

        if (_d.color) {
          axisLine.lineStyle = {
            color: _d.color
          }

          color.lineStyle.color = _d.color;
          color.itemStyle.color = _d.color;
        }

        let position = 'right';
        let offset = 0;
        let max: number | undefined = undefined;
        let min: number | undefined = undefined;
        let interval: number | undefined = undefined;
        let formatter = null
        const xName = _d.xAxi &&  _d.xAxi.name ?  _d.xAxi.name : _d.label;
        let yName = _d.label;

        if (_d.yAxi) {
          formatter = _d.yAxi.onValueFormatter;
          position = _d.yAxi.position ? _d.yAxi.position : _d.type === 'bar' ? 'right' : 'left';
          if (_d.yAxi.name) {
            yName = _d.yAxi.name;
          }

          if (_d.yAxi.hide) {
            axisLine.show = false;
            formatter = null;
          } else {
            if (_d.yAxi.max || _d.yAxi.max === 0) {
              max = _d.yAxi.max;
            }
  
            if (_d.yAxi.min || _d.yAxi.min === 0) {
              min = _d.yAxi.min;
            }

            if (_d.yAxi.interval || _d.yAxi.interval === 0) {
              interval = _d.yAxi.interval;
            }
          }
        }

        if (!_d.yAxi || !_d.yAxi.hide) {
          if (position === 'right') {
            offset = this.#rightYAxis * Y_AXIS_OFFSET;
            this.#rightYAxis++;
          } else {
            offset = this.#leftYAxis * Y_AXIS_OFFSET;
            this.#leftYAxis++;
          }
        }

        yAxis.push({
          type: 'value',
          name: _d.yAxi && _d.yAxi.hide ? '' : yName,
          position,
          min,
          max,
          interval,
          alignTicks: true,
          offset,
          axisLine,
          axisLabel: { formatter }
        });
  
        legends.push(xName);

        let yAxisIndex = _i;
        if (_d.stack) {
          const _index = this.#chartStacks.findIndex(_stack => _stack === _d.stack);
          if (_index !== -1) {
            yAxisIndex = _index;
          } else {
            this.#chartStacks.push(_d.stack);
          }
        }

        const _index = this.#chartNames.findIndex(_name => _name === yName);
        if (_index !== -1) {
          yAxisIndex = _index;
        } else {
          this.#chartNames.push(yName);
        }
  
        if (_d.barMinHeight) {
          const values = _d.values.map(v => v > 0 ? v : '-'); // use '-' for missing data
          const emptyValues = _d.values.map(v => v === 0 ? 0 : '-');

          series.push({...{
            type: _d.type,
            name: xName,
            yAxisIndex,
            smooth: !_d.discrete,
            stack: _d.stack,
            barMinHeight: _d.barMinHeight,
            data: values
          }, ...color});

          series.push({...{
            type: _d.type,
            name: '-',
            yAxisIndex,
            smooth: !_d.discrete,
            stack: _d.stack,
            data: emptyValues
          }, ...color});
        } else {
          series.push({...{
            type: _d.type,
            name: xName,
            yAxisIndex,
            smooth: !_d.discrete,
            stack: _d.stack,
            data: _d.values
          }, ...color});
        }
      });

      const tooltip = {
        show: this.tooltip?.show,
        trigger: 'axis',
        appendToBody: true,
        axisPointer: {
          type: this.axisPointer
        },
        formatter: this.tooltip?.formatter
      }

      const grid = {
        left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
        right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
        bottom: GRID_BOTTOM,
        containLabel: true
      };

      const xAxis = [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: this.xAxis?.labels,
          axisLabel: {
            formatter: this.xAxis.formatter,
          }
        }
      ];

      const legend = {
        type: 'scroll',
        bottom: 0,
        data: legends
      };
      const textColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-tooltip-color');
      const textBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-tooltip-background-color');
      const borderColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-tooltip-border-color');

      const downloadTitle = this.download?.label || 'Descargar';
      const downloadName = this.download?.name || 'bizy_chart';

      const toolbox = {
        show: true,
        feature: {
          mySaveAsImage: {
            show: this.download?.show ?? false,
            icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
            title: downloadTitle,
            onclick: () => {
              const showAllLegends = (chart: echarts.ECharts) => {
                  const option = chart.getOption();
                  option.legend[0].type = 'plain';
                  option.grid = {
                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                    bottom: `${Math.max(option.legend[0].data.length, 5)}%`,
                    containLabel: true
                  };
                  chart.setOption(option);
              }

              const restoreLegendType = (chart: echarts.ECharts) => {
                  const option = chart.getOption() as any;
                  option.legend[0].type = 'scroll';
                  option.grid = {
                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                    bottom: GRID_BOTTOM,
                    containLabel: true
                  };
                  chart.setOption(option);
              }

              showAllLegends(this.#echarts);

              setTimeout(() => {
                  import('html2canvas').then(module => {
                    const html2canvas = module.default;
                    html2canvas(this.#chartContainer).then(canvas => {
                        var link = this.#renderer.createElement('a');
                        link.href = canvas.toDataURL('image/png');
                        link.download = downloadName;
                        this.#renderer.appendChild(this.#document.body, link);
                        link.click();
                        this.#renderer.removeChild(this.#document.body, link);
                        restoreLegendType(this.#echarts);
                        this.onDownload.emit();
                    });
                  });
              }, 500);
            }
          }
        },
        emphasis: {
          iconStyle: {
            color: textColor,
            borderColor,
            borderWidth: 1,
            textBackgroundColor,
            textPadding: 5,
          }
        }
      };

      const option: any = {
        tooltip,
        legend,
        grid,
        xAxis,
        yAxis,
        toolbox,
        series
      };

      import('echarts').then(echarts => {
        this.#echarts = echarts.init(this.#chartContainer);
        this.#echarts.setOption(option);
        this.#echarts.on('click', params => {
            this.onSelect.emit(params.name)
        });
  
        this.#resizeSubscription.unsubscribe();
        this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.#renderer.parentNode(this.#elementRef.nativeElement) ? this.#renderer.parentNode(this.#elementRef.nativeElement) : this.#elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#resizeSubscription = new Subscription();
        this.#resizeSubscription.add(this.#resize$.pipe(skip(1), auditTime(300), throttleTime(500)).subscribe(() => {
          this.#deleteChartContainer();
          this.#createChartContainer();
  
          if (!this.#chartContainer) {
            return;
          }
  
          this.#echarts = echarts.init(this.#chartContainer);
          this.#echarts.setOption(option);
          this.#echarts.on('click', params => {
            this.onSelect.emit(params.name)
          });
        }));
      });
    }));
  }

  #createChartContainer = () => {
    if (this.#chartContainer || !this.#elementRef || !this.#elementRef.nativeElement) {
      return;
    }

    let elementWidth = this.#elementRef.nativeElement.offsetWidth;
    let elementHeight = this.#elementRef.nativeElement.offsetHeight;

    let minWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-width');
    let minHeight = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-height');

    const width = minWidth ? minWidth : elementWidth ? `${elementWidth}px` : DEFAULT_CHART_SIZE;
    const height = minHeight ? minHeight : elementHeight ? `${elementHeight}px` : DEFAULT_CHART_SIZE;

    this.#chartContainer = this.#renderer.createElement('div');
    this.#renderer.setStyle(this.#chartContainer, 'width', width);
    this.#renderer.setStyle(this.#chartContainer, 'height', height);
    this.#renderer.appendChild(this.#elementRef.nativeElement, this.#chartContainer);
    this.#ref.detectChanges();
  }

  #deleteChartContainer = () => {
    if (!this.#chartContainer || !this.#elementRef || !this.#elementRef.nativeElement) {
      return;
    }

    this.#echarts.clear();
    this.#renderer.removeChild(this.#elementRef.nativeElement, this.#chartContainer);
    this.#chartContainer = null;
    this.#ref.detectChanges();
  }

  #getClosestCssVariable = (element: HTMLElement, cssVariable: string): string | null => {
    while (element) {
      const value = getComputedStyle(element).getPropertyValue(cssVariable).trim();
      if (value) {
        return value;
      }
      element = element.parentElement as HTMLElement;
    }

    const rootValue = getComputedStyle(this.#document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue;
  }

  ngOnDestroy() {
    this.#afterViewInitSubscription.unsubscribe();
    this.#resizeSubscription.unsubscribe();

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }

    if (this.#echarts) {
      this.#echarts.clear();
    }
  }
}
