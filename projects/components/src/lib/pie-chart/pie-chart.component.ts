import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  Output,
  Renderer2,
  EventEmitter
} from '@angular/core';
import * as echarts from 'echarts';
import { IBizyPieChartData } from './pie-chart.types';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subject, Subscription, auditTime, filter, skip, take, throttleTime } from 'rxjs';

const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350 // px;

@Component({
  selector: 'bizy-pie-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyPieChartComponent {
  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: boolean = true;
  @Input() name: string = 'Bizy';
  @Input() downloadLabel: string = 'Descargar';
  @Input() onTooltipFormatter: (item: any ) => string;
  @Output() onSelect = new EventEmitter<string>();

  #echarts: echarts.ECharts | null = null

  #mutationObserver: MutationObserver | null = null;
  #resizeObserver: ResizeObserver | null = null;
  #subscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  #resize$ = new Subject<void>();
  #data:  Array<{name: string, value: number, itemStyle: {color?: string}}> | typeof EMPTY_CHART = EMPTY_CHART;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (this.elementRef && this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.offsetHeight)) {
        this.#afterViewInit.next(true);
        this.#mutationObserver.disconnect();
      }
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  @Input() set data(data: Array<IBizyPieChartData>) {
    if (!data) {
      return;
    }

    if (data.length > 0) {
      this.#setChartData(data);
    } else {
      this.#deleteChartContainer();

      this.#setChartData(EMPTY_CHART);
    }
  }

  async #setChartData(data: Array<IBizyPieChartData> | typeof EMPTY_CHART) {
    this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      this.#createChartContainer()

      if (!this.#chartContainer) {
        return;
      }

      if (data && data.length > 0 && data[0] !== 0) {
        this.#data = [];
        (<Array<IBizyPieChartData>>data).forEach(_d => {
          if (!_d.value) {
            _d.value = 0;
          }

          if (!_d.name) {
            _d.name = '---'
          }

          const itemStyle = _d.color ? {color: _d.color} : {};
          
          (<Array<{name: string, value: number, itemStyle: {color?: string}}>>this.#data).push({
              name: _d.name,
              value: _d.value,
              itemStyle
            })
        });
      } else {
        this.#data = EMPTY_CHART;
      }

      const series = [{
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: this.#data,
        normal: {
          label: {
            position: 'outer',
            formatter: this.onTooltipFormatter
          },
          labelLine: {
            show: true
          }
        }
      }];

      const textColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-color') ?? '#000';
      const textBackgroundColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-background-color') ?? '#fff';
      const borderColor = getComputedStyle(this.document.documentElement).getPropertyValue('--bizy-tooltip-border-color') ?? '#fff';

      const toolbox = {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            name: this.name,
            title: this.downloadLabel
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

      const tooltip = {
        show: this.tooltip,
        trigger: 'item',
        appendToBody: true,
        formatter: this.onTooltipFormatter
      }

      const option: any = {
        tooltip,
        toolbox,
        series
      };
      
      this.#echarts = echarts.init(this.#chartContainer);
      this.#echarts.setOption(option);
      this.#echarts.on('click', params => {
        this.onSelect.emit(params.name)
      });

      this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
      const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
      this.#resizeObserver.observe(resizeRef);
      this.#subscription.add(this.#resize$.pipe(skip(1), auditTime(300), throttleTime(500)).subscribe(() => {
        this.#deleteChartContainer();
        this.#createChartContainer();

        if (!this.#chartContainer) {
          return;
        }

        this.#echarts = echarts.init(this.#chartContainer);
        this.#echarts.setOption({...option, series: option.series.map(_serie => { return {..._serie, data: this.#data}})});
        this.#echarts.on('click', params => {
          this.onSelect.emit(params.name)
        });
      }));
    }));
  }

  #createChartContainer = () => {
    if (this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
      return;
    }

    let elementWidth = this.elementRef.nativeElement.offsetWidth || MIN_CHART_SIZE;
    let elementHeight = this.elementRef.nativeElement.offsetHeight || MIN_CHART_SIZE;

    let minWidth = MIN_CHART_SIZE;
    let minHeight = MIN_CHART_SIZE;
    const chartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-width');
    const pieChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-height');
    if (Number(chartMinWidth)) {
      minWidth = Number(chartMinWidth);
    }
    if (Number(pieChartMinHeight)) {
      minHeight = Number(pieChartMinHeight);
    }
    
    const width = Math.max(elementWidth, minWidth);
    const height = Math.max(elementHeight, minHeight);

    this.#chartContainer = this.renderer.createElement('div');
    this.renderer.setStyle(this.#chartContainer, 'width', `${width}px`);
    this.renderer.setStyle(this.#chartContainer, 'height', `${height}px`);
    this.renderer.appendChild(this.elementRef.nativeElement, this.#chartContainer);
    this.ref.detectChanges();
  }

  #deleteChartContainer = () => {
    if (!this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
      return;
    }

    this.#echarts.clear();
    this.renderer.removeChild(this.elementRef.nativeElement, this.#chartContainer);
    this.#chartContainer = null;
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }

    if (this.#echarts) {
      this.#echarts.clear();
    }
  }

}
