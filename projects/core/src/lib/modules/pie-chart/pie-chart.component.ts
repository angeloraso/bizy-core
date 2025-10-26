import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  Renderer2,
  EventEmitter,
  DOCUMENT,
  inject
} from '@angular/core';
import { IBizyPieChartData } from './pie-chart.types';

import { BehaviorSubject, Subject, Subscription, auditTime, filter, skip, take, throttleTime } from 'rxjs';
import { BizyPieChartPopupComponent } from './pie-chart-popup.component';
import { BizyPopupService } from '../popup';

const EMPTY_CHART = [0];
const DEFAULT_CHART_SIZE = '300px';

const DEFAULT_DOWNLOAD = {
  show: true,
  label: 'Descargar',
  name: 'Bizy'
}

const DEFAULT_EXPAND = {
  show: true,
  label: 'Expandir'
}

const DEFAULT_TOOLTIP = {
  show: true
}


@Component({
  selector: 'bizy-pie-chart',
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
export class BizyPieChartComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);
  readonly #popup = inject(BizyPopupService);

  @Input() resizeRef: HTMLElement | null = null;
  @Input() type: 'pie' | 'donut' = 'pie';
  @Input() centerLabel: {value: string | number, color?: string} | null = null;
  @Input() tooltip: {show?: boolean, formatter?: (item: any ) => string} = DEFAULT_TOOLTIP
  @Input() legend: {show?: boolean, orient?: 'vertical' | 'horizontal', position?: {x: 'left' | 'right' | 'center', y: 'top' | 'bottom' | 'center'}} | null = null;
  @Input() download: {show?: boolean, label?: string, name?: string} = DEFAULT_DOWNLOAD;
  @Input() expand: { show?: boolean, label?: string} = DEFAULT_EXPAND;
  @Input() label: { show?: boolean, overflow?: 'break' | 'truncate', line: boolean, formatter?: (item: any ) => string} | null = null;
  @Output() onSelect = new EventEmitter<string>();
  @Output() onDownload = new EventEmitter<void>();

  #echarts: echarts.ECharts | null = null

  #resizeObserver: ResizeObserver | null = null;
  #afterViewInitSubscription = new Subscription();
  #resizeSubscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  #resize$ = new Subject<void>();
  #data:  Array<IBizyPieChartData> | typeof EMPTY_CHART = EMPTY_CHART;

  ngAfterViewInit() {
    this.#afterViewInit.next(true);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  @Input() set data(data: Array<IBizyPieChartData> | null) {
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
    this.#afterViewInitSubscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
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

      const itemStyle = this.type === 'donut' ? 
        {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        } : {};

      const label = this.label ?
        {
          show: this.label.show ?? true,
          overflow: this.label.overflow ?? 'break',
          formatter: this.label?.formatter
        } :
        this.type === 'pie' ?
        {
          show: true
        } :
        { 
          show: false,
          position: 'center'
        };
  
        const labelLine = {
          show: this.label?.line ?? true
        }

      const series = [{
        type: 'pie',
        radius: this.type === 'pie' ? '50%' : ['50%', '70%'],
        center: ['50%', '50%'],
        data: this.#data,
        itemStyle,
        label,
        labelLine
      }];

      const textColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-tooltip-color');
      const textBackgroundColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-tooltip-background-color');
      const borderColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-tooltip-border-color');


      const toolbox = {
        show: true,
        feature: {
          mySaveAsImage: {
            show: this.download.show ?? DEFAULT_DOWNLOAD.show,
            icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
            title:  this.download.label ?? DEFAULT_DOWNLOAD.label,
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
          myExpandChart: {
            show: this.expand.show ?? DEFAULT_EXPAND.show,
            icon: 'path://M264 96L120 96C106.7 96 96 106.7 96 120L96 264C96 273.7 101.8 282.5 110.8 286.2C119.8 289.9 130.1 287.8 137 281L177 241L256 320L177 399L137 359C130.1 352.1 119.8 350.1 110.8 353.8C101.8 357.5 96 366.3 96 376L96 520C96 533.3 106.7 544 120 544L264 544C273.7 544 282.5 538.2 286.2 529.2C289.9 520.2 287.9 509.9 281 503L241 463L320 384L399 463L359 503C352.1 509.9 350.1 520.2 353.8 529.2C357.5 538.2 366.3 544 376 544L520 544C533.3 544 544 533.3 544 520L544 376C544 366.3 538.2 357.5 529.2 353.8C520.2 350.1 509.9 352.1 503 359L463 399L384 320L463 241L503 281C509.9 287.9 520.2 289.9 529.2 286.2C538.2 282.5 544 273.7 544 264L544 120C544 106.7 533.3 96 520 96L376 96C366.3 96 357.5 101.8 353.8 110.8C350.1 119.8 352.2 130.1 359 137L399 177L320 256L241 177L281 137C287.9 130.1 289.9 119.8 286.2 110.8C282.5 101.8 273.7 96 264 96z',
            title: this.expand.label ?? DEFAULT_EXPAND.label,
            onclick: () => {
              this.#popup.open({
                component: BizyPieChartPopupComponent,
                data: {
                  download: {
                    show: this.download?.show ?? DEFAULT_DOWNLOAD.show, 
                    label: this.download?.label ?? DEFAULT_DOWNLOAD.label, 
                    name: this.download?.name ?? DEFAULT_DOWNLOAD.name, 
                  },
                  option: this.#echarts.getOption()
                }
              })
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

      const tooltip = {
        show: this.tooltip?.show ?? DEFAULT_TOOLTIP.show,
        trigger: 'item',
        appendToBody: true,
        formatter: this.tooltip?.formatter
      };

      let legend: any = {};
      if (this.legend) {
        legend.show = this.legend.show;
        legend.orient = this.legend.orient;
        legend.left = this.legend.position ? this.legend.position.x : 'auto';
        legend.top = this.legend.position ? this.legend.position.y : 'auto';
      } else {
        legend = this.type === 'pie' ? { show: false } : {
          show: true,
          orient: 'vertical',
          left: 'left'
        };
      }

      let graphic: any;
      if (this.centerLabel) {
        let centerLabelColor = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-center-label-color');
        let { width, height } = this.#chartContainer.getBoundingClientRect();
        let base = Math.min(width, height);
        let fontSize = base / 6;
        graphic = {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: String(this.centerLabel.value),
            fill: this.centerLabel.color || centerLabelColor,
            textAlign: 'center',
            fontSize,
            fontWeight: 'bold'
          }
        };
      }

      const option: any = {
        tooltip,
        toolbox,
        legend,
        series,
        graphic
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
              this.#echarts.setOption({...option, series: option.series.map(_serie => { return {..._serie, data: this.#data}})});
              this.#echarts.on('click', params => {
                this.onSelect.emit(params.name)
              });
            });
          }));
        });
      })
    }));
  }

  #createChartContainer = () => {
    if (this.#chartContainer || !this.#elementRef || !this.#elementRef.nativeElement) {
      return;
    }

    let elementWidth = this.#elementRef.nativeElement.offsetWidth;
    let elementHeight = this.#elementRef.nativeElement.offsetHeight;

    let minWidth = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-width');
    let minHeight = this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-height');

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

    const rootValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
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
