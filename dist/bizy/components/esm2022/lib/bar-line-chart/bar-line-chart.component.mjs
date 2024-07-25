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
    axisPointer = 'line';
    xAxisLabels = (Array);
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarLineChartComponent, selector: "bizy-bar-line-chart", inputs: { resizeRef: "resizeRef", downloadLabel: "downloadLabel", name: "name", axisPointer: "axisPointer", xAxisLabels: "xAxisLabels", onTooltipFormatter: "onTooltipFormatter", onXAxisLabelFormatter: "onXAxisLabelFormatter", data: "data" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxpbmUtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Jhci1saW5lLWNoYXJ0L2Jhci1saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzRyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQSxDQUFDLE1BQU07QUFDakMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBTXpCLE1BQU0sT0FBTyx5QkFBeUI7SUF5Qk47SUFDRjtJQUNTO0lBQ1I7SUEzQnBCLFNBQVMsR0FBZSxJQUFJLENBQUM7SUFDN0IsYUFBYSxHQUFXLFdBQVcsQ0FBQztJQUNwQyxJQUFJLEdBQVcsTUFBTSxDQUFDO0lBQ3RCLFdBQVcsR0FBcUIsTUFBTSxDQUFDO0lBQ3ZDLFdBQVcsR0FBRyxDQUFBLEtBQWEsQ0FBQSxDQUFDO0lBQzVCLGtCQUFrQixDQUF5QjtJQUMzQyxxQkFBcUIsQ0FBeUI7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFaEQsUUFBUSxHQUEyQixJ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cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsgSUJpenlCYXJMaW5lQ2hhcnREYXRhIH0gZnJvbSAnLi9iYXItbGluZS1jaGFydC50eXBlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIEJlaGF2aW9yU3ViamVjdCwgZmlsdGVyLCBza2lwLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRha2UsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBFTVBUWV9DSEFSVCA9IFswXTtcbmNvbnN0IE1JTl9DSEFSVF9TSVpFID0gMzUwIC8vIHB4O1xuY29uc3QgWV9BWElTX09GRlNFVCA9IDgwO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1iYXItbGluZS1jaGFydCcsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUJhckxpbmVDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHJlc2l6ZVJlZjogRWxlbWVudFJlZiA9IG51bGw7XG4gIEBJbnB1dCgpIGRvd25sb2FkTGFiZWw6IHN0cmluZyA9ICdEZXNjYXJnYXInO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSAnQml6eSc7XG4gIEBJbnB1dCgpIGF4aXNQb2ludGVyOiAnbGluZScgfCAnY3Jvc3MnID0gJ2xpbmUnO1xuICBASW5wdXQoKSB4QXhpc0xhYmVscyA9IEFycmF5PHN0cmluZz47XG4gIEBJbnB1dCgpIG9uVG9vbHRpcEZvcm1hdHRlcjogKGl0ZW06IGFueSApID0+IHN0cmluZztcbiAgQElucHV0KCkgb25YQXhpc0xhYmVsRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAjZWNoYXJ0czogZWNoYXJ0cy5FQ2hhcnRzIHwgbnVsbCA9IG51bGxcblxuICAjbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAjcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNjaGFydENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgI2FmdGVyVmlld0luaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgI3Jlc2l6ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAjZGF0YTogIEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQgPSBFTVBUWV9DSEFSVDtcblxuICAjYmFyQ2hhcnRzOiBudW1iZXIgPSAwO1xuICAjbGluZUNoYXJ0czogbnVtYmVyID0gMDtcbiAgI2NoYXJ0R3JvdXBzOiBBcnJheTxzdHJpbmc+ID0gW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShFTVBUWV9DSEFSVCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eUJhckxpbmVDaGFydERhdGE+IHwgdHlwZW9mIEVNUFRZX0NIQVJUKSB7XG4gICAgdGhpcy4jZGF0YSA9IGRhdGE7XG4gICAgdGhpcy4jYmFyQ2hhcnRzID0gMDtcbiAgICB0aGlzLiNsaW5lQ2hhcnRzID0gMDtcbiAgICB0aGlzLiNjaGFydEdyb3VwcyA9IFtdO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jYWZ0ZXJWaWV3SW5pdC5waXBlKGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSA9PT0gdHJ1ZSksIHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpXG5cbiAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb2xvcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgICBjb25zdCBzZXJpZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGNvbnN0IGxlZ2VuZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIGNvbnN0IHlBeGlzOiBBcnJheTxhbnk+ID0gW107XG4gIFxuICAgICAgdGhpcy4jZGF0YS5mb3JFYWNoKChfZCwgX2kpID0+IHtcbiAgICAgICAgaWYgKCFfZC50eXBlKSB7XG4gICAgICAgICAgX2QudHlwZSA9ICdiYXInO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfZC52YWx1ZXMpIHtcbiAgICAgICAgICBfZC52YWx1ZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF4aXNMaW5lID0ge1xuICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgbGluZVN0eWxlOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChfZC5jb2xvcikge1xuICAgICAgICAgIGNvbG9yLnB1c2goX2QuY29sb3IpO1xuICAgICAgICAgIGF4aXNMaW5lLmxpbmVTdHlsZSA9IHtcbiAgICAgICAgICAgIGNvbG9yOiBfZC5jb2xvclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuXG4gICAgICAgIGlmICghX2QuaGlkZVlBeGkpIHtcbiAgICAgICAgICBpZiAoX2QudHlwZSA9PT0gJ2JhcicpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuI2JhckNoYXJ0cyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNiYXJDaGFydHMrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy4jbGluZUNoYXJ0cyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNsaW5lQ2hhcnRzKys7XG4gICAgICAgICAgICBwb3NpdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICB9XG4gICAgICAgICAgXG5cbiAgICAgICAgICB5QXhpcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgICBuYW1lOiBfZC55TGFiZWwgfHwgX2QubGFiZWwgfHwgJycsXG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIGF4aXNMaW5lLFxuICAgICAgICAgICAgYWxpZ25UaWNrczogdHJ1ZSxcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgICBmb3JtYXR0ZXI6IF9kLm9uWUF4aXNMYWJlbEZvcm1hdHRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHlBeGlzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgICAgYWxpZ25UaWNrczogdHJ1ZSxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgICBmb3JtYXR0ZXI6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGxlZ2VuZHMucHVzaChfZC54TGFiZWwgfHwgX2QubGFiZWwpO1xuXG4gICAgICAgIGxldCBpbmRleCA9IF9pO1xuICAgICAgICBpZiAoX2QuZ3JvdXApIHtcbiAgICAgICAgICBjb25zdCBfaW5kZXggPSB0aGlzLiNjaGFydEdyb3Vwcy5maW5kSW5kZXgoX2dyb3VwID0+IF9ncm91cCA9PT0gX2QuZ3JvdXApO1xuICAgICAgICAgIGlmIChfaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBpbmRleCA9IF9pbmRleDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4jY2hhcnRHcm91cHMucHVzaChfZC5ncm91cCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuICAgICAgICBzZXJpZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogX2QudHlwZSxcbiAgICAgICAgICBuYW1lOiBfZC54TGFiZWwgfHwgX2QubGFiZWwsXG4gICAgICAgICAgeUF4aXNJbmRleDogaW5kZXgsXG4gICAgICAgICAgc21vb3RoOiB0cnVlLFxuICAgICAgICAgIHN0YWNrOiBfZC5ncm91cCxcbiAgICAgICAgICBkYXRhOiBfZC52YWx1ZXNcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9vbHRpcCA9IHtcbiAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxuICAgICAgICBhcHBlbmRUb0JvZHk6IHRydWUsXG4gICAgICAgIGF4aXNQb2ludGVyOiB7XG4gICAgICAgICAgdHlwZTogdGhpcy5heGlzUG9pbnRlclxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXR0ZXI6IHRoaXMub25Ub29sdGlwRm9ybWF0dGVyXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgIGxlZnQ6IHRoaXMuI2xpbmVDaGFydHMgPiAyID8gKHRoaXMuI2xpbmVDaGFydHMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuI2JhckNoYXJ0cyA+IDIgPyAodGhpcy4jYmFyQ2hhcnRzIC0gMikgKiBZX0FYSVNfT0ZGU0VUIDogMTAsXG4gICAgICAgIGJvdHRvbTogMzAsXG4gICAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgY29uc3QgeEF4aXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgIGF4aXNUaWNrOiB7XG4gICAgICAgICAgICBhbGlnbldpdGhMYWJlbDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YTogdGhpcy54QXhpc0xhYmVscyxcbiAgICAgICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblhBeGlzTGFiZWxGb3JtYXR0ZXIsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICBjb25zdCBsZWdlbmQgPSB7XG4gICAgICAgIHR5cGU6ICdzY3JvbGwnLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGRhdGE6IGxlZ2VuZHNcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRleHRDb2xvciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS10b29sdGlwLWNvbG9yJykgPz8gJyMwMDAnO1xuICAgICAgY29uc3QgdGV4dEJhY2tncm91bmRDb2xvciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS10b29sdGlwLWJhY2tncm91bmQtY29sb3InKSA/PyAnI2ZmZic7XG4gICAgICBjb25zdCBib3JkZXJDb2xvciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS10b29sdGlwLWJvcmRlci1jb2xvcicpID8/ICcjZmZmJztcblxuICAgICAgY29uc3QgdG9vbGJveCA9IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZmVhdHVyZToge1xuICAgICAgICAgIHNhdmVBc0ltYWdlOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZG93bmxvYWRMYWJlbFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICBpY29uU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBib3JkZXJDb2xvcixcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgdGV4dEJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICAgIHRleHRQYWRkaW5nOiA1LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7XG4gICAgICAgIHRvb2x0aXAsXG4gICAgICAgIGxlZ2VuZCxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgeEF4aXMsXG4gICAgICAgIHlBeGlzLFxuICAgICAgICB0b29sYm94LFxuICAgICAgICBzZXJpZXNcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2xvciAmJiBjb2xvci5sZW5ndGggPiAwKSB7XG4gICAgICAgIG9wdGlvbi5jb2xvciA9IGNvbG9yO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNlY2hhcnRzID0gZWNoYXJ0cy5pbml0KHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICAgIHRoaXMuI2VjaGFydHMuc2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICB0aGlzLiNlY2hhcnRzLm9uKCdjbGljaycsIHBhcmFtcyA9PiB7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChwYXJhbXMubmFtZSlcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLiNyZXNpemUkLm5leHQoKSk7XG4gICAgICBjb25zdCByZXNpemVSZWYgPSB0aGlzLnJlc2l6ZVJlZiA/IHRoaXMucmVzaXplUmVmIDogdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA/IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUocmVzaXplUmVmKTtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jcmVzaXplJC5waXBlKHNraXAoMSksIGF1ZGl0VGltZSgzMDApLCB0aHJvdHRsZVRpbWUoNTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy4jZGVsZXRlQ2hhcnRDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy4jY3JlYXRlQ2hhcnRDb250YWluZXIoKTtcblxuICAgICAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jZWNoYXJ0cyA9IGVjaGFydHMuaW5pdCh0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuI2VjaGFydHMuc2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfVxuXG4gICNjcmVhdGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgTUlOX0NIQVJUX1NJWkU7XG5cbiAgICBsZXQgbWluV2lkdGggPSBNSU5fQ0hBUlRfU0laRTtcbiAgICBsZXQgbWluSGVpZ2h0ID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgY29uc3QgYmFyQ2hhcnRNaW5XaWR0aCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktY2hhcnQtbWluLXdpZHRoJyk7XG4gICAgY29uc3QgYmFyQ2hhcnRNaW5IZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi1oZWlnaHQnKTtcbiAgICBpZiAoTnVtYmVyKGJhckNoYXJ0TWluV2lkdGgpKSB7XG4gICAgICBtaW5XaWR0aCA9IE51bWJlcihiYXJDaGFydE1pbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKE51bWJlcihiYXJDaGFydE1pbkhlaWdodCkpIHtcbiAgICAgIG1pbkhlaWdodCA9IE51bWJlcihiYXJDaGFydE1pbkhlaWdodCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoZWxlbWVudFdpZHRoLCBtaW5XaWR0aCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoZWxlbWVudEhlaWdodCwgbWluSGVpZ2h0KTtcblxuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2RlbGV0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jbXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2VjaGFydHMpIHtcbiAgICAgIHRoaXMuI2VjaGFydHMuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==