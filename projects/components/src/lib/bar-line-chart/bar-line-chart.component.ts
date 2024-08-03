import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import * as echarts from 'echarts';
import { IBizyBarLineChartData } from './bar-line-chart.types';
import { DOCUMENT } from '@angular/common';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';

const MIN_CHART_SIZE = 350 // px;
const Y_AXIS_OFFSET = 80;
@Component({
  selector: 'bizy-bar-line-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBarLineChartComponent implements OnDestroy, AfterViewInit {
  @Input() resizeRef: HTMLElement | null = null;
  @Input() tooltip: boolean = true;
  @Input() downloadLabel: string = 'Descargar';
  @Input() name: string = 'Bizy';
  @Input() axisPointer: 'line' | 'cross' = 'line';
  @Input() xAxisLabels: Array<string> = [];
  @Input() onTooltipFormatter: (item: any ) => string;
  @Input() onXAxisLabelFormatter: (item: any ) => string;
  @Output() onSelect = new EventEmitter<string>();

  #echarts: echarts.ECharts | null = null

  #mutationObserver: MutationObserver | null = null;
  #resizeObserver: ResizeObserver | null = null;
  #subscription = new Subscription();
  #chartContainer: HTMLDivElement | null = null;
  #afterViewInit = new BehaviorSubject<boolean>(false);
  #resize$ = new Subject<void>();
  #data:  Array<IBizyBarLineChartData> = [];

  #rightYAxis: number = 0;
  #leftYAxis: number = 0;
  #chartStacks: Array<string> = [];
  #chartNames: Array<string> = [];

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

  @Input() set data(data: Array<IBizyBarLineChartData>) {
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
    this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
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
  
        series.push({...{
          type: _d.type,
          name: xName,
          yAxisIndex,
          smooth: !_d.discrete,
          stack: _d.stack,
          data: _d.values
        }, ...color});
      });

      const tooltip = {
        show: this.tooltip,
        trigger: 'axis',
        appendToBody: true,
        axisPointer: {
          type: this.axisPointer
        },
        formatter: this.onTooltipFormatter
      }

      const grid = {
        left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
        right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
        bottom: 30,
        containLabel: true
      };

      const xAxis = [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: this.xAxisLabels,
          axisLabel: {
            formatter: this.onXAxisLabelFormatter,
          }
        }
      ];

      const legend = {
        type: 'scroll',
        bottom: 0,
        data: legends
      };

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

      const option: any = {
        tooltip,
        legend,
        grid,
        xAxis,
        yAxis,
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
        this.#echarts.setOption(option);
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
    const barChartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-width');
    const barChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-chart-min-height');
    if (Number(barChartMinWidth)) {
      minWidth = Number(barChartMinWidth);
    }
    if (Number(barChartMinHeight)) {
      minHeight = Number(barChartMinHeight);
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
