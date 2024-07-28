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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxpbmUtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Jhci1saW5lLWNoYXJ0L2Jhci1saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzRyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQSxDQUFDLE1BQU07QUFDakMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBTXpCLE1BQU0sT0FBTyx5QkFBeUI7SUF5Qk47SUFDRjtJQUNTO0lBQ1I7SUEzQnBCLFNBQVMsR0FBZ0IsSUFBSSxDQUFDO0lBQzlCLGFBQWEsR0FBVyxXQUFXLENBQUM7SUFDcEMsSUFBSSxHQUFXLE1BQU0sQ0FBQztJQUN0QixXQUFXLEdBQXFCLE1BQU0sQ0FBQztJQUN2QyxXQUFXLEdBQUcsQ0FBQSxLQUFhLENBQUEsQ0FBQztJQUM1QixrQkFBa0IsQ0FBeUI7SUFDM0MscUJBQXFCLENBQXlCO0lBQzdDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRWhELFFBQVEsR0FBMkIs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dHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzJztcbmltcG9ydCB7IElCaXp5QmFyTGluZUNoYXJ0RGF0YSB9IGZyb20gJy4vYmFyLWxpbmUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBCZWhhdmlvclN1YmplY3QsIGZpbHRlciwgc2tpcCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCB0YWtlLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgRU1QVFlfQ0hBUlQgPSBbMF07XG5jb25zdCBNSU5fQ0hBUlRfU0laRSA9IDM1MCAvLyBweDtcbmNvbnN0IFlfQVhJU19PRkZTRVQgPSA4MDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYmFyLWxpbmUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlCYXJMaW5lQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSByZXNpemVSZWY6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgQElucHV0KCkgZG93bmxvYWRMYWJlbDogc3RyaW5nID0gJ0Rlc2Nhcmdhcic7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9ICdCaXp5JztcbiAgQElucHV0KCkgYXhpc1BvaW50ZXI6ICdsaW5lJyB8ICdjcm9zcycgPSAnbGluZSc7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWxzID0gQXJyYXk8c3RyaW5nPjtcbiAgQElucHV0KCkgb25Ub29sdGlwRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBvblhBeGlzTGFiZWxGb3JtYXR0ZXI6IChpdGVtOiBhbnkgKSA9PiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICNlY2hhcnRzOiBlY2hhcnRzLkVDaGFydHMgfCBudWxsID0gbnVsbFxuXG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2NoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAjYWZ0ZXJWaWV3SW5pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAjcmVzaXplJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNkYXRhOiAgQXJyYXk8SUJpenlCYXJMaW5lQ2hhcnREYXRhPiB8IHR5cGVvZiBFTVBUWV9DSEFSVCA9IEVNUFRZX0NIQVJUO1xuXG4gICNiYXJDaGFydHM6IG51bWJlciA9IDA7XG4gICNsaW5lQ2hhcnRzOiBudW1iZXIgPSAwO1xuICAjY2hhcnRHcm91cHM6IEFycmF5PHN0cmluZz4gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgdGhpcy4jYWZ0ZXJWaWV3SW5pdC5uZXh0KHRydWUpO1xuICAgICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGRhdGEoZGF0YTogQXJyYXk8SUJpenlCYXJMaW5lQ2hhcnREYXRhPikge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jZGVsZXRlQ2hhcnRDb250YWluZXIoKTtcblxuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKEVNUFRZX0NIQVJUKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyAjc2V0Q2hhcnREYXRhKGRhdGE6IEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQpIHtcbiAgICB0aGlzLiNkYXRhID0gZGF0YTtcbiAgICB0aGlzLiNiYXJDaGFydHMgPSAwO1xuICAgIHRoaXMuI2xpbmVDaGFydHMgPSAwO1xuICAgIHRoaXMuI2NoYXJ0R3JvdXBzID0gW107XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLiNhZnRlclZpZXdJbml0LnBpcGUoZmlsdGVyKHZhbHVlID0+IHZhbHVlID09PSB0cnVlKSwgdGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKClcblxuICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbG9yOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgIGNvbnN0IHNlcmllczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgY29uc3QgbGVnZW5kczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgY29uc3QgeUF4aXM6IEFycmF5PGFueT4gPSBbXTtcbiAgXG4gICAgICB0aGlzLiNkYXRhLmZvckVhY2goKF9kLCBfaSkgPT4ge1xuICAgICAgICBpZiAoIV9kLnR5cGUpIHtcbiAgICAgICAgICBfZC50eXBlID0gJ2Jhcic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV9kLnZhbHVlcykge1xuICAgICAgICAgIF9kLnZhbHVlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXhpc0xpbmUgPSB7XG4gICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKF9kLmNvbG9yKSB7XG4gICAgICAgICAgY29sb3IucHVzaChfZC5jb2xvcik7XG4gICAgICAgICAgYXhpc0xpbmUubGluZVN0eWxlID0ge1xuICAgICAgICAgICAgY29sb3I6IF9kLmNvbG9yXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG5cbiAgICAgICAgaWYgKCFfZC5oaWRlWUF4aSkge1xuICAgICAgICAgIGlmIChfZC50eXBlID09PSAnYmFyJykge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy4jYmFyQ2hhcnRzICogWV9BWElTX09GRlNFVDtcbiAgICAgICAgICAgIHRoaXMuI2JhckNoYXJ0cysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLiNsaW5lQ2hhcnRzICogWV9BWElTX09GRlNFVDtcbiAgICAgICAgICAgIHRoaXMuI2xpbmVDaGFydHMrKztcbiAgICAgICAgICAgIHBvc2l0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcblxuICAgICAgICAgIHlBeGlzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgIG5hbWU6IF9kLnlMYWJlbCB8fCBfZC5sYWJlbCB8fCAnJyxcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgYXhpc0xpbmUsXG4gICAgICAgICAgICBhbGlnblRpY2tzOiB0cnVlLFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICAgIGZvcm1hdHRlcjogX2Qub25ZQXhpc0xhYmVsRm9ybWF0dGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeUF4aXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICBhbGlnblRpY2tzOiB0cnVlLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICAgIGZvcm1hdHRlcjogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgbGVnZW5kcy5wdXNoKF9kLnhMYWJlbCB8fCBfZC5sYWJlbCk7XG5cbiAgICAgICAgbGV0IGluZGV4ID0gX2k7XG4gICAgICAgIGlmIChfZC5ncm91cCkge1xuICAgICAgICAgIGNvbnN0IF9pbmRleCA9IHRoaXMuI2NoYXJ0R3JvdXBzLmZpbmRJbmRleChfZ3JvdXAgPT4gX2dyb3VwID09PSBfZC5ncm91cCk7XG4gICAgICAgICAgaWYgKF9pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGluZGV4ID0gX2luZGV4O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiNjaGFydEdyb3Vwcy5wdXNoKF9kLmdyb3VwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHNlcmllcy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBfZC50eXBlLFxuICAgICAgICAgIG5hbWU6IF9kLnhMYWJlbCB8fCBfZC5sYWJlbCxcbiAgICAgICAgICB5QXhpc0luZGV4OiBpbmRleCxcbiAgICAgICAgICBzbW9vdGg6IHRydWUsXG4gICAgICAgICAgc3RhY2s6IF9kLmdyb3VwLFxuICAgICAgICAgIGRhdGE6IF9kLnZhbHVlc1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b29sdGlwID0ge1xuICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgYXhpc1BvaW50ZXI6IHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmF4aXNQb2ludGVyXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblRvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgbGVmdDogdGhpcy4jbGluZUNoYXJ0cyA+IDIgPyAodGhpcy4jbGluZUNoYXJ0cyAtIDIpICogWV9BWElTX09GRlNFVCA6IDEwLFxuICAgICAgICByaWdodDogdGhpcy4jYmFyQ2hhcnRzID4gMiA/ICh0aGlzLiNiYXJDaGFydHMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgYm90dG9tOiAzMCxcbiAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB4QXhpcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgYXhpc1RpY2s6IHtcbiAgICAgICAgICAgIGFsaWduV2l0aExhYmVsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB0aGlzLnhBeGlzTGFiZWxzLFxuICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uWEF4aXNMYWJlbEZvcm1hdHRlcixcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGxlZ2VuZCA9IHtcbiAgICAgICAgdHlwZTogJ3Njcm9sbCcsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgZGF0YTogbGVnZW5kc1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdGV4dENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtY29sb3InKSA/PyAnIzAwMCc7XG4gICAgICBjb25zdCB0ZXh0QmFja2dyb3VuZENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcicpID8/ICcjZmZmJztcbiAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYm9yZGVyLWNvbG9yJykgPz8gJyNmZmYnO1xuXG4gICAgICBjb25zdCB0b29sYm94ID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgc2F2ZUFzSW1hZ2U6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5kb3dubG9hZExhYmVsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgIGljb25TdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvcixcbiAgICAgICAgICAgIGJvcmRlckNvbG9yLFxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICB0ZXh0QmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgdGV4dFBhZGRpbmc6IDUsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvcHRpb246IGFueSA9IHtcbiAgICAgICAgdG9vbHRpcCxcbiAgICAgICAgbGVnZW5kLFxuICAgICAgICBncmlkLFxuICAgICAgICB4QXhpcyxcbiAgICAgICAgeUF4aXMsXG4gICAgICAgIHRvb2xib3gsXG4gICAgICAgIHNlcmllc1xuICAgICAgfTtcblxuICAgICAgaWYgKGNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuI3Jlc2l6ZSQubmV4dCgpKTtcbiAgICAgIGNvbnN0IHJlc2l6ZVJlZiA9IHRoaXMucmVzaXplUmVmID8gdGhpcy5yZXNpemVSZWYgOiB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpID8gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZXNpemVSZWYpO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLiNyZXNpemUkLnBpcGUoc2tpcCgxKSwgYXVkaXRUaW1lKDMwMCksIHRocm90dGxlVGltZSg1MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLiNkZWxldGVDaGFydENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpO1xuXG4gICAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNlY2hhcnRzID0gZWNoYXJ0cy5pbml0KHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgdGhpcy4jZWNoYXJ0cy5vbignY2xpY2snLCBwYXJhbXMgPT4ge1xuICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChwYXJhbXMubmFtZSlcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9XG5cbiAgI2NyZWF0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLiNjaGFydENvbnRhaW5lciB8fCAhdGhpcy5lbGVtZW50UmVmIHx8ICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbGVtZW50V2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCBNSU5fQ0hBUlRfU0laRTtcbiAgICBsZXQgZWxlbWVudEhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCB8fCBNSU5fQ0hBUlRfU0laRTtcblxuICAgIGxldCBtaW5XaWR0aCA9IE1JTl9DSEFSVF9TSVpFO1xuICAgIGxldCBtaW5IZWlnaHQgPSBNSU5fQ0hBUlRfU0laRTtcbiAgICBjb25zdCBiYXJDaGFydE1pbldpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1jaGFydC1taW4td2lkdGgnKTtcbiAgICBjb25zdCBiYXJDaGFydE1pbkhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktY2hhcnQtbWluLWhlaWdodCcpO1xuICAgIGlmIChOdW1iZXIoYmFyQ2hhcnRNaW5XaWR0aCkpIHtcbiAgICAgIG1pbldpZHRoID0gTnVtYmVyKGJhckNoYXJ0TWluV2lkdGgpO1xuICAgIH1cbiAgICBpZiAoTnVtYmVyKGJhckNoYXJ0TWluSGVpZ2h0KSkge1xuICAgICAgbWluSGVpZ2h0ID0gTnVtYmVyKGJhckNoYXJ0TWluSGVpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1heChlbGVtZW50V2lkdGgsIG1pbldpZHRoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heChlbGVtZW50SGVpZ2h0LCBtaW5IZWlnaHQpO1xuXG4gICAgdGhpcy4jY2hhcnRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICd3aWR0aCcsIGAke3dpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNjaGFydENvbnRhaW5lciwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjZGVsZXRlQ2hhcnRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lciB8fCAhdGhpcy5lbGVtZW50UmVmIHx8ICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuI2VjaGFydHMuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy4jY2hhcnRDb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jZWNoYXJ0cykge1xuICAgICAgdGhpcy4jZWNoYXJ0cy5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIl19