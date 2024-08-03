import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT } from '@angular/common';
import { auditTime, BehaviorSubject, filter, skip, Subject, Subscription, take, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxpbmUtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2Jhci1saW5lLWNoYXJ0L2Jhci1saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzRyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUEsQ0FBQyxNQUFNO0FBQ2pDLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQU16QixNQUFNLE9BQU8seUJBQXlCO0lBMkJOO0lBQ0Y7SUFDUztJQUNSO0lBN0JwQixTQUFTLEdBQXVCLElBQUksQ0FBQztJQUNyQyxPQUFPLEdBQVksSUFBSSxDQUFDO0lBQ3hCLGFBQWEsR0FBVyxXQUFXLENBQUM7SUFDcEMsSUFBSSxHQUFXLE1BQU0sQ0FBQztJQUN0QixXQUFXLEdBQXFCLE1BQU0sQ0FBQztJQUN2QyxXQUFXLEdBQWtCLEVBQUUsQ0FBQztJQUNoQyxrQkFBa0IsQ0FBeUI7SUFDM0MscUJBQXFCLENBQXlCO0lBQzdDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRWhELFFBQVEsR0FBMkIsSUFBSSxDQUFBO0lBRXZDLGlCQUFpQixH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aUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzt3R0FsVVUseUJBQXlCLGtCQTJCMUIsVUFBVSxhQUNWLFFBQVEsYUFDUixpQkFBaUIsYUFDakIsU0FBUzs0RkE5QlIseUJBQXlCLG9XQUgxQixFQUFFOzs0RkFHRCx5QkFBeUI7a0JBTHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkE0QkksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsU0FBUzs0Q0E3QlYsU0FBUztzQkFBakIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFtQ00sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsgSUJpenlCYXJMaW5lQ2hhcnREYXRhIH0gZnJvbSAnLi9iYXItbGluZS1jaGFydC50eXBlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIEJlaGF2aW9yU3ViamVjdCwgZmlsdGVyLCBza2lwLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRha2UsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBNSU5fQ0hBUlRfU0laRSA9IDM1MCAvLyBweDtcbmNvbnN0IFlfQVhJU19PRkZTRVQgPSA4MDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYmFyLWxpbmUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlCYXJMaW5lQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSByZXNpemVSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBkb3dubG9hZExhYmVsOiBzdHJpbmcgPSAnRGVzY2FyZ2FyJztcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gJ0JpenknO1xuICBASW5wdXQoKSBheGlzUG9pbnRlcjogJ2xpbmUnIHwgJ2Nyb3NzJyA9ICdsaW5lJztcbiAgQElucHV0KCkgeEF4aXNMYWJlbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgQElucHV0KCkgb25Ub29sdGlwRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBvblhBeGlzTGFiZWxGb3JtYXR0ZXI6IChpdGVtOiBhbnkgKSA9PiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICNlY2hhcnRzOiBlY2hhcnRzLkVDaGFydHMgfCBudWxsID0gbnVsbFxuXG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2NoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAjYWZ0ZXJWaWV3SW5pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAjcmVzaXplJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNkYXRhOiAgQXJyYXk8SUJpenlCYXJMaW5lQ2hhcnREYXRhPiA9IFtdO1xuXG4gICNyaWdodFlBeGlzOiBudW1iZXIgPSAwO1xuICAjbGVmdFlBeGlzOiBudW1iZXIgPSAwO1xuICAjY2hhcnRTdGFja3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgI2NoYXJ0TmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5QmFyTGluZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eUJhckxpbmVDaGFydERhdGE+KSB7XG4gICAgdGhpcy4jZGF0YSA9IGRhdGE7XG4gICAgdGhpcy4jcmlnaHRZQXhpcyA9IDA7XG4gICAgdGhpcy4jbGVmdFlBeGlzID0gMDtcbiAgICB0aGlzLiNjaGFydFN0YWNrcyA9IFtdO1xuICAgIHRoaXMuI2NoYXJ0TmFtZXMgPSBbXTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI2FmdGVyVmlld0luaXQucGlwZShmaWx0ZXIodmFsdWUgPT4gdmFsdWUgPT09IHRydWUpLCB0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy4jY3JlYXRlQ2hhcnRDb250YWluZXIoKVxuXG4gICAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VyaWVzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBjb25zdCBsZWdlbmRzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBjb25zdCB5QXhpczogQXJyYXk8YW55PiA9IFtdO1xuICBcbiAgICAgIHRoaXMuI2RhdGEuZm9yRWFjaCgoX2QsIF9pKSA9PiB7XG4gICAgICAgIGlmICghX2QudHlwZSkge1xuICAgICAgICAgIF9kLnR5cGUgPSAnYmFyJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2QudmFsdWVzKSB7XG4gICAgICAgICAgX2QudmFsdWVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBheGlzTGluZSA9IHtcbiAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge31cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb2xvciA9IHtcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKF9kLmNvbG9yKSB7XG4gICAgICAgICAgYXhpc0xpbmUubGluZVN0eWxlID0ge1xuICAgICAgICAgICAgY29sb3I6IF9kLmNvbG9yXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29sb3IubGluZVN0eWxlLmNvbG9yID0gX2QuY29sb3I7XG4gICAgICAgICAgY29sb3IuaXRlbVN0eWxlLmNvbG9yID0gX2QuY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9zaXRpb24gPSAncmlnaHQnO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGZvcm1hdHRlciA9IG51bGxcbiAgICAgICAgY29uc3QgeE5hbWUgPSBfZC54QXhpICYmICBfZC54QXhpLm5hbWUgPyAgX2QueEF4aS5uYW1lIDogX2QubGFiZWw7XG4gICAgICAgIGxldCB5TmFtZSA9IF9kLmxhYmVsO1xuXG4gICAgICAgIGlmIChfZC55QXhpKSB7XG4gICAgICAgICAgZm9ybWF0dGVyID0gX2QueUF4aS5vblZhbHVlRm9ybWF0dGVyO1xuICAgICAgICAgIHBvc2l0aW9uID0gX2QueUF4aS5wb3NpdGlvbiA/IF9kLnlBeGkucG9zaXRpb24gOiBfZC50eXBlID09PSAnYmFyJyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgICAgaWYgKF9kLnlBeGkubmFtZSkge1xuICAgICAgICAgICAgeU5hbWUgPSBfZC55QXhpLm5hbWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9kLnlBeGkuaGlkZSkge1xuICAgICAgICAgICAgYXhpc0xpbmUuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybWF0dGVyID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV9kLnlBeGkgfHwgIV9kLnlBeGkuaGlkZSkge1xuICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy4jcmlnaHRZQXhpcyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNyaWdodFlBeGlzKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuI2xlZnRZQXhpcyAqIFlfQVhJU19PRkZTRVQ7XG4gICAgICAgICAgICB0aGlzLiNsZWZ0WUF4aXMrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB5QXhpcy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgIG5hbWU6IF9kLnlBeGkgJiYgX2QueUF4aS5oaWRlID8gJycgOiB5TmFtZSxcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBhbGlnblRpY2tzOiB0cnVlLFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBheGlzTGluZSxcbiAgICAgICAgICBheGlzTGFiZWw6IHsgZm9ybWF0dGVyIH1cbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBsZWdlbmRzLnB1c2goeE5hbWUpO1xuXG4gICAgICAgIGxldCB5QXhpc0luZGV4ID0gX2k7XG4gICAgICAgIGlmIChfZC5zdGFjaykge1xuICAgICAgICAgIGNvbnN0IF9pbmRleCA9IHRoaXMuI2NoYXJ0U3RhY2tzLmZpbmRJbmRleChfc3RhY2sgPT4gX3N0YWNrID09PSBfZC5zdGFjayk7XG4gICAgICAgICAgaWYgKF9pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHlBeGlzSW5kZXggPSBfaW5kZXg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI2NoYXJ0U3RhY2tzLnB1c2goX2Quc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9pbmRleCA9IHRoaXMuI2NoYXJ0TmFtZXMuZmluZEluZGV4KF9uYW1lID0+IF9uYW1lID09PSB5TmFtZSk7XG4gICAgICAgIGlmIChfaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgeUF4aXNJbmRleCA9IF9pbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiNjaGFydE5hbWVzLnB1c2goeU5hbWUpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBzZXJpZXMucHVzaCh7Li4ue1xuICAgICAgICAgIHR5cGU6IF9kLnR5cGUsXG4gICAgICAgICAgbmFtZTogeE5hbWUsXG4gICAgICAgICAgeUF4aXNJbmRleCxcbiAgICAgICAgICBzbW9vdGg6ICFfZC5kaXNjcmV0ZSxcbiAgICAgICAgICBzdGFjazogX2Quc3RhY2ssXG4gICAgICAgICAgZGF0YTogX2QudmFsdWVzXG4gICAgICAgIH0sIC4uLmNvbG9yfSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9vbHRpcCA9IHtcbiAgICAgICAgc2hvdzogdGhpcy50b29sdGlwLFxuICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgYXhpc1BvaW50ZXI6IHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmF4aXNQb2ludGVyXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblRvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgbGVmdDogdGhpcy4jbGVmdFlBeGlzID4gMiA/ICh0aGlzLiNsZWZ0WUF4aXMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuI3JpZ2h0WUF4aXMgPiAyID8gKHRoaXMuI3JpZ2h0WUF4aXMgLSAyKSAqIFlfQVhJU19PRkZTRVQgOiAxMCxcbiAgICAgICAgYm90dG9tOiAzMCxcbiAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB4QXhpcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgYXhpc1RpY2s6IHtcbiAgICAgICAgICAgIGFsaWduV2l0aExhYmVsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB0aGlzLnhBeGlzTGFiZWxzLFxuICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uWEF4aXNMYWJlbEZvcm1hdHRlcixcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGxlZ2VuZCA9IHtcbiAgICAgICAgdHlwZTogJ3Njcm9sbCcsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgZGF0YTogbGVnZW5kc1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdGV4dENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtY29sb3InKSA/PyAnIzAwMCc7XG4gICAgICBjb25zdCB0ZXh0QmFja2dyb3VuZENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcicpID8/ICcjZmZmJztcbiAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYm9yZGVyLWNvbG9yJykgPz8gJyNmZmYnO1xuXG4gICAgICBjb25zdCB0b29sYm94ID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgc2F2ZUFzSW1hZ2U6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5kb3dubG9hZExhYmVsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgIGljb25TdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvcixcbiAgICAgICAgICAgIGJvcmRlckNvbG9yLFxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICB0ZXh0QmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgdGV4dFBhZGRpbmc6IDUsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvcHRpb246IGFueSA9IHtcbiAgICAgICAgdG9vbHRpcCxcbiAgICAgICAgbGVnZW5kLFxuICAgICAgICBncmlkLFxuICAgICAgICB4QXhpcyxcbiAgICAgICAgeUF4aXMsXG4gICAgICAgIHRvb2xib3gsXG4gICAgICAgIHNlcmllc1xuICAgICAgfTtcblxuICAgICAgdGhpcy4jZWNoYXJ0cyA9IGVjaGFydHMuaW5pdCh0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbihvcHRpb24pO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5vbignY2xpY2snLCBwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy4jcmVzaXplJC5uZXh0KCkpO1xuICAgICAgY29uc3QgcmVzaXplUmVmID0gdGhpcy5yZXNpemVSZWYgPyB0aGlzLnJlc2l6ZVJlZiA6IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgPyB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHJlc2l6ZVJlZik7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI3Jlc2l6ZSQucGlwZShza2lwKDEpLCBhdWRpdFRpbWUoMzAwKSwgdGhyb3R0bGVUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbihvcHRpb24pO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLm9uKCdjbGljaycsIHBhcmFtcyA9PiB7XG4gICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH1cblxuICAjY3JlYXRlQ2hhcnRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IE1JTl9DSEFSVF9TSVpFO1xuICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IE1JTl9DSEFSVF9TSVpFO1xuXG4gICAgbGV0IG1pbldpZHRoID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IG1pbkhlaWdodCA9IE1JTl9DSEFSVF9TSVpFO1xuICAgIGNvbnN0IGJhckNoYXJ0TWluV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi13aWR0aCcpO1xuICAgIGNvbnN0IGJhckNoYXJ0TWluSGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1jaGFydC1taW4taGVpZ2h0Jyk7XG4gICAgaWYgKE51bWJlcihiYXJDaGFydE1pbldpZHRoKSkge1xuICAgICAgbWluV2lkdGggPSBOdW1iZXIoYmFyQ2hhcnRNaW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChOdW1iZXIoYmFyQ2hhcnRNaW5IZWlnaHQpKSB7XG4gICAgICBtaW5IZWlnaHQgPSBOdW1iZXIoYmFyQ2hhcnRNaW5IZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KGVsZW1lbnRXaWR0aCwgbWluV2lkdGgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KGVsZW1lbnRIZWlnaHQsIG1pbkhlaWdodCk7XG5cbiAgICB0aGlzLiNjaGFydENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNjaGFydENvbnRhaW5lciwgJ3dpZHRoJywgYCR7d2lkdGh9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gICNkZWxldGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jZWNoYXJ0cy5jbGVhcigpO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICB0aGlzLiNjaGFydENvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNlY2hhcnRzKSB7XG4gICAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iXX0=