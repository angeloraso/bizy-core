import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { IBizyHeatMapChartData, IBizyHeatMapChartRange, IBizyHeatMapHighlightArea, IBizyHeatMapHighlightLine, IBizyHeatMapHighlightLineLabel } from './heat-map-chart.types';
import { DOCUMENT } from '@angular/common';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';

const DEFAULT_CHART_SIZE = '300px';

const DEFAULT_DOWNLOAD = {
  show: true,
  label: 'Descargar',
  name: 'Bizy'
};

const DEFAULT_TOOLTIP = {
  show: true
};

const DEFAULT_X_AXIS = {
  labels: [],
  position: 'top' as 'top' | 'bottom'
};

const DEFAULT_Y_AXIS = {
  labels: [],
  position: 'left' as 'left' | 'right'
};

const LINE_DASH_SOLID = [0, 0];
const LINE_DASH_DOTTED = [2, 4];
const LINE_DASH_DASH = [6, 6];

@Component({
  selector: 'bizy-heat-map-chart',
  template: '',
  styles: [`
    :host {
      display: flex;
      justify-content: center
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyHeatMapChartComponent implements OnDestroy, AfterViewInit {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);

  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: {show?: boolean, formatter?: (item: any ) => string} = DEFAULT_TOOLTIP
  @Input() download: {show?: boolean, label?: string, name?: string} = DEFAULT_DOWNLOAD;
  @Input() ranges: Array<IBizyHeatMapChartRange> | {data: Array<IBizyHeatMapChartRange>, label?: {start?: string, end?: string}} = [];
  @Input() highlightAreas: Array<IBizyHeatMapHighlightArea> | {data: Array<IBizyHeatMapHighlightArea>} = [];
  @Input() highlightLines: Array<IBizyHeatMapHighlightLine> | {data: Array<IBizyHeatMapHighlightLine>, label: {x: IBizyHeatMapHighlightLineLabel, y: IBizyHeatMapHighlightLineLabel}, slot?: 'start' | 'center' | 'end'} = [];
  @Input() xAxis: {labels: Array<string>, position: 'top' | 'bottom', formatter?: (item: any ) => string} = DEFAULT_X_AXIS;
  @Input() yAxis: {labels: Array<string>, position: 'left' | 'right', formatter?: (item: any ) => string} = DEFAULT_Y_AXIS;
  @Output() onDownload = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();

  #echarts: echarts.ECharts | null = null

  #resizeObserver: ResizeObserver | null = null;
  #afterViewInitSubscription = new Subscription();
  #resizeSubscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  #resize$ = new Subject<void>();
  #data:  Array<IBizyHeatMapChartData> = [];


  ngAfterViewInit() {
    this.#afterViewInit.next(true);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  @Input() set data(data: Array<IBizyHeatMapChartData> | null) {
    if (!data) {
      return;
    }

    if (data.length > 0) {
      this.#setChartData(data);
    } else {
      this.#deleteChartContainer();
    }
  }

  async #setChartData(data: Array<IBizyHeatMapChartData>) {
    this.#data = data;
    this.#afterViewInitSubscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      this.#createChartContainer()

      if (!this.#chartContainer) {
        return;
      }

      const series: Array<any> = [{
        type: 'heatmap',
        zlevel: 1,
        data: this.#data.map(_cell => {
          return {
            value: [_cell.x, _cell.y, _cell.value ?? '-'],
            metadata: _cell.metadata
          }
        })
      }];


      const xAreaBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-area-background-color');
      const xAreaBorderColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-area-border-color');
      const xAreaBorderWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-area-border-width');
      const yAreaBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-area-background-color');
      const yAreaBorderColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-area-border-color');
      const yAreaBorderWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-area-border-width');

      const xAreas: Array<[number, number]>  = []
      const yAreas: Array<[number, number]> = []
      const highlightAreas: Array<IBizyHeatMapHighlightArea> = (<{data: Array<IBizyHeatMapHighlightArea>}>this.highlightAreas).data ?? (<Array<IBizyHeatMapHighlightArea>>this.highlightAreas);
      highlightAreas.forEach(_area => {
        if (typeof _area.from.x !== 'undefined' || _area.from.x !== null) {
          xAreas.push([_area.from.x, _area.to.x]);
        } else {
          yAreas.push([_area.from.y, _area.to.y]);
        }
      });

      if (xAreas.length > 0) {
        series.push({
          type: 'custom',
          silent: true,
          renderItem: function (params, api) {
              var xStart = api.coord([api.value(0), 0])[0];
              var xEnd = api.coord([api.value(1), 0])[0];
              var cellWidth = Math.abs(xEnd - xStart) / (api.value(1) - api.value(0));

              return {
                  type: 'rect',
                  shape: {
                      x: xStart - cellWidth / 2,
                      y: params.coordSys.y,
                      width: Math.abs(xEnd - xStart) + cellWidth,
                      height: params.coordSys.height
                  },
                  style: {
                      fill: xAreaBackgroundColor,
                      stroke: xAreaBorderColor,
                      lineWidth: xAreaBorderWidth
                  },
                  silent: true,
                  z2: 100
              };
          },
          data: xAreas,
          zlevel: 5
        })
      };

      if (yAreas.length > 0) {
        series.push({
            type: 'custom',
            silent: true,
            renderItem: function (params, api) {
                var yStart = api.coord([0, api.value(0)])[1];
                var yEnd = api.coord([0, api.value(1)])[1];
                var cellHeight = Math.abs(yEnd - yStart) / (api.value(1) - api.value(0));

                return {
                    type: 'rect',
                    shape: {
                        x: params.coordSys.x,
                        y: yStart - cellHeight / 2,
                        width: params.coordSys.width,
                        height: Math.abs(yEnd - yStart) + cellHeight
                    },
                    style: {
                        fill: yAreaBackgroundColor,
                        stroke: yAreaBorderColor,
                        lineWidth: yAreaBorderWidth
                    },
                    silent: true,
                    z2: 100
                };
            },
            data: yAreas,
            zlevel: 5
        })
      }

      const xLineWidth = Number(this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-line-width'));
      const xLineColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-line-color');
      const xLineStyle = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-line-style');
      const xLineLabelColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-x-highlight-line-label-color');
      const yLineWidth = Number(this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-line-width'));
      const yLineColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-line-color');
      const yLineStyle = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-line-style');
      const yLineLabelColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-y-highlight-line-label-color');

      const xLines: Array<[number]>  = []
      const yLines: Array<[number]>  = []
      const highlightLineLabel = (<{label: {x: IBizyHeatMapHighlightLineLabel, y: IBizyHeatMapHighlightLineLabel}}>this.highlightLines)?.label ?? null;
      const highlightLines: Array<IBizyHeatMapHighlightLine> = (<{data: Array<IBizyHeatMapHighlightLine>}>this.highlightLines).data ?? (<Array<IBizyHeatMapHighlightLine>>this.highlightLines);
      highlightLines.forEach(_line => {
        if (typeof _line.x !== 'undefined' || _line.x !== null) {
          xLines.push([_line.x]);
        } else {
          yLines.push([_line.y]);
        }
      });

      const slot = (<{slot: 'start' | 'center' | 'end'}>this.highlightLines).slot ?? 'center';

      if (xLines.length > 0) {
        series.push({
          type: 'custom',
          renderItem: function (params, api) {
            const xValue = api.value(0);
        
            const yStart = params.coordSys.y;
            const yEnd = params.coordSys.y + params.coordSys.height;

            const cellWidth = Math.abs(api.coord([1, 0])[0] - api.coord([0, 0])[0]);
        
            const centerX = api.coord([xValue, 0])[0];

            const xCoord = slot === 'start' ? centerX - (cellWidth / 2) : slot === 'end' ? centerX + (cellWidth / 2) : centerX;

            const children: Array<any> = [{
              type: 'line',
              shape: {
                x1: xCoord,
                y1: yStart,
                x2: xCoord,
                y2: yEnd
              },
              style: {
                stroke: xLineColor,
                lineWidth: xLineWidth,
                lineDash: xLineStyle === 'solid' ? LINE_DASH_SOLID : xLineStyle === 'dotted' ? LINE_DASH_DOTTED : xLineStyle === 'dashed' ? LINE_DASH_DASH : LINE_DASH_SOLID
              },
              z: 100
            }]

            if (highlightLineLabel && highlightLineLabel.x) {
              const top = yStart - 5;
              const bottom = yEnd + 20;

              const label = {
                type: 'text',
                style: {
                  text: highlightLineLabel.x.formatter ? highlightLineLabel.x.formatter(xValue) : xValue,
                  x: xCoord,
                  y: highlightLineLabel.x.position === 'top' ? top : highlightLineLabel.x.position === 'bottom' ? bottom : bottom,
                  fill: xLineLabelColor,
                  textAlign: 'center',
                  textVerticalAlign: 'bottom'
                },
                z: 101
              }

              children.push(label)
            }
        
            return {
              type: 'group',
              children
            };
          },
          data: xLines,
          silent: true,
          zlevel: 10
        })
      };

      if (yLines.length > 0) {
        series.push({
          type: 'custom',
          renderItem: function (params, api) {
            const yValue = api.value(0);

            const xStart = params.coordSys.x;
            const xEnd = params.coordSys.x + params.coordSys.width;

            const cellHeight = Math.abs(api.coord([0, 1])[1] - api.coord([0, 0])[1]);

            const centerY = api.coord([0, yValue])[1];

            const yCoord = slot === 'start' ? centerY + (cellHeight / 2) : slot === 'end' ? centerY - (cellHeight / 2) : centerY;

            const children: Array<any> = [{
              type: 'line',
              shape: {
                x1: xStart,
                y1: yCoord,
                x2: xEnd,
                y2: yCoord
              },
              style: {
                stroke: yLineColor,
                lineWidth: yLineWidth,
                lineDash: yLineStyle === 'solid' ? LINE_DASH_SOLID : yLineStyle === 'dotted' ? LINE_DASH_DOTTED : yLineStyle === 'dashed' ? LINE_DASH_DASH : LINE_DASH_SOLID
              },
              z: 100
            }]

            if (highlightLineLabel && highlightLineLabel.y) {
              const left = xStart - 5;
              const right = xEnd + 20;

              const label = {
                type: 'text',
                style: {
                  text: highlightLineLabel.y.formatter ? highlightLineLabel.y.formatter(yValue) : yValue,
                  x: yCoord,
                  y: highlightLineLabel.y.position === 'left' ? left : highlightLineLabel.y.position === 'right' ? right : right,
                  fill: yLineLabelColor,
                  textAlign: 'right',
                  textVerticalAlign: 'middle'
                },
                z: 101
              }

              children.push(label)
            }
        
            return {
              type: 'group',
              children
            };
          },
          data: yLines,
          silent: true,
          zlevel: 10
        })
      };

  
      const tooltip = {
        show: this.tooltip?.show ?? DEFAULT_TOOLTIP.show,
        trigger: 'item',
        appendToBody: true,
        formatter: this.tooltip?.formatter
      }

      const xAxis = [
        {
          type: 'category',
          splitArea: {
            show: true
          },
          position: this.xAxis?.position ?? DEFAULT_X_AXIS.position,
          data: this.xAxis?.labels ?? DEFAULT_X_AXIS.labels,
          axisLabel: {
            formatter: this.xAxis?.formatter,
          }
        }
      ];

      const yAxis = [
        {
          type: 'category',
          position: this.yAxis?.position ?? DEFAULT_Y_AXIS.position,
          data: this.yAxis?.labels ?? DEFAULT_Y_AXIS.labels,
          splitArea: {
            show: true
          },
          axisLabel: {
            formatter: this.yAxis?.formatter,
          }
        }
      ];

      const outOfRangeColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-out-of-range-color');

      let text: [string | null, string | null] | null = null;
      let pieces: Array<IBizyHeatMapChartRange> = [];
      if (Array.isArray(this.ranges)) {
        pieces = this.ranges;
      } else if (this.ranges && this.ranges.data) {
        pieces = this.ranges.data;
        if (this.ranges.label?.start) {
          text = [null, this.ranges.label.start];
        }

        if (this.ranges.label?.end) {
          text = [this.ranges.label.end, text && text[1] ? text[1] : null];
        }
      }


      const visualMap = {
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        text,
        showLabel: true,
        pieces,
        outOfRange: {
          color: outOfRangeColor
        }
      };

      const textColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-tooltip-color');
      const textBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-tooltip-background-color');
      const borderColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-tooltip-border-color');

      const toolbox = {
        show: true,
        feature: {
          mySaveAsImage: {
            show: this.download.show ?? DEFAULT_DOWNLOAD.show,
            icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
            title: this.download.label ?? DEFAULT_DOWNLOAD.label,
            onclick: () => {
              setTimeout(() => {
                import('html2canvas').then(module => {
                const html2canvas = module.default;
                  html2canvas(this.#chartContainer).then(canvas => {
                      var link = this.#renderer.createElement('a');
                      link.href = canvas.toDataURL('image/png');
                      link.download = `${this.download.name ?? DEFAULT_DOWNLOAD.name}.png`;
                      this.#renderer.appendChild(this.#document.body, link);
                      link.click();
                      this.#renderer.removeChild(this.#document.body, link);
                      this.onDownload.emit();
                  });
                });
              }, 500);
            }
          },
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

      const grid = {
        left: 0,
        right: 0,
        containLabel: true
      }

      const option: any = {
        tooltip,
        xAxis,
        yAxis,
        toolbox,
        series,
        visualMap,
        grid
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

    let minWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-width');
    let minHeight = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-height');

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
