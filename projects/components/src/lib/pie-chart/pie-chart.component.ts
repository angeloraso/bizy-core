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
import { DOCUMENT, DecimalPipe,  } from '@angular/common';
import { BehaviorSubject, Subject, Subscription, auditTime, filter, skip, take, throttleTime } from 'rxjs';

const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350 // px;

@Component({
  selector: 'bizy-pie-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyPieChartComponent {
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() fixedTo = 2;
  @Input() resizeRef: ElementRef = null;
  @Input() downloadLabel: string = 'Descargar';
  @Output() onSelect = new EventEmitter<string>();
  @Input() onFormatter: (item: any ) => string = (item: any) => {
    return `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, `1.${this.fixedTo}-${this.fixedTo}`)}${this.suffix} (${item.percent.toFixed(this.fixedTo).replaceAll('.', ',')}%)`;
  }

  #echarts: echarts.ECharts | null = null

  #mutationObserver: MutationObserver | null = null;
  #resizeObserver: ResizeObserver | null = null;
  #subscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  #resize$ = new Subject<void>();
  #data:  Array<IBizyPieChartData> | typeof EMPTY_CHART = EMPTY_CHART;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(DecimalPipe) private decimalPipe: DecimalPipe
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
    this.#data = data;
    this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {

      this.#createChartContainer()

      if (!this.#chartContainer) {
        return;
      }

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
          formatter: this.onFormatter
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
                  formatter: this.onFormatter
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
    const pieChartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-pie-chart-min-width');
    const pieChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-pie-chart-min-height');
    if (Number(pieChartMinWidth)) {
      minWidth = Number(pieChartMinWidth);
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
