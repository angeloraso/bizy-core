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
            const series = [{
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: this.#data,
                    itemStyle: {
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
                    }
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
            const option = {
                tooltip,
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", download: "download", onLabelFormatter: "onLabelFormatter", onTooltipFormatter: "onTooltipFormatter", data: "data" }, outputs: { onSelect: "onSelect", onDownload: "onDownload" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFM0csTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUEsQ0FBQyxNQUFNO0FBT2pDLE1BQU0sT0FBTyxxQkFBcUI7SUFvQkY7SUFDRjtJQUNTO0lBQ1I7SUF0QnBCLFNBQVMsR0FBdUIsSUFBSSxDQUFDO0lBQ3JDLE9BQU8sR0FBWSxJQUFJLENBQUM7SUFDeEIsUUFBUSxHQUFrRCxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDMUcsZ0JBQWdCLENBQXlCO0lBQ3pDLGtCQUFrQixDQUF5QjtJQUMxQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN0QyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FB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QUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDO3dHQTFPVSxxQkFBcUIsa0JBb0J0QixVQUFVLGFBQ1YsUUFBUSxhQUNSLGlCQUFpQixhQUNqQixTQUFTOzRGQXZCUixxQkFBcUIsK1JBSHRCLEVBQUU7OzRGQUdELHFCQUFxQjtrQkFMakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQXFCSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxTQUFTOzRDQXRCVixTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQThCTSxJQUFJO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsgSUJpenlQaWVDaGFydERhdGEgfSBmcm9tICcuL3BpZS1jaGFydC50eXBlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgaHRtbDJjYW52YXMgZnJvbSAnaHRtbDJjYW52YXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGF1ZGl0VGltZSwgZmlsdGVyLCBza2lwLCB0YWtlLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgRU1QVFlfQ0hBUlQgPSBbMF07XG5jb25zdCBNSU5fQ0hBUlRfU0laRSA9IDM1MCAvLyBweDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1waWUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlQaWVDaGFydENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHJlc2l6ZVJlZjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgdG9vbHRpcDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGRvd25sb2FkOiB7aGlkZT86IGJvb2xlYW4sIGxhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZ30gPSB7aGlkZTogZmFsc2UsIGxhYmVsOiAnRGVzY2FyZ2FyJywgbmFtZTogJ0JpenknfTtcbiAgQElucHV0KCkgb25MYWJlbEZvcm1hdHRlcjogKGl0ZW06IGFueSApID0+IHN0cmluZztcbiAgQElucHV0KCkgb25Ub29sdGlwRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIG9uRG93bmxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgI2VjaGFydHM6IGVjaGFydHMuRUNoYXJ0cyB8IG51bGwgPSBudWxsXG5cbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjY2hhcnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICNhZnRlclZpZXdJbml0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICNyZXNpemUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI2RhdGE6ICBBcnJheTx7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBpdGVtU3R5bGU6IHtjb2xvcj86IHN0cmluZ319PiB8IHR5cGVvZiBFTVBUWV9DSEFSVCA9IEVNUFRZX0NIQVJUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgJiYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgdGhpcy4jYWZ0ZXJWaWV3SW5pdC5uZXh0KHRydWUpO1xuICAgICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGRhdGEoZGF0YTogQXJyYXk8SUJpenlQaWVDaGFydERhdGE+KSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiNkZWxldGVDaGFydENvbnRhaW5lcigpO1xuXG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoRU1QVFlfQ0hBUlQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jICNzZXRDaGFydERhdGEoZGF0YTogQXJyYXk8SUJpenlQaWVDaGFydERhdGE+IHwgdHlwZW9mIEVNUFRZX0NIQVJUKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLiNhZnRlclZpZXdJbml0LnBpcGUoZmlsdGVyKHZhbHVlID0+IHZhbHVlID09PSB0cnVlKSwgdGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKClcblxuICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhWzBdICE9PSAwKSB7XG4gICAgICAgIHRoaXMuI2RhdGEgPSBbXTtcbiAgICAgICAgKDxBcnJheTxJQml6eVBpZUNoYXJ0RGF0YT4+ZGF0YSkuZm9yRWFjaChfZCA9PiB7XG4gICAgICAgICAgaWYgKCFfZC52YWx1ZSkge1xuICAgICAgICAgICAgX2QudmFsdWUgPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghX2QubmFtZSkge1xuICAgICAgICAgICAgX2QubmFtZSA9ICctLS0nXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXRlbVN0eWxlID0gX2QuY29sb3IgPyB7Y29sb3I6IF9kLmNvbG9yfSA6IHt9O1xuICAgICAgICAgIFxuICAgICAgICAgICg8QXJyYXk8e25hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciwgaXRlbVN0eWxlOiB7Y29sb3I/OiBzdHJpbmd9fT4+dGhpcy4jZGF0YSkucHVzaCh7XG4gICAgICAgICAgICAgIG5hbWU6IF9kLm5hbWUsXG4gICAgICAgICAgICAgIHZhbHVlOiBfZC52YWx1ZSxcbiAgICAgICAgICAgICAgaXRlbVN0eWxlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuI2RhdGEgPSBFTVBUWV9DSEFSVDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VyaWVzID0gW3tcbiAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgIHJhZGl1czogJzUwJScsXG4gICAgICAgIGNlbnRlcjogWyc1MCUnLCAnNTAlJ10sXG4gICAgICAgIGRhdGE6IHRoaXMuI2RhdGEsXG4gICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBub3JtYWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnb3V0ZXInLFxuICAgICAgICAgICAgICBmb3JtYXR0ZXI6IHRoaXMub25MYWJlbEZvcm1hdHRlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxhYmVsTGluZToge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XTtcblxuICAgICAgY29uc3QgdGV4dENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtY29sb3InKSA/PyAnIzAwMCc7XG4gICAgICBjb25zdCB0ZXh0QmFja2dyb3VuZENvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcicpID8/ICcjZmZmJztcbiAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXRvb2x0aXAtYm9yZGVyLWNvbG9yJykgPz8gJyNmZmYnO1xuXG4gICAgICBjb25zdCB0b29sYm94ID0ge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgbXlTYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgc2hvdzogIXRoaXMuZG93bmxvYWQuaGlkZSxcbiAgICAgICAgICAgIGljb246ICdwYXRoOi8vTTI4OCAzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMmwwIDI0Mi43LTczLjQtNzMuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTI4IDEyOGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMGwxMjgtMTI4YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwTDI4OCAyNzQuNyAyODggMzJ6TTY0IDM1MmMtMzUuMyAwLTY0IDI4LjctNjQgNjRsMCAzMmMwIDM1LjMgMjguNyA2NCA2NCA2NGwzODQgMGMzNS4zIDAgNjQtMjguNyA2NC02NGwwLTMyYzAtMzUuMy0yOC43LTY0LTY0LTY0bC0xMDEuNSAwLTQ1LjMgNDUuM2MtMjUgMjUtNjUuNSAyNS05MC41IDBMMTY1LjUgMzUyIDY0IDM1MnptMzY4IDU2YTI0IDI0IDAgMSAxIDAgNDggMjQgMjQgMCAxIDEgMC00OHonLFxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZG93bmxvYWQubGFiZWwsXG4gICAgICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaHRtbDJjYW52YXModGhpcy4jY2hhcnRDb250YWluZXIpLnRoZW4oY2FudmFzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rLmRvd25sb2FkID0gYCR7dGhpcy5kb3dubG9hZC5uYW1lfS5wbmdgO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBsaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIGxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Eb3dubG9hZC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgaWNvblN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3IsXG4gICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICB0ZXh0UGFkZGluZzogNSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRvb2x0aXAgPSB7XG4gICAgICAgIHNob3c6IHRoaXMudG9vbHRpcCxcbiAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICBhcHBlbmRUb0JvZHk6IHRydWUsXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblRvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7XG4gICAgICAgIHRvb2x0aXAsXG4gICAgICAgIHRvb2xib3gsXG4gICAgICAgIHNlcmllc1xuICAgICAgfTtcbiAgICAgIFxuICAgICAgdGhpcy4jZWNoYXJ0cyA9IGVjaGFydHMuaW5pdCh0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbihvcHRpb24pO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5vbignY2xpY2snLCBwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy4jcmVzaXplJC5uZXh0KCkpO1xuICAgICAgY29uc3QgcmVzaXplUmVmID0gdGhpcy5yZXNpemVSZWYgPyB0aGlzLnJlc2l6ZVJlZiA6IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgPyB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHJlc2l6ZVJlZik7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI3Jlc2l6ZSQucGlwZShza2lwKDEpLCBhdWRpdFRpbWUoMzAwKSwgdGhyb3R0bGVUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbih7Li4ub3B0aW9uLCBzZXJpZXM6IG9wdGlvbi5zZXJpZXMubWFwKF9zZXJpZSA9PiB7IHJldHVybiB7Li4uX3NlcmllLCBkYXRhOiB0aGlzLiNkYXRhfX0pfSk7XG4gICAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfVxuXG4gICNjcmVhdGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgTUlOX0NIQVJUX1NJWkU7XG5cbiAgICBsZXQgbWluV2lkdGggPSBNSU5fQ0hBUlRfU0laRTtcbiAgICBsZXQgbWluSGVpZ2h0ID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgY29uc3QgY2hhcnRNaW5XaWR0aCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktY2hhcnQtbWluLXdpZHRoJyk7XG4gICAgY29uc3QgcGllQ2hhcnRNaW5IZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi1oZWlnaHQnKTtcbiAgICBpZiAoTnVtYmVyKGNoYXJ0TWluV2lkdGgpKSB7XG4gICAgICBtaW5XaWR0aCA9IE51bWJlcihjaGFydE1pbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKE51bWJlcihwaWVDaGFydE1pbkhlaWdodCkpIHtcbiAgICAgIG1pbkhlaWdodCA9IE51bWJlcihwaWVDaGFydE1pbkhlaWdodCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoZWxlbWVudFdpZHRoLCBtaW5XaWR0aCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoZWxlbWVudEhlaWdodCwgbWluSGVpZ2h0KTtcblxuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2RlbGV0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jbXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2VjaGFydHMpIHtcbiAgICAgIHRoaXMuI2VjaGFydHMuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxufVxuIl19