import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas';
import { BehaviorSubject, Subject, Subscription, auditTime, filter, skip, take, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350; // px;
export class BizyPieChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    resizeRef = null;
    tooltip = true;
    type = 'pie';
    download = { hide: false, label: 'Descargar', name: 'Bizy' };
    onLabelFormatter;
    onTooltipFormatter;
    onSelect = new EventEmitter();
    onDownload = new EventEmitter();
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = EMPTY_CHART;
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
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            if (data && data.length > 0 && data[0] !== 0) {
                this.#data = [];
                data.forEach(_d => {
                    if (!_d.value) {
                        _d.value = 0;
                    }
                    if (!_d.name) {
                        _d.name = '---';
                    }
                    const itemStyle = _d.color ? { color: _d.color } : {};
                    this.#data.push({
                        name: _d.name,
                        value: _d.value,
                        itemStyle
                    });
                });
            }
            else {
                this.#data = EMPTY_CHART;
            }
            const itemStyle = this.type === 'pie' ? {
                emphasis: {
                    label: {
                        show: true
                    }
                },
                normal: {
                    label: {
                        position: 'outer',
                        formatter: this.onLabelFormatter
                    },
                    labelLine: {
                        show: true
                    }
                }
            } :
                {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                };
            const label = this.type === 'pie' ? undefined : { show: false, position: 'center' };
            const series = [{
                    type: 'pie',
                    radius: this.type === 'pie' ? '50%' : ['40%', '55%'],
                    center: ['50%', '50%'],
                    data: this.#data,
                    itemStyle,
                    label
                }];
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
                            setTimeout(() => {
                                html2canvas(this.#chartContainer).then(canvas => {
                                    var link = document.createElement('a');
                                    link.href = canvas.toDataURL('image/png');
                                    link.download = `${this.download.name}.png`;
                                    this.renderer.appendChild(this.document.body, link);
                                    link.click();
                                    this.renderer.removeChild(this.document.body, link);
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
            const tooltip = {
                show: this.tooltip,
                trigger: 'item',
                appendToBody: true,
                formatter: this.onTooltipFormatter
            };
            const legend = this.type === 'pie' ? { show: false } : { show: true, orient: 'vertical', left: 'left' };
            const option = {
                tooltip,
                toolbox,
                legend,
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
                this.#echarts.setOption({ ...option, series: option.series.map(_serie => { return { ..._serie, data: this.#data }; }) });
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", type: "type", download: "download", onLabelFormatter: "onLabelFormatter", onTooltipFormatter: "onTooltipFormatter", data: "data" }, outputs: { onSelect: "onSelect", onDownload: "onDownload" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-pie-chart',
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
            }], type: [{
                type: Input
            }], download: [{
                type: Input
            }], onLabelFormatter: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onDownload: [{
                type: Output
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFM0csTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUEsQ0FBQyxNQUFNO0FBT2pDLE1BQU0sT0FBTyxxQkFBcUI7SUFxQkY7SUFDRjtJQUNTO0lBQ1I7SUF2QnBCLFNBQVMsR0FBdUIsSUFBSSxDQUFDO0lBQ3JDLE9BQU8sR0FBWSxJQUFJLENBQUM7SUFDeEIsSUFBSSxHQUFvQixLQUFLLENBQUM7SUFDOUIsUUFBUSxHQUFrRCxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDMUcsZ0JBQWdCLENBQXlCO0lBQ3pDLGtCQUFrQixDQUF5QjtJQUMxQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN0QyxV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QU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxTQUFTOzRDQXZCVixTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkE4Qk0sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzJztcbmltcG9ydCB7IElCaXp5UGllQ2hhcnREYXRhIH0gZnJvbSAnLi9waWUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IGh0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBhdWRpdFRpbWUsIGZpbHRlciwgc2tpcCwgdGFrZSwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IEVNUFRZX0NIQVJUID0gWzBdO1xuY29uc3QgTUlOX0NIQVJUX1NJWkUgPSAzNTAgLy8gcHg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcGllLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UGllQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSByZXNpemVSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiAncGllJyB8ICdkb251dCcgPSAncGllJztcbiAgQElucHV0KCkgZG93bmxvYWQ6IHtoaWRlPzogYm9vbGVhbiwgbGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nfSA9IHtoaWRlOiBmYWxzZSwgbGFiZWw6ICdEZXNjYXJnYXInLCBuYW1lOiAnQml6eSd9O1xuICBASW5wdXQoKSBvbkxhYmVsRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBvblRvb2x0aXBGb3JtYXR0ZXI6IChpdGVtOiBhbnkgKSA9PiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgb25Eb3dubG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAjZWNoYXJ0czogZWNoYXJ0cy5FQ2hhcnRzIHwgbnVsbCA9IG51bGxcblxuICAjbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAjcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNjaGFydENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgI2FmdGVyVmlld0luaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgI3Jlc2l6ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAjZGF0YTogIEFycmF5PHtuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGl0ZW1TdHlsZToge2NvbG9yPzogc3RyaW5nfX0+IHwgdHlwZW9mIEVNUFRZX0NIQVJUID0gRU1QVFlfQ0hBUlQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZiAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCAmJiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSkge1xuICAgICAgICB0aGlzLiNhZnRlclZpZXdJbml0Lm5leHQodHJ1ZSk7XG4gICAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGF0YShkYXRhOiBBcnJheTxJQml6eVBpZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShFTVBUWV9DSEFSVCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eVBpZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI2FmdGVyVmlld0luaXQucGlwZShmaWx0ZXIodmFsdWUgPT4gdmFsdWUgPT09IHRydWUpLCB0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy4jY3JlYXRlQ2hhcnRDb250YWluZXIoKVxuXG4gICAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwICYmIGRhdGFbMF0gIT09IDApIHtcbiAgICAgICAgdGhpcy4jZGF0YSA9IFtdO1xuICAgICAgICAoPEFycmF5PElCaXp5UGllQ2hhcnREYXRhPj5kYXRhKS5mb3JFYWNoKF9kID0+IHtcbiAgICAgICAgICBpZiAoIV9kLnZhbHVlKSB7XG4gICAgICAgICAgICBfZC52YWx1ZSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFfZC5uYW1lKSB7XG4gICAgICAgICAgICBfZC5uYW1lID0gJy0tLSdcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpdGVtU3R5bGUgPSBfZC5jb2xvciA/IHtjb2xvcjogX2QuY29sb3J9IDoge307XG4gICAgICAgICAgXG4gICAgICAgICAgKDxBcnJheTx7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBpdGVtU3R5bGU6IHtjb2xvcj86IHN0cmluZ319Pj50aGlzLiNkYXRhKS5wdXNoKHtcbiAgICAgICAgICAgICAgbmFtZTogX2QubmFtZSxcbiAgICAgICAgICAgICAgdmFsdWU6IF9kLnZhbHVlLFxuICAgICAgICAgICAgICBpdGVtU3R5bGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4jZGF0YSA9IEVNUFRZX0NIQVJUO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtU3R5bGUgPSB0aGlzLnR5cGUgPT09ICdwaWUnID8ge1xuICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBub3JtYWw6IHtcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdvdXRlcicsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IHRoaXMub25MYWJlbEZvcm1hdHRlclxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFiZWxMaW5lOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IDogXG4gICAgICB7XG4gICAgICAgIGJvcmRlclJhZGl1czogMTAsXG4gICAgICAgIGJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgICAgIGJvcmRlcldpZHRoOiAyXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBsYWJlbCA9IHRoaXMudHlwZSA9PT0gJ3BpZScgPyB1bmRlZmluZWQgOiB7IHNob3c6IGZhbHNlLCBwb3NpdGlvbjogJ2NlbnRlcicgfTtcblxuICAgICAgY29uc3Qgc2VyaWVzID0gW3tcbiAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgIHJhZGl1czogdGhpcy50eXBlID09PSAncGllJyA/ICc1MCUnIDogWyc0MCUnLCAnNTUlJ10sXG4gICAgICAgIGNlbnRlcjogWyc1MCUnLCAnNTAlJ10sXG4gICAgICAgIGRhdGE6IHRoaXMuI2RhdGEsXG4gICAgICAgIGl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWxcbiAgICAgIH1dO1xuXG4gICAgICBjb25zdCB0ZXh0Q29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1jb2xvcicpID8/ICcjMDAwJztcbiAgICAgIGNvbnN0IHRleHRCYWNrZ3JvdW5kQ29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1iYWNrZ3JvdW5kLWNvbG9yJykgPz8gJyNmZmYnO1xuICAgICAgY29uc3QgYm9yZGVyQ29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1ib3JkZXItY29sb3InKSA/PyAnI2ZmZic7XG5cbiAgICAgIGNvbnN0IHRvb2xib3ggPSB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZlYXR1cmU6IHtcbiAgICAgICAgICBteVNhdmVBc0ltYWdlOiB7XG4gICAgICAgICAgICBzaG93OiAhdGhpcy5kb3dubG9hZC5oaWRlLFxuICAgICAgICAgICAgaWNvbjogJ3BhdGg6Ly9NMjg4IDMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMybDAgMjQyLjctNzMuNC03My40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM2wxMjggMTI4YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDEyOC0xMjhjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMjg4IDI3NC43IDI4OCAzMnpNNjQgMzUyYy0zNS4zIDAtNjQgMjguNy02NCA2NGwwIDMyYzAgMzUuMyAyOC43IDY0IDY0IDY0bDM4NCAwYzM1LjMgMCA2NC0yOC43IDY0LTY0bDAtMzJjMC0zNS4zLTI4LjctNjQtNjQtNjRsLTEwMS41IDAtNDUuMyA0NS4zYy0yNSAyNS02NS41IDI1LTkwLjUgMEwxNjUuNSAzNTIgNjQgMzUyem0zNjggNTZhMjQgMjQgMCAxIDEgMCA0OCAyNCAyNCAwIDEgMSAwLTQ4eicsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5kb3dubG9hZC5sYWJlbCxcbiAgICAgICAgICAgIG9uY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBodG1sMmNhbnZhcyh0aGlzLiNjaGFydENvbnRhaW5lcikudGhlbihjYW52YXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHt0aGlzLmRvd25sb2FkLm5hbWV9LnBuZ2A7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgbGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRvd25sb2FkLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICBpY29uU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBib3JkZXJDb2xvcixcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgdGV4dEJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICAgIHRleHRQYWRkaW5nOiA1LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgdG9vbHRpcCA9IHtcbiAgICAgICAgc2hvdzogdGhpcy50b29sdGlwLFxuICAgICAgICB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uVG9vbHRpcEZvcm1hdHRlclxuICAgICAgfTtcblxuICAgICAgY29uc3QgbGVnZW5kID0gdGhpcy50eXBlID09PSAncGllJyA/IHsgc2hvdzogZmFsc2UgfSA6IHsgc2hvdzogdHJ1ZSwgb3JpZW50OiAndmVydGljYWwnLCBsZWZ0OiAnbGVmdCd9O1xuXG4gICAgICBjb25zdCBvcHRpb246IGFueSA9IHtcbiAgICAgICAgdG9vbHRpcCxcbiAgICAgICAgdG9vbGJveCxcbiAgICAgICAgbGVnZW5kLFxuICAgICAgICBzZXJpZXNcbiAgICAgIH07XG4gICAgICBcbiAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuI3Jlc2l6ZSQubmV4dCgpKTtcbiAgICAgIGNvbnN0IHJlc2l6ZVJlZiA9IHRoaXMucmVzaXplUmVmID8gdGhpcy5yZXNpemVSZWYgOiB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpID8gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZXNpemVSZWYpO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLiNyZXNpemUkLnBpcGUoc2tpcCgxKSwgYXVkaXRUaW1lKDMwMCksIHRocm90dGxlVGltZSg1MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLiNkZWxldGVDaGFydENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpO1xuXG4gICAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNlY2hhcnRzID0gZWNoYXJ0cy5pbml0KHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24oey4uLm9wdGlvbiwgc2VyaWVzOiBvcHRpb24uc2VyaWVzLm1hcChfc2VyaWUgPT4geyByZXR1cm4gey4uLl9zZXJpZSwgZGF0YTogdGhpcy4jZGF0YX19KX0pO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLm9uKCdjbGljaycsIHBhcmFtcyA9PiB7XG4gICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH1cblxuICAjY3JlYXRlQ2hhcnRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IE1JTl9DSEFSVF9TSVpFO1xuICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IE1JTl9DSEFSVF9TSVpFO1xuXG4gICAgbGV0IG1pbldpZHRoID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IG1pbkhlaWdodCA9IE1JTl9DSEFSVF9TSVpFO1xuICAgIGNvbnN0IGNoYXJ0TWluV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi13aWR0aCcpO1xuICAgIGNvbnN0IHBpZUNoYXJ0TWluSGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1jaGFydC1taW4taGVpZ2h0Jyk7XG4gICAgaWYgKE51bWJlcihjaGFydE1pbldpZHRoKSkge1xuICAgICAgbWluV2lkdGggPSBOdW1iZXIoY2hhcnRNaW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChOdW1iZXIocGllQ2hhcnRNaW5IZWlnaHQpKSB7XG4gICAgICBtaW5IZWlnaHQgPSBOdW1iZXIocGllQ2hhcnRNaW5IZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KGVsZW1lbnRXaWR0aCwgbWluV2lkdGgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KGVsZW1lbnRIZWlnaHQsIG1pbkhlaWdodCk7XG5cbiAgICB0aGlzLiNjaGFydENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLiNjaGFydENvbnRhaW5lciwgJ3dpZHRoJywgYCR7d2lkdGh9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gICNkZWxldGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4jZWNoYXJ0cy5jbGVhcigpO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICB0aGlzLiNjaGFydENvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNlY2hhcnRzKSB7XG4gICAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==