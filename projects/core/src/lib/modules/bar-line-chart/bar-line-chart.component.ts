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

import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';
import { BizyPopupService } from '../popup';
import { BizyBarLineChartPopupComponent } from './bar-line-chart-popup.component';

const GRID_BOTTOM = 30;
const Y_AXIS_OFFSET = 50;
const DEFAULT_CHART_SIZE = '300px';

const DEFAULT_DOWNLOAD = {
  show: true,
  label: 'Descargar',
  name: 'Bizy'
}

const DEFAULT_TOOLTIP = {
  show: true
};
@Component({
  selector: 'bizy-bar-line-chart',
  template: '',
  styles: [`
    :host {
      display: flex;
      justify-content: center
    }
  `],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBarLineChartComponent implements OnDestroy, AfterViewInit {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);
  readonly #popup = inject(BizyPopupService);

  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: {show?: boolean, formatter?: (item: any ) => string} = DEFAULT_TOOLTIP
  @Input() download: {show?: boolean, label?: string, name?: string} = DEFAULT_DOWNLOAD;
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

  #gridLeft: number = 0;
  #gridRight: number = 0;
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
    this.#gridLeft = 0;
    this.#gridRight = 0;
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
        let max: number | undefined = undefined;
        let min: number | undefined = undefined;
        let interval: number | undefined = undefined;
        let formatter = null
        const xName = _d.xAxi &&  _d.xAxi.name ? _d.xAxi.name : _d.label;
        let yName = _d.label;
        let show = true;

        if (_d.yAxi) {
          if (typeof _d.yAxi.show !== 'undefined' && _d.yAxi.show !== null) {
            show = Boolean(_d.yAxi.show);
          }

          formatter = _d.yAxi.onValueFormatter;
          position = _d.yAxi.position ? _d.yAxi.position : _d.type === 'bar' ? 'right' : 'left';
          if (_d.yAxi.name) {
            yName = _d.yAxi.name;
          }

          if (!show) {
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

        yAxis.push({
          type: 'value',
          name: yName,
          id: xName,
          offset: show && (position === 'left' && this.#gridLeft > 0 || position === 'right' && this.#gridRight > 0) && _d.yAxi && typeof _d.yAxi.width !== 'undefined' ? _d.yAxi.width : show && (position === 'left' && this.#gridLeft > 0 || position === 'right' && this.#gridRight > 0) ? Y_AXIS_OFFSET : 0,          show,
          position,
          min,
          max,
          interval,
          alignTicks: true,
          axisLine,
          axisLabel: { formatter }
        });

        if (show) {
          if (position === 'right') {
            this.#gridRight += typeof _d.yAxi.width !== 'undefined' ? _d.yAxi.width : Y_AXIS_OFFSET;
          } else {
            this.#gridLeft += typeof _d.yAxi.width !== 'undefined' ? _d.yAxi.width : Y_AXIS_OFFSET;
          }
        }
  
        legends.push(xName);

        let yAxisIndex = _i;
        if (_d.stack) {
          const _stack = this.#chartStacks.find(_stack => _stack === _d.stack);
          if (_stack) {
            const index = series.findIndex(_s => _s.stack === _stack);
            if (index !== -1) {
              yAxisIndex = series[index].yAxisIndex;
            }
          } else {
            this.#chartStacks.push(_d.stack);
          }
        } else {
          const _name = this.#chartNames.find(_name => _name === yName);
          if (_name) {
            const index = this.#data.findIndex(_d => (_d.yAxi && _d.yAxi.name === _name) || (_d.label === _name));
            if (index !== -1) {
              yAxisIndex = index;
            }
          } else {
            this.#chartNames.push(yName);
          }
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
        show: this.tooltip?.show ?? DEFAULT_TOOLTIP.show,
        trigger: 'axis',
        appendToBody: true,
        axisPointer: {
          type: this.axisPointer
        },
        formatter: this.tooltip?.formatter
      }

      const grid = {
        left: this.#gridLeft,
        right: this.#gridRight,
      };

      const xAxis = [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: this.xAxis?.labels,
          axisLabel: {
            formatter: this.xAxis?.formatter,
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

      const toolbox = {
        show: true,
        feature: {
          mySaveAsImage: {
            show: this.download?.show ?? DEFAULT_DOWNLOAD.show,
            icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
            title: this.download?.label ?? DEFAULT_DOWNLOAD.label,
            onclick: () => {
              this.#popup.open({
                disableCloseButton: true,
                disableBackdropClose: true,
                component: BizyBarLineChartPopupComponent,
                data: {
                  download: {
                    name: this.download?.name ?? DEFAULT_DOWNLOAD.name, 
                  },
                  grid: {
                    left: this.#gridLeft,
                    right: this.#gridRight
                  },
                  option: this.#echarts.getOption()
                }
              });
              this.onDownload.emit();
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
        Promise.resolve().then(() => {
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
            Promise.resolve().then(() => {
              this.#echarts.setOption(option);
              this.#echarts.on('click', params => {
                this.onSelect.emit(params.name)
              });
            });
          }));
        });
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
