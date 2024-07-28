import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT } from '@angular/common';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350; // px;
const Y_AXIS_OFFSET = 80;
export class BizyBarLineChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    downloadLabel = 'Descargar';
    name = 'Bizy';
    tooltip = true;
    axisPointer = 'line';
    xAxisLabels = [];
    onTooltipFormatter;
    onXAxisLabelFormatter;
    onSelect = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = EMPTY_CHART;
    #barCharts = 0;
    #lineCharts = 0;
    #chartGroups = [];
    constructor(elementRef, document, ref, renderer) {
        this.elementRef = elementRef;
        this.document = document;
        this.ref = ref;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef && this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.offsetHeight)) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (!data) {
            return;
        }
        if (data.length > 0) {
            this.#setChartData(data);
        }
        else {
            this.#deleteChartContainer();
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        this.#data = data;
        this.#barCharts = 0;
        this.#lineCharts = 0;
        this.#chartGroups = [];
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            const color = [];
            const series = [];
            const legends = [];
            const yAxis = [];
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
                if (_d.color) {
                    color.push(_d.color);
                    axisLine.lineStyle = {
                        color: _d.color
                    };
                }
                let position = 'right';
                let offset = 0;
                if (!_d.hideYAxi) {
                    if (_d.type === 'bar') {
                        offset = this.#barCharts * Y_AXIS_OFFSET;
                        this.#barCharts++;
                    }
                    else {
                        offset = this.#lineCharts * Y_AXIS_OFFSET;
                        this.#lineCharts++;
                        position = 'left';
                    }
                    yAxis.push({
                        type: 'value',
                        name: _d.yLabel || _d.label || '',
                        position,
                        axisLine,
                        alignTicks: true,
                        offset,
                        axisLabel: {
                            formatter: _d.onYAxisLabelFormatter
                        }
                    });
                }
                else {
                    yAxis.push({
                        type: 'value',
                        position: 'right',
                        alignTicks: true,
                        offset: 0,
                        axisLabel: {
                            formatter: ''
                        }
                    });
                }
                legends.push(_d.xLabel || _d.label);
                let index = _i;
                if (_d.group) {
                    const _index = this.#chartGroups.findIndex(_group => _group === _d.group);
                    if (_index !== -1) {
                        index = _index;
                    }
                    else {
                        this.#chartGroups.push(_d.group);
                    }
                }
                series.push({
                    type: _d.type,
                    name: _d.xLabel || _d.label,
                    yAxisIndex: index,
                    smooth: true,
                    stack: _d.group,
                    data: _d.values
                });
            });
            const tooltip = {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                axisPointer: {
                    type: this.axisPointer
                },
                formatter: this.onTooltipFormatter
            };
            const grid = {
                left: this.#lineCharts > 2 ? (this.#lineCharts - 2) * Y_AXIS_OFFSET : 10,
                right: this.#barCharts > 2 ? (this.#barCharts - 2) * Y_AXIS_OFFSET : 10,
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
            const option = {
                tooltip,
                legend,
                grid,
                xAxis,
                yAxis,
                toolbox,
                series
            };
            if (color && color.length > 0) {
                option.color = color;
            }
            this.#echarts = echarts.init(this.#chartContainer);
            this.#echarts.setOption(option);
            this.#echarts.on('click', params => {
                this.onSelect.emit(params.name);
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
                    this.onSelect.emit(params.name);
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
    };
    #deleteChartContainer = () => {
        if (!this.#chartContainer || !this.elementRef || !this.elementRef.nativeElement) {
            return;
        }
        this.#echarts.clear();
        this.renderer.removeChild(this.elementRef.nativeElement, this.#chartContainer);
        this.#chartContainer = null;
        this.ref.detectChanges();
    };
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarLineChartComponent, selector: "bizy-bar-line-chart", inputs: { resizeRef: "resizeRef", downloadLabel: "downloadLabel", name: "name", tooltip: "tooltip", axisPointer: "axisPointer", xAxisLabels: "xAxisLabels", onTooltipFormatter: "onTooltipFormatter", onXAxisLabelFormatter: "onXAxisLabelFormatter", data: "data" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarLineChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-bar-line-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; }, propDecorators: { resizeRef: [{
                type: Input
            }], downloadLabel: [{
                type: Input
            }], name: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], axisPointer: [{
                type: Input
            }], xAxisLabels: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onXAxisLabelFormatter: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxpbmUtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Jhci1saW5lLWNoYXJ0L2Jhci1saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzRyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQSxDQUFDLE1BQU07QUFDakMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBTXpCLE1BQU0sT0FBTyx5QkFBeUI7SUEwQk47SUFDRjtJQUNTO0lBQ1I7SUE1QnBCLFNBQVMsR0FBZ0IsSUFBSSxDQUFDO0lBQzlCLGFBQWEsR0FBVyxXQUFXLENBQUM7SUFDcEMsSUFBSSxHQUFXLE1BQU0sQ0FBQztJQUN0QixPQUFPLEdBQVksSUFBSSxDQUFDO0lBQ3hCLFdBQVcsR0FBcUIsTUFBTSxDQUFDO0lBQ3ZDLFdBQVcsR0FBa0IsRUFBRSxDQUFDO0lBQ2hDLGtCQUFrQixDQUF5QjtJQUMzQyxxQkFBcUIsQ0FBeUI7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFaEQsUUFBUSxHQUEyQixJQUFJLENBQUE7SUFFdkMsaUJBQWlCLEdBQTRCLElBQUksQ0FBQztJQUNsRCxlQUFlLEdBQTBCLElBQUksQ0FBQztJQUM5QyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxlQUFlLEdBQTBCLElBQUksQ0FBQztJQUM5QyxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDckQsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFDL0IsS0FBSyxHQUF1RCxXQUFXLENBQUM7SUFFeEUsVUFBVSxHQUFXLENBQUMsQ0FBQztJQUN2QixXQUFXLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLFlBQVksR0FBa0IsRUFBRSxDQUFBO0lBRWhDLFlBQzhCLFVBQXNCLEVBQ3hCLFFBQWtCLEVBQ1QsR0FBc0IsRUFDOUIsUUFBbUI7UUFIbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ1QsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUM3QyxDQUFDO0lBRUosZUFBZTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtZQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pKLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxJQUFhLElBQUksQ0FBQyxJQUFrQztRQUNsRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBdUQ7UUFDekUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7WUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE9BQU87YUFDUjtZQUVELE1BQU0sS0FBSyxHQUFrQixFQUFFLENBQUM7WUFFaEMsTUFBTSxNQUFNLEdBQWUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sT0FBTyxHQUFrQixFQUFFLENBQUM7WUFDbEMsTUFBTSxLQUFLLEdBQWUsRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtvQkFDWixFQUFFLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztpQkFDakI7Z0JBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7aUJBQ2hCO2dCQUVELE1BQU0sUUFBUSxHQUFHO29CQUNmLElBQUksRUFBRSxJQUFJO29CQUNWLFNBQVMsRUFBRSxFQUFFO2lCQUNkLENBQUM7Z0JBRUYsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFO29CQUNaLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixRQUFRLENBQUMsU0FBUyxHQUFHO3dCQUNuQixLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUs7cUJBQ2hCLENBQUE7aUJBQ0Y7Z0JBRUQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBRWYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQ3JCLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQzt3QkFDekMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3FCQUNuQjt5QkFBTTt3QkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7d0JBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDbkIsUUFBUSxHQUFHLE1BQU0sQ0FBQztxQkFDbkI7b0JBR0QsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDVCxJQUFJLEVBQUUsT0FBTzt3QkFDYixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixVQUFVLEVBQUUsSUFBSTt3QkFDaEIsTUFBTTt3QkFDTixTQUFTLEVBQUU7NEJBQ1QsU0FBUyxFQUFFLEVBQUUsQ0FBQyxxQkFBcUI7eUJBQ3BDO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNULElBQUksRUFBRSxPQUFPO3dCQUNiLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixVQUFVLEVBQUUsSUFBSTt3QkFDaEIsTUFBTSxFQUFFLENBQUM7d0JBQ1QsU0FBUyxFQUFFOzRCQUNULFNBQVMsRUFBRSxFQUFFO3lCQUNkO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFO29CQUNaLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ2pCLEtBQUssR0FBRyxNQUFNLENBQUM7cUJBQ2hCO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDbEM7aUJBQ0Y7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7b0JBQ2IsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEtBQUs7b0JBQzNCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsSUFBSTtvQkFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUs7b0JBQ2YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNO2lCQUNoQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDbEIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCO2FBQ25DLENBQUE7WUFFRCxNQUFNLElBQUksR0FBRztnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkUsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHO2dCQUNaO29CQUNFLElBQUksRUFBRSxVQUFVO29CQUNoQixRQUFRLEVBQUU7d0JBQ1IsY0FBYyxFQUFFLElBQUk7cUJBQ3JCO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztvQkFDdEIsU0FBUyxFQUFFO3dCQUNULFNBQVMsRUFBRSxJQUFJLENBQUMscUJBQXFCO3FCQUN0QztpQkFDRjthQUNGLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRztnQkFDYixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxJQUFJLEVBQUUsT0FBTzthQUNkLENBQUM7WUFFRixNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLElBQUksTUFBTSxDQUFDO1lBQ3JILE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztZQUMxSSxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixDQUFDLElBQUksTUFBTSxDQUFDO1lBRTlILE1BQU0sT0FBTyxHQUFHO2dCQUNkLElBQUksRUFBRSxJQUFJO2dCQUNWLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUU7d0JBQ1gsSUFBSSxFQUFFLElBQUk7d0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtxQkFDMUI7aUJBQ0Y7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsV0FBVzt3QkFDWCxXQUFXLEVBQUUsQ0FBQzt3QkFDZCxtQkFBbUI7d0JBQ25CLFdBQVcsRUFBRSxDQUFDO3FCQUNmO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFRO2dCQUNsQixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sSUFBSTtnQkFDSixLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxNQUFNO2FBQ1AsQ0FBQztZQUVGLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUN0QjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0TSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25HLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFFN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3pCLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHFCQUFxQixHQUFHLEdBQUcsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDOUUsT0FBTztTQUNSO1FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLGNBQWMsQ0FBQztRQUMvRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLElBQUksY0FBYyxDQUFDO1FBRWpGLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUM5QixJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDekcsTUFBTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDM0csSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM1QixRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzdCLFNBQVMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN2QztRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDL0UsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzt3R0FwVFUseUJBQXlCLGtCQTBCMUIsVUFBVSxhQUNWLFFBQVEsYUFDUixpQkFBaUIsYUFDakIsU0FBUzs0RkE3QlIseUJBQXlCLG9XQUgxQixFQUFFOzs0RkFHRCx5QkFBeUI7a0JBTHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkEyQkksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsU0FBUzs0Q0E1QlYsU0FBUztzQkFBakIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFrQ00sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsgSUJpenlCYXJMaW5lQ2hhcnREYXRhIH0gZnJvbSAnLi9iYXItbGluZS1jaGFydC50eXBlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIEJlaGF2aW9yU3ViamVjdCwgZmlsdGVyLCBza2lwLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRha2UsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBFTVBUWV9DSEFSVCA9IFswXTtcbmNvbnN0IE1JTl9DSEFSVF9TSVpFID0gMzUwIC8vIHB4O1xuY29uc3QgWV9BWElTX09GRlNFVCA9IDgwO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1iYXItbGluZS1jaGFydCcsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUJhckxpbmVDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHJlc2l6ZVJlZjogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBASW5wdXQoKSBkb3dubG9hZExhYmVsOiBzdHJpbmcgPSAnRGVzY2FyZ2FyJztcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gJ0JpenknO1xuICBASW5wdXQoKSB0b29sdGlwOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgYXhpc1BvaW50ZXI6ICdsaW5lJyB8ICdjcm9zcycgPSAnbGluZSc7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIEBJbnB1dCgpIG9uVG9vbHRpcEZvcm1hdHRlcjogKGl0ZW06IGFueSApID0+IHN0cmluZztcbiAgQElucHV0KCkgb25YQXhpc0xhYmVsRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAjZWNoYXJ0czogZWNoYXJ0cy5FQ2hhcnRzIHwgbnVsbCA9IG51bGxcblxuICAjbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAjcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNjaGFydENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgI2FmdGVyVmlld0luaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgI3Jlc2l6ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAjZGF0YTogIEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQgPSBFTVBUWV9DSEFSVDtcblxuICAjYmFyQ2hhcnRzOiBudW1iZXIgPSAwO1xuICAjbGluZUNoYXJ0czogbnVtYmVyID0gMDtcbiAgI2NoYXJ0R3JvdXBzOiBBcnJheTxzdHJpbmc+ID0gW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShFTVBUWV9DSEFSVCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eUJhckxpbmVDaGFydERhdGE+IHwgdHlwZW9mIEVNUFRZX0NIQVJUKSB7XG4gICAgdGhpcy4jZGF0YSA9IGRhdGE7XG4gICAgdGhpcy4jYmFyQ2hhcnRzID0gMDtcbiAgICB0aGlzLiNsaW5lQ2hhcnRzID0gMDtcbiAgICB0aGlzLiNjaGFydEdyb3VwcyA9IFtdO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jYWZ0ZXJWaWV3SW5pdC5waXBlKGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSA9PT0gdHJ1ZSksIHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpXG5cbiAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb2xvcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgICBjb25zdCBzZXJpZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGNvbnN0IGxlZ2VuZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIGNvbnN0IHlBeGlzOiBBcnJheTxhbnk+ID0gW107XG4gIFxuICAgICAgdGhpcy4jZGF0YS5mb3JFYWNoKChfZCwgX2kpID0+IHtcbiAgICAgICAgaWYgKCFfZC50eXBlKSB7XG4gICAgICAgICAgX2QudHlwZSA9ICdiYXInO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfZC52YWx1ZXMpIHtcbiAgICAgICAgICBfZC52YWx1ZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF4aXNMaW5lID0ge1xuICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgbGluZVN0eWxlOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChfZC5jb2xvcikge1xuICAgICAgICAgIGNvbG9yLnB1c2goX2QuY29sb3IpO1xuICAgICAgICAgIGF4aXNMaW5lLmxpbmVTdHlsZSA9IHtcbiAgICAgICAgICAgIGNvbG9yOiBfZC5jb2xvclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuXG4gICAgICAgIGlmICghX2QuaGlkZVlBeGkpIHtcbiAgICAgICAgICBpZiAoX2QudHlwZSA9PT0gJ2JhcicpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuI2JhckNoYXJ0cyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNiYXJDaGFydHMrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy4jbGluZUNoYXJ0cyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNsaW5lQ2hhcnRzKys7XG4gICAgICAgICAgICBwb3NpdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICB9XG4gICAgICAgICAgXG5cbiAgICAgICAgICB5QXhpcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICBuYW1lOiBfZC55TGFiZWwgfHwgX2QubGFiZWwgfHwgJycsXG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIGF4aXNMaW5lLFxuICAgICAgICAgICAgYWxpZ25UaWNrczogdHJ1ZSxcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgICBmb3JtYXR0ZXI6IF9kLm9uWUF4aXNMYWJlbEZvcm1hdHRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHlBeGlzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgICAgYWxpZ25UaWNrczogdHJ1ZSxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgICBmb3JtYXR0ZXI6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGxlZ2VuZHMucHVzaChfZC54TGFiZWwgfHwgX2QubGFiZWwpO1xuXG4gICAgICAgIGxldCBpbmRleCA9IF9pO1xuICAgICAgICBpZiAoX2QuZ3JvdXApIHtcbiAgICAgICAgICBjb25zdCBfaW5kZXggPSB0aGlzLiNjaGFydEdyb3Vwcy5maW5kSW5kZXgoX2dyb3VwID0+IF9ncm91cCA9PT0gX2QuZ3JvdXApO1xuICAgICAgICAgIGlmIChfaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBpbmRleCA9IF9pbmRleDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4jY2hhcnRHcm91cHMucHVzaChfZC5ncm91cCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuICAgICAgICBzZXJpZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogX2QudHlwZSxcbiAgICAgICAgICBuYW1lOiBfZC54TGFiZWwgfHwgX2QubGFiZWwsXG4gICAgICAgICAgeUF4aXNJbmRleDogaW5kZXgsXG4gICAgICAgICAgc21vb3RoOiB0cnVlLFxuICAgICAgICAgIHN0YWNrOiBfZC5ncm91cCxcbiAgICAgICAgICBkYXRhOiBfZC52YWx1ZXNcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9vbHRpcCA9IHtcbiAgICAgICAgc2hvdzogdGhpcy50b29sdGlwLFxuICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgYXhpc1BvaW50ZXI6IHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmF4aXNQb2ludGVyXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblRvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgbGVmdDogdGhpcy4jbGluZUNoYXJ0cyA+IDIgPyAodGhpcy4jbGluZUNoYXJ0cyAtIDIpICogWV9BWElTX09GRlNFVCA6IDEwLFxuICAgICAgICByaWdodDogdGhpcy4jYmFyQ2hhcnRzID4gMiA/ICh0aGlzLiNiYXJDaGFydHMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgYm90dG9tOiAzMCxcbiAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB4QXhpcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgYXhpc1RpY2s6IHtcbiAgICAgICAgICAgIGFsaWduV2l0aExhYmVsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB0aGlzLnhBeGlzTGFiZWxzLFxuICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uWEF4aXNMYWJlbEZvcm1hdHRlcixcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGxlZ2VuZCA9IHtcbiAgICAgICAgdHlwZTogJ3Njcm9sbCcsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgZGF0YTogbGVnZW5kc1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdGV4dENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtY29sb3InKSA/PyAnIzAwMCc7XG4gICAgICBjb25zdCB0ZXh0QmFja2dyb3VuZENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcicpID8/ICcjZmZmJztcbiAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYm9yZGVyLWNvbG9yJykgPz8gJyNmZmYnO1xuXG4gICAgICBjb25zdCB0b29sYm94ID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgc2F2ZUFzSW1hZ2U6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5kb3dubG9hZExhYmVsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgIGljb25TdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvcixcbiAgICAgICAgICAgIGJvcmRlckNvbG9yLFxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICB0ZXh0QmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgdGV4dFBhZGRpbmc6IDUsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvcHRpb246IGFueSA9IHtcbiAgICAgICAgdG9vbHRpcCxcbiAgICAgICAgbGVnZW5kLFxuICAgICAgICBncmlkLFxuICAgICAgICB4QXhpcyxcbiAgICAgICAgeUF4aXMsXG4gICAgICAgIHRvb2xib3gsXG4gICAgICAgIHNlcmllc1xuICAgICAgfTtcblxuICAgICAgaWYgKGNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuI3Jlc2l6ZSQubmV4dCgpKTtcbiAgICAgIGNvbnN0IHJlc2l6ZVJlZiA9IHRoaXMucmVzaXplUmVmID8gdGhpcy5yZXNpemVSZWYgOiB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpID8gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZXNpemVSZWYpO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLiNyZXNpemUkLnBpcGUoc2tpcCgxKSwgYXVkaXRUaW1lKDMwMCksIHRocm90dGxlVGltZSg1MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLiNkZWxldGVDaGFydENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpO1xuXG4gICAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNlY2hhcnRzID0gZWNoYXJ0cy5pbml0KHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgdGhpcy4jZWNoYXJ0cy5vbignY2xpY2snLCBwYXJhbXMgPT4ge1xuICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChwYXJhbXMubmFtZSlcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9XG5cbiAgI2NyZWF0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLiNjaGFydENvbnRhaW5lciB8fCAhdGhpcy5lbGVtZW50UmVmIHx8ICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbGVtZW50V2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCBNSU5fQ0hBUlRfU0laRTtcbiAgICBsZXQgZWxlbWVudEhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCB8fCBNSU5fQ0hBUlRfU0laRTtcblxuICAgIGxldCBtaW5XaWR0aCA9IE1JTl9DSEFSVF9TSVpFO1xuICAgIGxldCBtaW5IZWlnaHQgPSBNSU5fQ0hBUlRfU0laRTtcbiAgICBjb25zdCBiYXJDaGFydE1pbldpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1jaGFydC1taW4td2lkdGgnKTtcbiAgICBjb25zdCBiYXJDaGFydE1pbkhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktY2hhcnQtbWluLWhlaWdodCcpO1xuICAgIGlmIChOdW1iZXIoYmFyQ2hhcnRNaW5XaWR0aCkpIHtcbiAgICAgIG1pbldpZHRoID0gTnVtYmVyKGJhckNoYXJ0TWluV2lkdGgpO1xuICAgIH1cbiAgICBpZiAoTnVtYmVyKGJhckNoYXJ0TWluSGVpZ2h0KSkge1xuICAgICAgbWluSGVpZ2h0ID0gTnVtYmVyKGJhckNoYXJ0TWluSGVpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1heChlbGVtZW50V2lkdGgsIG1pbldpZHRoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heChlbGVtZW50SGVpZ2h0LCBtaW5IZWlnaHQpO1xuXG4gICAgdGhpcy4jY2hhcnRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICd3aWR0aCcsIGAke3dpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNjaGFydENvbnRhaW5lciwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjZGVsZXRlQ2hhcnRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lciB8fCAhdGhpcy5lbGVtZW50UmVmIHx8ICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuI2VjaGFydHMuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy4jY2hhcnRDb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jZWNoYXJ0cykge1xuICAgICAgdGhpcy4jZWNoYXJ0cy5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIl19