import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
const MIN_CHART_SIZE = 350; // px;
const Y_AXIS_OFFSET = 80;
const GRID_BOTTOM = 30;
export class BizyBarLineChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    tooltip = true;
    download = { hide: false, label: 'Descargar', name: 'Bizy' };
    axisPointer = 'line';
    xAxisLabels = [];
    onTooltipFormatter;
    onXAxisLabelFormatter;
    onDownload = new EventEmitter();
    onSelect = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = [];
    #rightYAxis = 0;
    #leftYAxis = 0;
    #chartStacks = [];
    #chartNames = [];
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
        }
    }
    async #setChartData(data) {
        this.#data = data;
        this.#rightYAxis = 0;
        this.#leftYAxis = 0;
        this.#chartStacks = [];
        this.#chartNames = [];
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
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
                    };
                    color.lineStyle.color = _d.color;
                    color.itemStyle.color = _d.color;
                }
                let position = 'right';
                let offset = 0;
                let formatter = null;
                const xName = _d.xAxi && _d.xAxi.name ? _d.xAxi.name : _d.label;
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
                    }
                    else {
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
                    }
                    else {
                        this.#chartStacks.push(_d.stack);
                    }
                }
                const _index = this.#chartNames.findIndex(_name => _name === yName);
                if (_index !== -1) {
                    yAxisIndex = _index;
                }
                else {
                    this.#chartNames.push(yName);
                }
                series.push({ ...{
                        type: _d.type,
                        name: xName,
                        yAxisIndex,
                        smooth: !_d.discrete,
                        stack: _d.stack,
                        data: _d.values
                    }, ...color });
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
                    mySaveAsImage: {
                        show: !this.download.hide,
                        icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
                        title: this.download.label,
                        onclick: () => {
                            const showAllLegends = (chart) => {
                                const option = chart.getOption();
                                option.legend[0].type = 'plain';
                                option.grid = {
                                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    bottom: `${Math.max(option.legend[0].data.length, 5)}%`,
                                    containLabel: true
                                };
                                chart.setOption(option);
                            };
                            const restoreLegendType = (chart) => {
                                const option = chart.getOption();
                                option.legend[0].type = 'scroll';
                                option.grid = {
                                    left: this.#leftYAxis > 2 ? (this.#leftYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    right: this.#rightYAxis > 2 ? (this.#rightYAxis - 2) * Y_AXIS_OFFSET : 10,
                                    bottom: GRID_BOTTOM,
                                    containLabel: true
                                };
                                chart.setOption(option);
                            };
                            showAllLegends(this.#echarts);
                            setTimeout(() => {
                                html2canvas(this.#chartContainer).then(canvas => {
                                    var link = document.createElement('a');
                                    link.href = canvas.toDataURL('image/png');
                                    link.download = `${this.download.name}.png`;
                                    this.renderer.appendChild(this.document.body, link);
                                    link.click();
                                    this.renderer.removeChild(this.document.body, link);
                                    restoreLegendType(this.#echarts);
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
            const option = {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarLineChartComponent, selector: "bizy-bar-line-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", download: "download", axisPointer: "axisPointer", xAxisLabels: "xAxisLabels", onTooltipFormatter: "onTooltipFormatter", onXAxisLabelFormatter: "onXAxisLabelFormatter", data: "data" }, outputs: { onDownload: "onDownload", onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
            }], tooltip: [{
                type: Input
            }], download: [{
                type: Input
            }], axisPointer: [{
                type: Input
            }], xAxisLabels: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onXAxisLabelFormatter: [{
                type: Input
            }], onDownload: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxpbmUtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Jhci1saW5lLWNoYXJ0L2Jhci1saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFM0csTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBLENBQUMsTUFBTTtBQUNqQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBTXZCLE1BQU0sT0FBTyx5QkFBeUI7SUEyQk47SUFDRjtJQUNTO0lBQ1I7SUE3QnBCLFNBQVMsR0FBdUIsSUFBSSxDQUFDO0lBQ3JDLE9BQU8sR0FBWSxJQUFJLENBQUM7SUFDeEIsUUFBUSxHQUFrRCxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDMUcsV0FBVyxHQUFxQixNQUFNLENBQUM7SUFDdkMsV0FBVyxHQUFrQixFQUFFLENBQUM7SUFDaEMsa0JBQWtCLENBQXlCO0lBQzNDLHFCQUFxQixDQUF5QjtJQUM3QyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUN0QyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUVoRCxRQUFRLEdBQTJCLElBQUksQ0FBQTtJQUV2QyxpQkFBaUIsR0FBNEIsSUFBSSxDQUFDO0lBQ2xELGVBQWUsR0FBMEIsSUFBSSxDQUFDO0lBQzlDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ25DLGVBQWUsR0FBMEIsSUFBSSxDQUFDO0lBQzlDLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNyRCxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUMvQixLQUFLLEdBQWtDLEVBQUUsQ0FBQztJQUUxQyxXQUFXLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLFVBQVUsR0FBVyxDQUFDLENBQUM7SUFDdkIsWUFBWSxHQUFrQixFQUFFLENBQUM7SUFDakMsV0FBVyxHQUFrQixFQUFFLENBQUM7SUFFaEMsWUFDOEIsVUFBc0IsRUFDeEIsUUFBa0IsRUFDVCxHQUFzQixFQUM5QixRQUFtQjtRQUhsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQzdDLENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1lBQ2pELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDakosSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELElBQWEsSUFBSSxDQUFDLElBQWtDO1FBQ2xELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBa0M7UUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7WUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE9BQU87YUFDUjtZQUVELE1BQU0sTUFBTSxHQUFlLEVBQUUsQ0FBQztZQUM5QixNQUFNLE9BQU8sR0FBa0IsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sS0FBSyxHQUFlLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7b0JBQ1osRUFBRSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQ2pCO2dCQUVELElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO29CQUNkLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2lCQUNoQjtnQkFFRCxNQUFNLFFBQVEsR0FBRztvQkFDZixJQUFJLEVBQUUsSUFBSTtvQkFDVixTQUFTLEVBQUUsRUFBRTtpQkFDZCxDQUFDO2dCQUVGLE1BQU0sS0FBSyxHQUFHO29CQUNaLFNBQVMsRUFBRTt3QkFDVCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0YsQ0FBQztnQkFFRixJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7b0JBQ1osUUFBUSxDQUFDLFNBQVMsR0FBRzt3QkFDbkIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLO3FCQUNoQixDQUFBO29CQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQ2xDO2dCQUVELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQTtnQkFDcEIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBRXJCLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtvQkFDWCxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDckMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN0RixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNoQixLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQ3RCO29CQUVELElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO3dCQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDO3FCQUNsQjtpQkFDRjtnQkFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUM3QixJQUFJLFFBQVEsS0FBSyxPQUFPLEVBQUU7d0JBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUNwQjt5QkFBTTt3QkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7d0JBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQkFDbkI7aUJBQ0Y7Z0JBRUQsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLO29CQUMxQyxRQUFRO29CQUNSLFVBQVUsRUFBRSxJQUFJO29CQUNoQixNQUFNO29CQUNOLFFBQVE7b0JBQ1IsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFO2lCQUN6QixDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFcEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7b0JBQ1osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxRSxJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDakIsVUFBVSxHQUFHLE1BQU0sQ0FBQztxQkFDckI7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNsQztpQkFDRjtnQkFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsR0FBRyxNQUFNLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM5QjtnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRzt3QkFDZCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7d0JBQ2IsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsVUFBVTt3QkFDVixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUTt3QkFDcEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLO3dCQUNmLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtxQkFDaEIsRUFBRSxHQUFHLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLE9BQU8sR0FBRztnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2xCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFlBQVksRUFBRSxJQUFJO2dCQUNsQixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjthQUNuQyxDQUFBO1lBRUQsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0RSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pFLE1BQU0sRUFBRSxXQUFXO2dCQUNuQixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUc7Z0JBQ1o7b0JBQ0UsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFFBQVEsRUFBRTt3QkFDUixjQUFjLEVBQUUsSUFBSTtxQkFDckI7b0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUN0QixTQUFTLEVBQUU7d0JBQ1QsU0FBUyxFQUFFLElBQUksQ0FBQyxxQkFBcUI7cUJBQ3RDO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHO2dCQUNiLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDO2dCQUNULElBQUksRUFBRSxPQUFPO2FBQ2QsQ0FBQztZQUVGLE1BQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxNQUFNLENBQUM7WUFDckgsTUFBTSxtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGlDQUFpQyxDQUFDLElBQUksTUFBTSxDQUFDO1lBQzFJLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsNkJBQTZCLENBQUMsSUFBSSxNQUFNLENBQUM7WUFFOUgsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFO29CQUNQLGFBQWEsRUFBRTt3QkFDYixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSwrYUFBK2E7d0JBQ3JiLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7d0JBQzFCLE9BQU8sRUFBRSxHQUFHLEVBQUU7NEJBQ1osTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7Z0NBQzlDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQ0FDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dDQUNoQyxNQUFNLENBQUMsSUFBSSxHQUFHO29DQUNaLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQ0FDdEUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO29DQUN6RSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRztvQ0FDdkQsWUFBWSxFQUFFLElBQUk7aUNBQ25CLENBQUM7Z0NBQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDNUIsQ0FBQyxDQUFBOzRCQUVELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7Z0NBQ2pELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQVMsQ0FBQztnQ0FDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2dDQUNqQyxNQUFNLENBQUMsSUFBSSxHQUFHO29DQUNaLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQ0FDdEUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO29DQUN6RSxNQUFNLEVBQUUsV0FBVztvQ0FDbkIsWUFBWSxFQUFFLElBQUk7aUNBQ25CLENBQUM7Z0NBQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDNUIsQ0FBQyxDQUFBOzRCQUVELGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBRTlCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0NBQ1osV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0NBQzVDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQ0FDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUM7b0NBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29DQUNwRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0NBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0NBQ3BELGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDM0IsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNWLENBQUM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsV0FBVzt3QkFDWCxXQUFXLEVBQUUsQ0FBQzt3QkFDZCxtQkFBbUI7d0JBQ25CLFdBQVcsRUFBRSxDQUFDO3FCQUNmO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFRO2dCQUNsQixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sSUFBSTtnQkFDSixLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxNQUFNO2FBQ1AsQ0FBQztZQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0TSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25HLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFFN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3pCLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHFCQUFxQixHQUFHLEdBQUcsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDOUUsT0FBTztTQUNSO1FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLGNBQWMsQ0FBQztRQUMvRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLElBQUksY0FBYyxDQUFDO1FBRWpGLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUM5QixJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDekcsTUFBTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDM0csSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM1QixRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzdCLFNBQVMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN2QztRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDL0UsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzt3R0ExV1UseUJBQXlCLGtCQTJCMUIsVUFBVSxhQUNWLFFBQVEsYUFDUixpQkFBaUIsYUFDakIsU0FBUzs0RkE5QlIseUJBQXlCLHNXQUgxQixFQUFFOzs0RkFHRCx5QkFBeUI7a0JBTHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkE0QkksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsU0FBUzs0Q0E3QlYsU0FBUztzQkFBakIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDSSxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBbUNNLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzJztcbmltcG9ydCB7IElCaXp5QmFyTGluZUNoYXJ0RGF0YSB9IGZyb20gJy4vYmFyLWxpbmUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IGh0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgQmVoYXZpb3JTdWJqZWN0LCBmaWx0ZXIsIHNraXAsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgdGFrZSwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IE1JTl9DSEFSVF9TSVpFID0gMzUwIC8vIHB4O1xuY29uc3QgWV9BWElTX09GRlNFVCA9IDgwO1xuY29uc3QgR1JJRF9CT1RUT00gPSAzMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYmFyLWxpbmUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlCYXJMaW5lQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSByZXNpemVSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBkb3dubG9hZDoge2hpZGU/OiBib29sZWFuLCBsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmd9ID0ge2hpZGU6IGZhbHNlLCBsYWJlbDogJ0Rlc2NhcmdhcicsIG5hbWU6ICdCaXp5J307XG4gIEBJbnB1dCgpIGF4aXNQb2ludGVyOiAnbGluZScgfCAnY3Jvc3MnID0gJ2xpbmUnO1xuICBASW5wdXQoKSB4QXhpc0xhYmVsczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBASW5wdXQoKSBvblRvb2x0aXBGb3JtYXR0ZXI6IChpdGVtOiBhbnkgKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9uWEF4aXNMYWJlbEZvcm1hdHRlcjogKGl0ZW06IGFueSApID0+IHN0cmluZztcbiAgQE91dHB1dCgpIG9uRG93bmxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICNlY2hhcnRzOiBlY2hhcnRzLkVDaGFydHMgfCBudWxsID0gbnVsbFxuXG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2NoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAjYWZ0ZXJWaWV3SW5pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAjcmVzaXplJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNkYXRhOiAgQXJyYXk8SUJpenlCYXJMaW5lQ2hhcnREYXRhPiA9IFtdO1xuXG4gICNyaWdodFlBeGlzOiBudW1iZXIgPSAwO1xuICAjbGVmdFlBeGlzOiBudW1iZXIgPSAwO1xuICAjY2hhcnRTdGFja3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgI2NoYXJ0TmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eUJhckxpbmVDaGFydERhdGE+KSB7XG4gICAgdGhpcy4jZGF0YSA9IGRhdGE7XG4gICAgdGhpcy4jcmlnaHRZQXhpcyA9IDA7XG4gICAgdGhpcy4jbGVmdFlBeGlzID0gMDtcbiAgICB0aGlzLiNjaGFydFN0YWNrcyA9IFtdO1xuICAgIHRoaXMuI2NoYXJ0TmFtZXMgPSBbXTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI2FmdGVyVmlld0luaXQucGlwZShmaWx0ZXIodmFsdWUgPT4gdmFsdWUgPT09IHRydWUpLCB0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy4jY3JlYXRlQ2hhcnRDb250YWluZXIoKVxuXG4gICAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VyaWVzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBjb25zdCBsZWdlbmRzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBjb25zdCB5QXhpczogQXJyYXk8YW55PiA9IFtdO1xuICBcbiAgICAgIHRoaXMuI2RhdGEuZm9yRWFjaCgoX2QsIF9pKSA9PiB7XG4gICAgICAgIGlmICghX2QudHlwZSkge1xuICAgICAgICAgIF9kLnR5cGUgPSAnYmFyJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2QudmFsdWVzKSB7XG4gICAgICAgICAgX2QudmFsdWVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBheGlzTGluZSA9IHtcbiAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge31cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb2xvciA9IHtcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKF9kLmNvbG9yKSB7XG4gICAgICAgICAgYXhpc0xpbmUubGluZVN0eWxlID0ge1xuICAgICAgICAgICAgY29sb3I6IF9kLmNvbG9yXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29sb3IubGluZVN0eWxlLmNvbG9yID0gX2QuY29sb3I7XG4gICAgICAgICAgY29sb3IuaXRlbVN0eWxlLmNvbG9yID0gX2QuY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9zaXRpb24gPSAncmlnaHQnO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGZvcm1hdHRlciA9IG51bGxcbiAgICAgICAgY29uc3QgeE5hbWUgPSBfZC54QXhpICYmICBfZC54QXhpLm5hbWUgPyAgX2QueEF4aS5uYW1lIDogX2QubGFiZWw7XG4gICAgICAgIGxldCB5TmFtZSA9IF9kLmxhYmVsO1xuXG4gICAgICAgIGlmIChfZC55QXhpKSB7XG4gICAgICAgICAgZm9ybWF0dGVyID0gX2QueUF4aS5vblZhbHVlRm9ybWF0dGVyO1xuICAgICAgICAgIHBvc2l0aW9uID0gX2QueUF4aS5wb3NpdGlvbiA/IF9kLnlBeGkucG9zaXRpb24gOiBfZC50eXBlID09PSAnYmFyJyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgICAgaWYgKF9kLnlBeGkubmFtZSkge1xuICAgICAgICAgICAgeU5hbWUgPSBfZC55QXhpLm5hbWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9kLnlBeGkuaGlkZSkge1xuICAgICAgICAgICAgYXhpc0xpbmUuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybWF0dGVyID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV9kLnlBeGkgfHwgIV9kLnlBeGkuaGlkZSkge1xuICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy4jcmlnaHRZQXhpcyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNyaWdodFlBeGlzKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuI2xlZnRZQXhpcyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNsZWZ0WUF4aXMrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB5QXhpcy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgIG5hbWU6IF9kLnlBeGkgJiYgX2QueUF4aS5oaWRlID8gJycgOiB5TmFtZSxcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBhbGlnblRpY2tzOiB0cnVlLFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBheGlzTGluZSxcbiAgICAgICAgICBheGlzTGFiZWw6IHsgZm9ybWF0dGVyIH1cbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBsZWdlbmRzLnB1c2goeE5hbWUpO1xuXG4gICAgICAgIGxldCB5QXhpc0luZGV4ID0gX2k7XG4gICAgICAgIGlmIChfZC5zdGFjaykge1xuICAgICAgICAgIGNvbnN0IF9pbmRleCA9IHRoaXMuI2NoYXJ0U3RhY2tzLmZpbmRJbmRleChfc3RhY2sgPT4gX3N0YWNrID09PSBfZC5zdGFjayk7XG4gICAgICAgICAgaWYgKF9pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHlBeGlzSW5kZXggPSBfaW5kZXg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI2NoYXJ0U3RhY2tzLnB1c2goX2Quc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9pbmRleCA9IHRoaXMuI2NoYXJ0TmFtZXMuZmluZEluZGV4KF9uYW1lID0+IF9uYW1lID09PSB5TmFtZSk7XG4gICAgICAgIGlmIChfaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgeUF4aXNJbmRleCA9IF9pbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiNjaGFydE5hbWVzLnB1c2goeU5hbWUpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBzZXJpZXMucHVzaCh7Li4ue1xuICAgICAgICAgIHR5cGU6IF9kLnR5cGUsXG4gICAgICAgICAgbmFtZTogeE5hbWUsXG4gICAgICAgICAgeUF4aXNJbmRleCxcbiAgICAgICAgICBzbW9vdGg6ICFfZC5kaXNjcmV0ZSxcbiAgICAgICAgICBzdGFjazogX2Quc3RhY2ssXG4gICAgICAgICAgZGF0YTogX2QudmFsdWVzXG4gICAgICAgIH0sIC4uLmNvbG9yfSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9vbHRpcCA9IHtcbiAgICAgICAgc2hvdzogdGhpcy50b29sdGlwLFxuICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgYXhpc1BvaW50ZXI6IHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmF4aXNQb2ludGVyXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblRvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgbGVmdDogdGhpcy4jbGVmdFlBeGlzID4gMiA/ICh0aGlzLiNsZWZ0WUF4aXMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuI3JpZ2h0WUF4aXMgPiAyID8gKHRoaXMuI3JpZ2h0WUF4aXMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgYm90dG9tOiBHUklEX0JPVFRPTSxcbiAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB4QXhpcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgYXhpc1RpY2s6IHtcbiAgICAgICAgICAgIGFsaWduV2l0aExhYmVsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB0aGlzLnhBeGlzTGFiZWxzLFxuICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uWEF4aXNMYWJlbEZvcm1hdHRlcixcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGxlZ2VuZCA9IHtcbiAgICAgICAgdHlwZTogJ3Njcm9sbCcsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgZGF0YTogbGVnZW5kc1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdGV4dENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtY29sb3InKSA/PyAnIzAwMCc7XG4gICAgICBjb25zdCB0ZXh0QmFja2dyb3VuZENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcicpID8/ICcjZmZmJztcbiAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYm9yZGVyLWNvbG9yJykgPz8gJyNmZmYnO1xuXG4gICAgICBjb25zdCB0b29sYm94ID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgbXlTYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgc2hvdzogIXRoaXMuZG93bmxvYWQuaGlkZSxcbiAgICAgICAgICAgIGljb246ICdwYXRoOi8vTTI4OCAzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMmwwIDI0Mi43LTczLjQtNzMuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTI4IDEyOGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMGwxMjgtMTI4YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwTDI4OCAyNzQuNyAyODggMzJ6TTY0IDM1MmMtMzUuMyAwLTY0IDI4LjctNjQgNjRsMCAzMmMwIDM1LjMgMjguNyA2NCA2NCA2NGwzODQgMGMzNS4zIDAgNjQtMjguNyA2NC02NGwwLTMyYzAtMzUuMy0yOC43LTY0LTY0LTY0bC0xMDEuNSAwLTQ1LjMgNDUuM2MtMjUgMjUtNjUuNSAyNS05MC41IDBMMTY1LjUgMzUyIDY0IDM1MnptMzY4IDU2YTI0IDI0IDAgMSAxIDAgNDggMjQgMjQgMCAxIDEgMC00OHonLFxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZG93bmxvYWQubGFiZWwsXG4gICAgICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3dBbGxMZWdlbmRzID0gKGNoYXJ0OiBlY2hhcnRzLkVDaGFydHMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGNoYXJ0LmdldE9wdGlvbigpO1xuICAgICAgICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZFswXS50eXBlID0gJ3BsYWluJztcbiAgICAgICAgICAgICAgICAgIG9wdGlvbi5ncmlkID0ge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLiNsZWZ0WUF4aXMgPiAyID8gKHRoaXMuI2xlZnRZQXhpcyAtIDIpICogWV9BWElTX09GRlNFVCA6IDEwLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy4jcmlnaHRZQXhpcyA+IDIgPyAodGhpcy4jcmlnaHRZQXhpcyAtIDIpICogWV9BWElTX09GRlNFVCA6IDEwLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206IGAke01hdGgubWF4KG9wdGlvbi5sZWdlbmRbMF0uZGF0YS5sZW5ndGgsIDUpfSVgLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBjaGFydC5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IHJlc3RvcmVMZWdlbmRUeXBlID0gKGNoYXJ0OiBlY2hhcnRzLkVDaGFydHMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGNoYXJ0LmdldE9wdGlvbigpIGFzIGFueTtcbiAgICAgICAgICAgICAgICAgIG9wdGlvbi5sZWdlbmRbMF0udHlwZSA9ICdzY3JvbGwnO1xuICAgICAgICAgICAgICAgICAgb3B0aW9uLmdyaWQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMuI2xlZnRZQXhpcyA+IDIgPyAodGhpcy4jbGVmdFlBeGlzIC0gMikgKiBZX0FYSVNfT0ZGU0VUIDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLiNyaWdodFlBeGlzID4gMiA/ICh0aGlzLiNyaWdodFlBeGlzIC0gMikgKiBZX0FYSVNfT0ZGU0VUIDogMTAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogR1JJRF9CT1RUT00sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGNoYXJ0LnNldE9wdGlvbihvcHRpb24pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2hvd0FsbExlZ2VuZHModGhpcy4jZWNoYXJ0cyk7XG5cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBodG1sMmNhbnZhcyh0aGlzLiNjaGFydENvbnRhaW5lcikudGhlbihjYW52YXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHt0aGlzLmRvd25sb2FkLm5hbWV9LnBuZ2A7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgbGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZUxlZ2VuZFR5cGUodGhpcy4jZWNoYXJ0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRvd25sb2FkLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICBpY29uU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBib3JkZXJDb2xvcixcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgdGV4dEJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICAgIHRleHRQYWRkaW5nOiA1LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7XG4gICAgICAgIHRvb2x0aXAsXG4gICAgICAgIGxlZ2VuZCxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgeEF4aXMsXG4gICAgICAgIHlBeGlzLFxuICAgICAgICB0b29sYm94LFxuICAgICAgICBzZXJpZXNcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy4jcmVzaXplJC5uZXh0KCkpO1xuICAgICAgY29uc3QgcmVzaXplUmVmID0gdGhpcy5yZXNpemVSZWYgPyB0aGlzLnJlc2l6ZVJlZiA6IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgPyB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHJlc2l6ZVJlZik7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI3Jlc2l6ZSQucGlwZShza2lwKDEpLCBhdWRpdFRpbWUoMzAwKSwgdGhyb3R0bGVUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbihvcHRpb24pO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLm9uKCdjbGljaycsIHBhcmFtcyA9PiB7XG4gICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH1cblxuICAjY3JlYXRlQ2hhcnRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IE1JTl9DSEFSVF9TSVpFO1xuICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IE1JTl9DSEFSVF9TSVpFO1xuXG4gICAgbGV0IG1pbldpZHRoID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IG1pbkhlaWdodCA9IE1JTl9DSEFSVF9TSVpFO1xuICAgIGNvbnN0IGJhckNoYXJ0TWluV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi13aWR0aCcpO1xuICAgIGNvbnN0IGJhckNoYXJ0TWluSGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1jaGFydC1taW4taGVpZ2h0Jyk7XG4gICAgaWYgKE51bWJlcihiYXJDaGFydE1pbldpZHRoKSkge1xuICAgICAgbWluV2lkdGggPSBOdW1iZXIoYmFyQ2hhcnRNaW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChOdW1iZXIoYmFyQ2hhcnRNaW5IZWlnaHQpKSB7XG4gICAgICBtaW5IZWlnaHQgPSBOdW1iZXIoYmFyQ2hhcnRNaW5IZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KGVsZW1lbnRXaWR0aCwgbWluV2lkdGgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KGVsZW1lbnRIZWlnaHQsIG1pbkhlaWdodCk7XG5cbiAgICB0aGlzLiNjaGFydENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNjaGFydENvbnRhaW5lciwgJ3dpZHRoJywgYCR7d2lkdGh9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gICNkZWxldGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jZWNoYXJ0cy5jbGVhcigpO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICB0aGlzLiNjaGFydENvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNlY2hhcnRzKSB7XG4gICAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iXX0=