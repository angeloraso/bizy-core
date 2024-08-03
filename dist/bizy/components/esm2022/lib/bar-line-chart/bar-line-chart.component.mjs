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
    tooltip = true;
    downloadLabel = 'Descargar';
    name = 'Bizy';
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
            this.#setChartData(EMPTY_CHART);
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
                let formatter = '';
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
                        formatter = '';
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarLineChartComponent, selector: "bizy-bar-line-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", downloadLabel: "downloadLabel", name: "name", axisPointer: "axisPointer", xAxisLabels: "xAxisLabels", onTooltipFormatter: "onTooltipFormatter", onXAxisLabelFormatter: "onXAxisLabelFormatter", data: "data" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxpbmUtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Jhci1saW5lLWNoYXJ0L2Jhci1saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzRyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQSxDQUFDLE1BQU07QUFDakMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBTXpCLE1BQU0sT0FBTyx5QkFBeUI7SUEyQk47SUFDRjtJQUNTO0lBQ1I7SUE3QnBCLFNBQVMsR0FBdUIsSUFBSSxDQUFDO0lBQ3JDLE9BQU8sR0FBWSxJQUFJLENBQUM7SUFDeEIsYUFBYSxHQUFXLFdBQVcsQ0FBQztJQUNwQyxJQUFJLEdBQVcsTUFBTSxDQUFDO0lBQ3RCLFdBQVcsR0FBcUIsTUFBTSxDQUFDO0lBQ3ZDLFdBQVcsR0FBa0IsRUFBRSxDQUFDO0lBQ2hDLGtCQUFrQixDQUF5QjtJQUMzQyxxQkFBcUIsQ0FBeUI7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7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b25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzJztcbmltcG9ydCB7IElCaXp5QmFyTGluZUNoYXJ0RGF0YSB9IGZyb20gJy4vYmFyLWxpbmUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBCZWhhdmlvclN1YmplY3QsIGZpbHRlciwgc2tpcCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCB0YWtlLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgRU1QVFlfQ0hBUlQgPSBbMF07XG5jb25zdCBNSU5fQ0hBUlRfU0laRSA9IDM1MCAvLyBweDtcbmNvbnN0IFlfQVhJU19PRkZTRVQgPSA4MDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYmFyLWxpbmUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlCYXJMaW5lQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSByZXNpemVSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBkb3dubG9hZExhYmVsOiBzdHJpbmcgPSAnRGVzY2FyZ2FyJztcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gJ0JpenknO1xuICBASW5wdXQoKSBheGlzUG9pbnRlcjogJ2xpbmUnIHwgJ2Nyb3NzJyA9ICdsaW5lJztcbiAgQElucHV0KCkgeEF4aXNMYWJlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgQElucHV0KCkgb25Ub29sdGlwRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBvblhBeGlzTGFiZWxGb3JtYXR0ZXI6IChpdGVtOiBhbnkgKSA9PiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICNlY2hhcnRzOiBlY2hhcnRzLkVDaGFydHMgfCBudWxsID0gbnVsbFxuXG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2NoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAjYWZ0ZXJWaWV3SW5pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAjcmVzaXplJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNkYXRhOiAgQXJyYXk8SUJpenlCYXJMaW5lQ2hhcnREYXRhPiB8IHR5cGVvZiBFTVBUWV9DSEFSVCA9IEVNUFRZX0NIQVJUO1xuXG4gICNyaWdodFlBeGlzOiBudW1iZXIgPSAwO1xuICAjbGVmdFlBeGlzOiBudW1iZXIgPSAwO1xuICAjY2hhcnRTdGFja3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgI2NoYXJ0TmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShFTVBUWV9DSEFSVCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eUJhckxpbmVDaGFydERhdGE+IHwgdHlwZW9mIEVNUFRZX0NIQVJUKSB7XG4gICAgdGhpcy4jZGF0YSA9IGRhdGE7XG4gICAgdGhpcy4jcmlnaHRZQXhpcyA9IDA7XG4gICAgdGhpcy4jbGVmdFlBeGlzID0gMDtcbiAgICB0aGlzLiNjaGFydFN0YWNrcyA9IFtdO1xuICAgIHRoaXMuI2NoYXJ0TmFtZXMgPSBbXTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI2FmdGVyVmlld0luaXQucGlwZShmaWx0ZXIodmFsdWUgPT4gdmFsdWUgPT09IHRydWUpLCB0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy4jY3JlYXRlQ2hhcnRDb250YWluZXIoKVxuXG4gICAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VyaWVzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBjb25zdCBsZWdlbmRzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBjb25zdCB5QXhpczogQXJyYXk8YW55PiA9IFtdO1xuICBcbiAgICAgIHRoaXMuI2RhdGEuZm9yRWFjaCgoX2QsIF9pKSA9PiB7XG4gICAgICAgIGlmICghX2QudHlwZSkge1xuICAgICAgICAgIF9kLnR5cGUgPSAnYmFyJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2QudmFsdWVzKSB7XG4gICAgICAgICAgX2QudmFsdWVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBheGlzTGluZSA9IHtcbiAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge31cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb2xvciA9IHtcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKF9kLmNvbG9yKSB7XG4gICAgICAgICAgYXhpc0xpbmUubGluZVN0eWxlID0ge1xuICAgICAgICAgICAgY29sb3I6IF9kLmNvbG9yXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29sb3IubGluZVN0eWxlLmNvbG9yID0gX2QuY29sb3I7XG4gICAgICAgICAgY29sb3IuaXRlbVN0eWxlLmNvbG9yID0gX2QuY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9zaXRpb24gPSAncmlnaHQnO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGZvcm1hdHRlciA9ICcnXG4gICAgICAgIGNvbnN0IHhOYW1lID0gX2QueEF4aSAmJiAgX2QueEF4aS5uYW1lID8gIF9kLnhBeGkubmFtZSA6IF9kLmxhYmVsO1xuICAgICAgICBsZXQgeU5hbWUgPSBfZC5sYWJlbDtcblxuICAgICAgICBpZiAoX2QueUF4aSkge1xuICAgICAgICAgIGZvcm1hdHRlciA9IF9kLnlBeGkub25WYWx1ZUZvcm1hdHRlcjtcbiAgICAgICAgICBwb3NpdGlvbiA9IF9kLnlBeGkucG9zaXRpb24gPyBfZC55QXhpLnBvc2l0aW9uIDogX2QudHlwZSA9PT0gJ2JhcicgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICAgIGlmIChfZC55QXhpLm5hbWUpIHtcbiAgICAgICAgICAgIHlOYW1lID0gX2QueUF4aS5uYW1lO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfZC55QXhpLmhpZGUpIHtcbiAgICAgICAgICAgIGF4aXNMaW5lLnNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcm1hdHRlciA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2QueUF4aSB8fCAhX2QueUF4aS5oaWRlKSB7XG4gICAgICAgICAgaWYgKHBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLiNyaWdodFlBeGlzICogWV9BWElTX09GRlNFVDtcbiAgICAgICAgICAgIHRoaXMuI3JpZ2h0WUF4aXMrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy4jbGVmdFlBeGlzICogWV9BWElTX09GRlNFVDtcbiAgICAgICAgICAgIHRoaXMuI2xlZnRZQXhpcysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHlBeGlzLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgbmFtZTogX2QueUF4aSAmJiBfZC55QXhpLmhpZGUgPyAnJyA6IHlOYW1lLFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIGFsaWduVGlja3M6IHRydWUsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIGF4aXNMaW5lLFxuICAgICAgICAgIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXIgfVxuICAgICAgICB9KTtcbiAgXG4gICAgICAgIGxlZ2VuZHMucHVzaCh4TmFtZSk7XG5cbiAgICAgICAgbGV0IHlBeGlzSW5kZXggPSBfaTtcbiAgICAgICAgaWYgKF9kLnN0YWNrKSB7XG4gICAgICAgICAgY29uc3QgX2luZGV4ID0gdGhpcy4jY2hhcnRTdGFja3MuZmluZEluZGV4KF9zdGFjayA9PiBfc3RhY2sgPT09IF9kLnN0YWNrKTtcbiAgICAgICAgICBpZiAoX2luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgeUF4aXNJbmRleCA9IF9pbmRleDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4jY2hhcnRTdGFja3MucHVzaChfZC5zdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgX2luZGV4ID0gdGhpcy4jY2hhcnROYW1lcy5maW5kSW5kZXgoX25hbWUgPT4gX25hbWUgPT09IHlOYW1lKTtcbiAgICAgICAgaWYgKF9pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB5QXhpc0luZGV4ID0gX2luZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuI2NoYXJ0TmFtZXMucHVzaCh5TmFtZSk7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHNlcmllcy5wdXNoKHsuLi57XG4gICAgICAgICAgdHlwZTogX2QudHlwZSxcbiAgICAgICAgICBuYW1lOiB4TmFtZSxcbiAgICAgICAgICB5QXhpc0luZGV4LFxuICAgICAgICAgIHNtb290aDogIV9kLmRpc2NyZXRlLFxuICAgICAgICAgIHN0YWNrOiBfZC5zdGFjayxcbiAgICAgICAgICBkYXRhOiBfZC52YWx1ZXNcbiAgICAgICAgfSwgLi4uY29sb3J9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b29sdGlwID0ge1xuICAgICAgICBzaG93OiB0aGlzLnRvb2x0aXAsXG4gICAgICAgIHRyaWdnZXI6ICdheGlzJyxcbiAgICAgICAgYXBwZW5kVG9Cb2R5OiB0cnVlLFxuICAgICAgICBheGlzUG9pbnRlcjoge1xuICAgICAgICAgIHR5cGU6IHRoaXMuYXhpc1BvaW50ZXJcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uVG9vbHRpcEZvcm1hdHRlclxuICAgICAgfVxuXG4gICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICBsZWZ0OiB0aGlzLiNsZWZ0WUF4aXMgPiAyID8gKHRoaXMuI2xlZnRZQXhpcyAtIDIpICogWV9BWElTX09GRlNFVCA6IDEwLFxuICAgICAgICByaWdodDogdGhpcy4jcmlnaHRZQXhpcyA+IDIgPyAodGhpcy4jcmlnaHRZQXhpcyAtIDIpICogWV9BWElTX09GRlNFVCA6IDEwLFxuICAgICAgICBib3R0b206IDMwLFxuICAgICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHhBeGlzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICBheGlzVGljazoge1xuICAgICAgICAgICAgYWxpZ25XaXRoTGFiZWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHRoaXMueEF4aXNMYWJlbHMsXG4gICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IHRoaXMub25YQXhpc0xhYmVsRm9ybWF0dGVyLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXTtcblxuICAgICAgY29uc3QgbGVnZW5kID0ge1xuICAgICAgICB0eXBlOiAnc2Nyb2xsJyxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBkYXRhOiBsZWdlbmRzXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB0ZXh0Q29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1jb2xvcicpID8/ICcjMDAwJztcbiAgICAgIGNvbnN0IHRleHRCYWNrZ3JvdW5kQ29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1iYWNrZ3JvdW5kLWNvbG9yJykgPz8gJyNmZmYnO1xuICAgICAgY29uc3QgYm9yZGVyQ29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1ib3JkZXItY29sb3InKSA/PyAnI2ZmZic7XG5cbiAgICAgIGNvbnN0IHRvb2xib3ggPSB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZlYXR1cmU6IHtcbiAgICAgICAgICBzYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmRvd25sb2FkTGFiZWxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgaWNvblN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3IsXG4gICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICB0ZXh0UGFkZGluZzogNSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9wdGlvbjogYW55ID0ge1xuICAgICAgICB0b29sdGlwLFxuICAgICAgICBsZWdlbmQsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIHhBeGlzLFxuICAgICAgICB5QXhpcyxcbiAgICAgICAgdG9vbGJveCxcbiAgICAgICAgc2VyaWVzXG4gICAgICB9O1xuXG4gICAgICB0aGlzLiNlY2hhcnRzID0gZWNoYXJ0cy5pbml0KHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICAgIHRoaXMuI2VjaGFydHMuc2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICB0aGlzLiNlY2hhcnRzLm9uKCdjbGljaycsIHBhcmFtcyA9PiB7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChwYXJhbXMubmFtZSlcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLiNyZXNpemUkLm5leHQoKSk7XG4gICAgICBjb25zdCByZXNpemVSZWYgPSB0aGlzLnJlc2l6ZVJlZiA/IHRoaXMucmVzaXplUmVmIDogdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA/IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUocmVzaXplUmVmKTtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jcmVzaXplJC5waXBlKHNraXAoMSksIGF1ZGl0VGltZSgzMDApLCB0aHJvdHRsZVRpbWUoNTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy4jZGVsZXRlQ2hhcnRDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy4jY3JlYXRlQ2hhcnRDb250YWluZXIoKTtcblxuICAgICAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jZWNoYXJ0cyA9IGVjaGFydHMuaW5pdCh0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuI2VjaGFydHMuc2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfVxuXG4gICNjcmVhdGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgTUlOX0NIQVJUX1NJWkU7XG5cbiAgICBsZXQgbWluV2lkdGggPSBNSU5fQ0hBUlRfU0laRTtcbiAgICBsZXQgbWluSGVpZ2h0ID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgY29uc3QgYmFyQ2hhcnRNaW5XaWR0aCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktY2hhcnQtbWluLXdpZHRoJyk7XG4gICAgY29uc3QgYmFyQ2hhcnRNaW5IZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi1oZWlnaHQnKTtcbiAgICBpZiAoTnVtYmVyKGJhckNoYXJ0TWluV2lkdGgpKSB7XG4gICAgICBtaW5XaWR0aCA9IE51bWJlcihiYXJDaGFydE1pbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKE51bWJlcihiYXJDaGFydE1pbkhlaWdodCkpIHtcbiAgICAgIG1pbkhlaWdodCA9IE51bWJlcihiYXJDaGFydE1pbkhlaWdodCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoZWxlbWVudFdpZHRoLCBtaW5XaWR0aCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoZWxlbWVudEhlaWdodCwgbWluSGVpZ2h0KTtcblxuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2RlbGV0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jbXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2VjaGFydHMpIHtcbiAgICAgIHRoaXMuI2VjaGFydHMuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==