import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
  Renderer2
} from '@angular/core';
import { BIZY_BAR_LINE_CHART_AXIS_POSITION, IBizyBarLineChartDownload, IBizyBarLineChartTooltip } from './bar-line-chart.types';
import { CommonModule, DOCUMENT } from '@angular/common';
import { debounceTime, Subject, Subscription, throttleTime } from 'rxjs';
import { BizyBarLineChartPopupComponent } from './bar-line-chart-popup.component';
import { BizyBarChartComponent } from './bar-chart/bar-chart.component';
import { BizyLineChartComponent } from './line-chart/line-chart.component';
import { BizyPopupService } from '../popup';

enum BIZY_BAR_LINE_CHART_TYPE {
  BAR = 'bar',
  LINE = 'line'
}

enum BIZY_BAR_LINE_CHART_AXIS_TYPE {
  INDEPENDENT = 'category',
  DEPENDENT = 'value'
}

const Y_AXIS_OFFSET = 50;
const X_AXIS_OFFSET = 50;
const DEFAULT_CHART_SIZE = '300px';

const DEFAULT_DOWNLOAD = {
  show: true,
  label: 'Descargar',
  fileName: 'Bizy'
}

const DEFAULT_TOOLTIP = {
  show: true
}
@Component({
  selector: 'bizy-bar-line-chart',
  template: '<ng-content select="bizy-bar-chart"></ng-content><ng-content select="bizy-line-chart"></ng-content>',
  imports: [CommonModule],
  styles: [`
    :host {
      display: flex;
      justify-content: center
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBarLineChartComponent implements AfterContentInit {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);
  readonly #popup = inject(BizyPopupService);

  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: IBizyBarLineChartTooltip = DEFAULT_TOOLTIP
  @Input() download: IBizyBarLineChartDownload = DEFAULT_DOWNLOAD;
  @Output() onDownload = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();

  @ContentChildren(BizyBarChartComponent) barCharts: QueryList<BizyBarChartComponent> | null = null;
  @ContentChildren(BizyLineChartComponent) lineCharts: QueryList<BizyLineChartComponent> | null = null;
  

  #echarts: any = null;
  #echartsContainer: echarts.ECharts | null = null

  #resizeObserver: ResizeObserver | null = null;
  #resizeSubscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #resize$ = new Subject<void>();
  #barChartsSubscription = new Subscription();
  #barChartChangesSubscription = new Subscription();
  #lineChartsSubscription = new Subscription();
  #lineChartChangesSubscription = new Subscription();
  #renderSubscription = new Subscription();
  #render = new Subject<void>();

  #gridTop: number = 0;
  #gridRight: number = 0;
  #gridBottom: number = 0;
  #gridLeft: number = 0;
  #chartStacks: Array<string> = [];
  #chartNames: Array<string> = [];
  #chartGroups: Map<string, number> = new Map();

  ngAfterContentInit() {
    import('echarts').then(echarts => {
      this.#echarts = echarts;

      this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
      const resizeRef = this.resizeRef ? this.resizeRef : this.#renderer.parentNode(this.#elementRef.nativeElement) ? this.#renderer.parentNode(this.#elementRef.nativeElement) : this.#elementRef.nativeElement;
      this.#resizeObserver.observe(resizeRef);
      this.#resizeSubscription = new Subscription();
      this.#resizeSubscription.add(this.#resize$.subscribe(() => {
        this.#render.next();
      }));

      this.lineCharts.forEach(_lineChart => {
        this.#lineChartChangesSubscription.add(_lineChart.changes$.subscribe(() => {
          this.#render.next();
        }))
      });

      this.barCharts.forEach(_barChart => {
        this.#barChartChangesSubscription.add(_barChart.changes$.subscribe(() => {
          this.#render.next();
        }))
      });

      this.#barChartsSubscription.add(this.barCharts.changes.subscribe(_barCharts => {
        this.#barChartChangesSubscription.unsubscribe();
        this.#barChartChangesSubscription = new Subscription();
        this.#render.next();

        _barCharts.forEach(_barChart => {
          this.#barChartChangesSubscription.add(_barChart.changes$.subscribe(() => {
            this.#render.next();
          }))
        });
      }));

      this.#lineChartsSubscription.add(this.lineCharts.changes.subscribe(_lineCharts => {
        this.#lineChartChangesSubscription.unsubscribe();
        this.#lineChartChangesSubscription = new Subscription();
        this.#render.next();

        _lineCharts.forEach(_lineChart => {
          this.#lineChartChangesSubscription.add(_lineChart.changes$.subscribe(() => {
            this.#render.next();
          }))
        });
      }));


      this.#renderSubscription.add(this.#render.asObservable().pipe(debounceTime(150), throttleTime(300)).subscribe(() => {
          this.render();
        })
      );

      this.#render.next();
    });
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  render = () => {
    this.#deleteChartContainer();

    this.#gridTop = 0;
    this.#gridRight = 0;
    this.#gridBottom = 0;
    this.#gridLeft = 0;
    this.#chartStacks = [];
    this.#chartNames = [];
    this.#chartGroups.clear();

    this.#createChartContainer()

    if (!this.#chartContainer) {
      return;
    }

    const series: Array<any> = [];
    const xAxis: Array<any> = [];
    const yAxis: Array<any> = [];
    const legends = new Set<string>();

    const defaultYAxisColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-y-axis-color');
    const defaultXAxisColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-line-chart-x-axis-color');

    this.lineCharts.forEach((_line, _i) => {
      let axisIndex = _i;

      const lineXAxis = _line.xAxis;
      const lineYAxis = _line.yAxis;

      const xAxisType = !lineXAxis || typeof lineXAxis.independent === 'undefined' ? BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT : lineXAxis?.independent ? BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT : BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT
      const yAxisType = !lineYAxis || typeof lineYAxis.independent === 'undefined' ? BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT : lineYAxis?.independent ? BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT : BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT

      if (lineYAxis) {
        const show = typeof lineYAxis.show === 'undefined' ? true : lineYAxis.show;

        if (show && yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && !_line.name) {
          _line.name = lineYAxis.name;
        }

        const position = lineYAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.RIGHT || lineYAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.LEFT ? lineYAxis.position : BIZY_BAR_LINE_CHART_AXIS_POSITION.LEFT;
        const thereIsOtherVisibleYAxis = (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.LEFT && this.#gridLeft > 0 || position === BIZY_BAR_LINE_CHART_AXIS_POSITION.RIGHT && this.#gridRight > 0) ;
        const offset = show && thereIsOtherVisibleYAxis && typeof lineYAxis.offset !== 'undefined' ? lineYAxis.offset : show && thereIsOtherVisibleYAxis ? Y_AXIS_OFFSET : 0;
        const color = _line.getYAxisColor() ? _line.getYAxisColor() : yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && _line.getColor() ? _line.getColor() : defaultYAxisColor;
        
        if (lineYAxis.group && yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT) {
          const _axisIndex = this.#chartGroups.get(lineYAxis.group);
          if (typeof _axisIndex !== 'undefined') {
              axisIndex = _axisIndex;
          } else {
            this.#chartGroups.set(lineYAxis.group, axisIndex);
          }
        }

        yAxis.push({
          type: yAxisType,
          name: lineYAxis?.name,
          id: _line.name,
          show,
          position,
          offset,
          min: lineYAxis?.min,
          max: lineYAxis?.max,
          interval: lineYAxis?.interval,
          alignTicks: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? true : undefined,
          axisTick: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? { alignWithLabel: true } : undefined,
          data: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? _line.values.map(_v => _v.y) : [],
          axisPointer: {
            type: 'line',
            show: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT,
          },
          axisLine: {
            show,
            lineStyle: {
              color
            }
          },
          axisLabel: {
            show,
            color,
            formatter: lineYAxis.formatter
          }
        });

        if (show) {
          if (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.RIGHT) {
            this.#gridRight += typeof lineYAxis.offset !== 'undefined' ? Number(lineYAxis.offset) : Y_AXIS_OFFSET;
          } else {
            this.#gridLeft += typeof lineYAxis.offset !== 'undefined' ? Number(lineYAxis.offset): Y_AXIS_OFFSET;
          }
        }
      }

      if (lineXAxis) {
        const show = typeof lineXAxis.show === 'undefined' ? true : lineXAxis.show;

        if (show && xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && !_line.name) {
          _line.name = lineYAxis.name;
        }

        const position = lineXAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.TOP || lineXAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.BOTTOM ? lineXAxis.position : BIZY_BAR_LINE_CHART_AXIS_POSITION.BOTTOM;
        const thereIsOtherVisibleXAxis = (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.TOP && this.#gridTop > 0 || position === BIZY_BAR_LINE_CHART_AXIS_POSITION.BOTTOM && this.#gridBottom > 0);
        const offset = show && thereIsOtherVisibleXAxis && typeof lineXAxis.offset !== 'undefined' ? lineXAxis.offset : show && thereIsOtherVisibleXAxis ? X_AXIS_OFFSET : 0;
        const color = _line.getXAxisColor() ? _line.getXAxisColor() : xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && _line.getColor() ? _line.getColor() : defaultXAxisColor;

        if (lineXAxis.group && xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT) {
          const _axisIndex = this.#chartGroups.get(lineXAxis.group);
          if (typeof _axisIndex !== 'undefined') {
              axisIndex = _axisIndex;
          } else {
            this.#chartGroups.set(lineXAxis.group, axisIndex);
          }
        }

        xAxis.push({
          type: xAxisType,
          name: lineXAxis?.name,
          id: _line.name,
          show,
          position,
          offset,
          min: lineXAxis?.min,
          max: lineXAxis?.max,
          interval: lineXAxis?.interval,
          alignTicks: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? true : undefined,
          axisTick: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? { alignWithLabel: true } : undefined,
          data: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? _line.values.map(_v => _v.x) : [],
          axisPointer: {
            type: 'line',
            show: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT,
          },
          axisLine: {
            show,
            lineStyle: {
              color,
            }
          },
          axisLabel: {
            show,
            color,
            formatter: lineXAxis.formatter
          }
        });

        if (show) {
          if (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.TOP) {
            this.#gridTop += typeof lineXAxis.offset !== 'undefined' ? Number(lineXAxis.offset) : X_AXIS_OFFSET;
          } else {
            this.#gridBottom += typeof lineXAxis.offset !== 'undefined' ? Number(lineXAxis.offset): X_AXIS_OFFSET;
          }
        }
      }

      if (axisIndex !== _i) {
        const _name = this.#chartNames.find(_name => _name === _line.name);
        if (_name) {
          const index = series.findIndex(_s => _s.name === _name);
          if (index !== -1) {
            axisIndex = index;
          }
        } else {
          this.#chartNames.push(_line.name);
        }
      }

      series.push({
        type: BIZY_BAR_LINE_CHART_TYPE.LINE,
        name: _line.name,
        yAxisIndex: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
        xAxisIndex: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
        symbolSize: 5,
        itemStyle: {
          color: _line.getColor() ?? null
        },
        lineStyle: {
          color: _line.getColor() ?? null
        },
        smooth: !_line.discrete,
        data: _line.values.map(_v => xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? Number(_v.y) : Number(_v.x))
      });

      legends.add(_line.name);
    });

    this.barCharts.forEach((_bar, _i) => {
      let axisIndex = _i + this.lineCharts.length;

      const barXAxis = _bar.xAxis;
      const barYAxis = _bar.yAxis;

      const xAxisType = !barXAxis || typeof barXAxis.independent === 'undefined' ? BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT : barXAxis?.independent ? BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT : BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT
      const yAxisType = !barYAxis || typeof barYAxis.independent === 'undefined' ? BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT : barYAxis?.independent ? BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT : BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT

      if (barYAxis) {
        const show = typeof barYAxis.show === 'undefined' ? true : barYAxis.show;

        if (show && yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && !_bar.name) {
          _bar.name = barYAxis.name;
        }

        const position = barYAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.RIGHT || barYAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.LEFT ? barYAxis.position : BIZY_BAR_LINE_CHART_AXIS_POSITION.LEFT;
        const thereIsOtherVisibleYAxis = (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.LEFT && this.#gridLeft > 0 || position === BIZY_BAR_LINE_CHART_AXIS_POSITION.RIGHT && this.#gridRight > 0) ;
        const offset = show && thereIsOtherVisibleYAxis && typeof barYAxis.offset !== 'undefined' ? barYAxis.offset : show && thereIsOtherVisibleYAxis ? Y_AXIS_OFFSET : 0;
        const color = _bar.getYAxisColor() ? _bar.getYAxisColor() : yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && _bar.getColor() ? _bar.getColor() : defaultYAxisColor;

        if (barYAxis.group && yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT) {
          const _axisIndex = this.#chartGroups.get(barYAxis.group);
          if (typeof _axisIndex !== 'undefined') {
              axisIndex = _axisIndex;
          } else {
            this.#chartGroups.set(barYAxis.group, axisIndex);
          }
        }

        yAxis.push({
          type: yAxisType,
          name: barYAxis?.name,
          id: _bar.name,
          show,
          position,
          offset,
          min: barYAxis?.min,
          max: barYAxis?.max,
          interval: barYAxis?.interval,
          alignTicks: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? true : undefined,
          axisTick: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? { alignWithLabel: true } : undefined,
          data: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? _bar.values.map(_v => _v.y) : [],
          axisPointer: {
            type: 'line',
            show: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT,
          },
          axisLine: {
            show,
            lineStyle: {
              color,
              width: _bar.getYAxisWidth()
            }
          },
          axisLabel: {
            show,
            color,
            formatter: barYAxis.formatter
          }
        });

        if (show) {
          if (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.RIGHT) {
            this.#gridRight += typeof barYAxis.offset !== 'undefined' ? Number(barYAxis.offset) : Y_AXIS_OFFSET;
          } else {
            this.#gridLeft += typeof barYAxis.offset !== 'undefined' ? Number(barYAxis.offset): Y_AXIS_OFFSET;
          }
        }
      }

      if (barXAxis) {
        const show = typeof barXAxis.show === 'undefined' ? true : barXAxis.show;

        if (show && xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && !_bar.name) {
          _bar.name = barYAxis.name;
        }

        const position = barXAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.TOP || barXAxis.position === BIZY_BAR_LINE_CHART_AXIS_POSITION.BOTTOM ? barXAxis.position : BIZY_BAR_LINE_CHART_AXIS_POSITION.BOTTOM;
        const thereIsOtherVisibleXAxis = (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.TOP && this.#gridTop > 0 || position === BIZY_BAR_LINE_CHART_AXIS_POSITION.BOTTOM && this.#gridBottom > 0);
        const offset = show && thereIsOtherVisibleXAxis && typeof barXAxis.offset !== 'undefined' ? barXAxis.offset : show && thereIsOtherVisibleXAxis ? X_AXIS_OFFSET : 0;
        const color = _bar.getXAxisColor() ? _bar.getXAxisColor() : xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT && _bar.getColor() ? _bar.getColor() : defaultXAxisColor;

        if (barXAxis.group && xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT) {
          const _axisIndex = this.#chartGroups.get(barXAxis.group);
          if (typeof _axisIndex !== 'undefined') {
              axisIndex = _axisIndex;
          } else {
            this.#chartGroups.set(barXAxis.group, axisIndex);
          }
        }

        xAxis.push({
          type: xAxisType,
          name: barXAxis?.name,
          id: _bar.name,
          show,
          position,
          offset,
          min: barXAxis?.min,
          max: barXAxis?.max,
          interval: barXAxis?.interval,
          alignTicks: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? true : undefined,
          axisTick: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? { alignWithLabel: true } : undefined,
          data: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? _bar.values.map(_v => _v.x) : [],
          axisPointer: {
            type: 'line',
            show: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT,
          },
          axisLine: {
            show,
            lineStyle: {
              color,
              width: _bar.getXAxisWidth()
            }
          },
          axisLabel: {
            show,
            color,
            formatter: barXAxis.formatter
          }
        });

        if (show) {
          if (position === BIZY_BAR_LINE_CHART_AXIS_POSITION.TOP) {
            this.#gridTop += typeof barXAxis.offset !== 'undefined' ? Number(barXAxis.offset) : X_AXIS_OFFSET;
          } else {
            this.#gridBottom += typeof barXAxis.offset !== 'undefined' ? Number(barXAxis.offset): X_AXIS_OFFSET;
          }
        }
      }

      if (axisIndex !== (_i + this.lineCharts.length)) {
        if (_bar.stack) {
          const _stack = this.#chartStacks.find(_stack => _stack === _bar.stack);
          if (_stack) {
            const index = series.findIndex(_s => _s.stack === _stack);
            if (index !== -1) {
              axisIndex = yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? series[index].yAxisIndex : series[index].xAxisIndex;
            }
          } else {
            this.#chartStacks.push(_bar.stack);
          }
        } else {
          const _name = this.#chartNames.find(_name => _name === _bar.name);
          if (_name) {
            const index = series.findIndex(_s => _s.name === _name);
            if (index !== -1) {
              axisIndex = index;
            }
          } else {
            this.#chartNames.push(_bar.name);
          }
        }
      }

      if (_bar.getMinHeight()) {
        const values = _bar.values.map(_v => {
          const value = xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? Number(_v.y) : Number(_v.x); 
          return value > 0 ? value : '-'; // use '-' for missing data
        });

        const emptyValues = _bar.values.map(_v => {
          const value = xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? Number(_v.y) : Number(_v.x); 
          return value === 0 ? 0 : '-';
        });

        series.push({
          type: BIZY_BAR_LINE_CHART_TYPE.BAR,
          name: _bar.name,
          yAxisIndex: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
          xAxisIndex: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
          stack: _bar.stack,
          barMinHeight: _bar.getMinHeight(),
          itemStyle: {
            color: _bar.getColor() ?? null
          },
          data: values,
        });

        series.push({
          type: BIZY_BAR_LINE_CHART_TYPE.BAR,
          name: '-',
          yAxisIndex: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
          xAxisIndex: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
          stack: _bar.stack,
          itemStyle: {
            color: _bar.getColor() ?? null
          },
          data: emptyValues,
        });
      } else {
        series.push({
          type: BIZY_BAR_LINE_CHART_TYPE.BAR,
          name: _bar.name,
          yAxisIndex: yAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
          xAxisIndex: xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.DEPENDENT ? axisIndex : undefined,
          stack: _bar.stack,
          barMinHeight: _bar.getMinHeight(),
          itemStyle: {
            color: _bar.getColor() ?? null
          },
          data: _bar.values.map(_v => xAxisType === BIZY_BAR_LINE_CHART_AXIS_TYPE.INDEPENDENT ? Number(_v.y) : Number(_v.x))
        });
      }

      legends.add(_bar.name);
    });

    const tooltip = {
      show: this.tooltip?.show ?? DEFAULT_TOOLTIP.show,
      appendToBody: true,
      confine: true,
      trigger: 'axis',
      axisPointer: {
        show: false
      },
      formatter: this.tooltip?.formatter
    }

    const grid = {
      left: this.#gridLeft,
      right: this.#gridRight,
    };

    const legend = {
      type: 'scroll',
      bottom: 0,
      data: Array.from(legends)
    };

    const textColor = getComputedStyle(this.#document.documentElement).getPropertyValue('--bizy-bar-line-chart-tooltip-color');
    const textBackgroundColor = getComputedStyle(this.#document.documentElement).getPropertyValue('--bizy-bar-line-chart-tooltip-background-color');
    const borderColor = getComputedStyle(this.#document.documentElement).getPropertyValue('--bizy-bar-line-chart-tooltip-border-color');

    const toolbox = {
      show: true,
      feature: {
        mySaveAsImage: {
          show: this.download.show ?? DEFAULT_DOWNLOAD.show,
          icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
          title: this.download.label ?? DEFAULT_DOWNLOAD.label,
          onclick: () => {
            this.#popup.open({
              disableCloseButton: true,
              disableBackdropClose: true,
              component: BizyBarLineChartPopupComponent,
              data: {
                download: {
                  name: this.download?.fileName ?? DEFAULT_DOWNLOAD.fileName, 
                },
                grid: {
                  left: this.#gridLeft,
                  right: this.#gridRight
                },
                option: this.#echartsContainer.getOption()
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

    this.#echartsContainer = this.#echarts.init(this.#chartContainer);
    this.#echartsContainer.setOption(option);
    this.#echartsContainer.on('click', params => {
        this.onSelect.emit(params.name)
    });
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

    this.#echartsContainer.clear();
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

    const rootValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
  }

  ngOnDestroy() {
    this.#resizeSubscription.unsubscribe();
    this.#barChartsSubscription.unsubscribe();
    this.#barChartChangesSubscription.unsubscribe();
    this.#lineChartsSubscription.unsubscribe();
    this.#lineChartChangesSubscription.unsubscribe();
    this.#renderSubscription.unsubscribe();

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }

    if (this.#echartsContainer) {
      this.#echartsContainer.clear();
    }
  }
}
