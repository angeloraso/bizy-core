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
import { IBizyHeatMapChartData, IBizyHeatMapChartRange } from './heat-map-chart.types';
import { CommonModule, DOCUMENT } from '@angular/common';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';
import html2canvas from 'html2canvas';

const DEFAULT_CHART_SIZE = '300px'

@Component({
  selector: 'bizy-heat-map-chart',
  template: '',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyHeatMapChartComponent implements OnDestroy, AfterViewInit {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);

  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: { show?: boolean, formatter?: (item: any ) => string} | null = null;
  @Input() download: {show?: boolean, label?: string, name?: string} | null = null;
  @Input() ranges: Array<IBizyHeatMapChartRange> = [];
  @Input() xAxis: { labels?: Array<string>, formatter?: (item: any ) => string} | null = null;
  @Input() yAxis: { labels?: Array<string>, formatter?: (item: any ) => string} | null = null;
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
        data: this.#data.map(_cell => [_cell.x, _cell.y, _cell.value ?? '-'])
      }];
  
      const tooltip = {
        show: this.tooltip,
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
          position: 'top',
          data: this.xAxis?.labels,
          axisLabel: {
            formatter: this.xAxis?.formatter,
          }
        }
      ];

      const yAxis = [
        {
          type: 'category',
          data: this.yAxis?.labels,
          splitArea: {
            show: true
          },
          axisLabel: {
            formatter: this.yAxis?.formatter,
          }
        }
      ];

      const outOfRangeColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-out-of-range-color');

      const visualMap = {
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        pieces: this.ranges,
        outOfRange: {
          color: outOfRangeColor
        }
      };

      const textColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-tooltip-color');
      const textBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-tooltip-background-color');
      const borderColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-heat-map-chart-tooltip-border-color');

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
              setTimeout(() => {
                  html2canvas(this.#chartContainer).then(canvas => {
                      var link = this.#renderer.createElement('a');
                      link.href = canvas.toDataURL('image/png');
                      link.download = downloadName;
                      this.#renderer.appendChild(this.#document.body, link);
                      link.click();
                      this.#renderer.removeChild(this.#document.body, link);
                      this.onDownload.emit();
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
        xAxis,
        yAxis,
        toolbox,
        series,
        visualMap
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
