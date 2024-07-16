import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe, } from '@angular/common';
import { BehaviorSubject, Subject, Subscription, auditTime, filter, skip, take, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const EMPTY_CHART = [0];
const MIN_CHART_SIZE = 350; // px;
export class BizyPieChartComponent {
    elementRef;
    document;
    ref;
    renderer;
    decimalPipe;
    prefix = '';
    suffix = '';
    fixedTo = 2;
    resizeRef = null;
    downloadLabel = 'Descargar';
    onSelect = new EventEmitter();
    onFormatter = (item) => {
        return `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, `1.${this.fixedTo}-${this.fixedTo}`)}${this.suffix} (${item.percent.toFixed(this.fixedTo).replaceAll('.', ',')}%)`;
    };
    #echarts = null;
    #mutationObserver = null;
    #resizeObserver = null;
    #subscription = new Subscription();
    #chartContainer = null;
    #afterViewInit = new BehaviorSubject(false);
    #resize$ = new Subject();
    #data = EMPTY_CHART;
    constructor(elementRef, document, ref, renderer, decimalPipe) {
        this.elementRef = elementRef;
        this.document = document;
        this.ref = ref;
        this.renderer = renderer;
        this.decimalPipe = decimalPipe;
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
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
            this.#createChartContainer();
            if (!this.#chartContainer) {
                return;
            }
            const color = [];
            let total = 0;
            data.forEach(_d => {
                total += _d.value;
                if (_d.color) {
                    color.push(_d.color);
                }
            });
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: this.onFormatter
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: this.downloadLabel
                        }
                    },
                    iconStyle: {
                        emphasis: {
                            textAlign: 'right'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data,
                        itemStyle: {
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            normal: {
                                label: {
                                    position: 'outer',
                                    formatter: this.onFormatter
                                },
                                labelLine: {
                                    show: true
                                }
                            }
                        }
                    }
                ]
            };
            if (color.length > 0 && color.length === data.length) {
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
        const pieChartMinWidth = getComputedStyle(this.document.body).getPropertyValue('--bizy-pie-chart-min-width');
        const pieChartMinHeight = getComputedStyle(this.document.body).getPropertyValue('--bizy-pie-chart-min-height');
        if (Number(pieChartMinWidth)) {
            minWidth = Number(pieChartMinWidth);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: ChangeDetectorRef }, { token: Renderer2 }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { prefix: "prefix", suffix: "suffix", fixedTo: "fixedTo", resizeRef: "resizeRef", downloadLabel: "downloadLabel", onFormatter: "onFormatter", data: "data" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], fixedTo: [{
                type: Input
            }], resizeRef: [{
                type: Input
            }], downloadLabel: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onFormatter: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEdBQUksTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBRTNHLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBLENBQUMsTUFBTTtBQU9qQyxNQUFNLE9BQU8scUJBQXFCO0lBc0JGO0lBQ0Y7SUFDUztJQUNSO0lBQ0U7SUF6QnRCLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDWixNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ1osT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNaLFNBQVMsR0FBZSxJQUFJLENBQUM7SUFDN0IsYUFBYSxHQUFXLFdBQVcsQ0FBQztJQUNuQyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN2QyxXQUFXLEdBQTJCLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDM0QsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENB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LE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFdBQVc7NENBekJaLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNFLFdBQVc7c0JBQW5CLEtBQUs7Z0JBaUNPLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cyc7XG5pbXBvcnQgeyBJQml6eVBpZUNoYXJ0RGF0YSB9IGZyb20gJy4vcGllLWNoYXJ0LnR5cGVzJztcbmltcG9ydCB7IERPQ1VNRU5ULCBEZWNpbWFsUGlwZSwgIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBhdWRpdFRpbWUsIGZpbHRlciwgc2tpcCwgdGFrZSwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IEVNUFRZX0NIQVJUID0gWzBdO1xuY29uc3QgTUlOX0NIQVJUX1NJWkUgPSAzNTAgLy8gcHg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcGllLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UGllQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSBwcmVmaXggPSAnJztcbiAgQElucHV0KCkgc3VmZml4ID0gJyc7XG4gIEBJbnB1dCgpIGZpeGVkVG8gPSAyO1xuICBASW5wdXQoKSByZXNpemVSZWY6IEVsZW1lbnRSZWYgPSBudWxsO1xuICBASW5wdXQoKSBkb3dubG9hZExhYmVsOiBzdHJpbmcgPSAnRGVzY2FyZ2FyJztcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBJbnB1dCgpIG9uRm9ybWF0dGVyOiAoaXRlbTogYW55ICkgPT4gc3RyaW5nID0gKGl0ZW06IGFueSkgPT4ge1xuICAgIHJldHVybiBgJHtpdGVtLm5hbWV9OiAke3RoaXMucHJlZml4fSR7dGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0oaXRlbS52YWx1ZSwgYDEuJHt0aGlzLmZpeGVkVG99LSR7dGhpcy5maXhlZFRvfWApfSR7dGhpcy5zdWZmaXh9ICgke2l0ZW0ucGVyY2VudC50b0ZpeGVkKHRoaXMuZml4ZWRUbykucmVwbGFjZUFsbCgnLicsICcsJyl9JSlgO1xuICB9XG5cbiAgI2VjaGFydHM6IGVjaGFydHMuRUNoYXJ0cyB8IG51bGwgPSBudWxsXG5cbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAjY2hhcnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICNhZnRlclZpZXdJbml0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICNyZXNpemUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI2RhdGE6ICBBcnJheTxJQml6eVBpZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQgPSBFTVBUWV9DSEFSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERlY2ltYWxQaXBlKSBwcml2YXRlIGRlY2ltYWxQaXBlOiBEZWNpbWFsUGlwZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5UGllQ2hhcnREYXRhPikge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jZGVsZXRlQ2hhcnRDb250YWluZXIoKTtcblxuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKEVNUFRZX0NIQVJUKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyAjc2V0Q2hhcnREYXRhKGRhdGE6IEFycmF5PElCaXp5UGllQ2hhcnREYXRhPiB8IHR5cGVvZiBFTVBUWV9DSEFSVCkge1xuICAgIHRoaXMuI2RhdGEgPSBkYXRhO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jYWZ0ZXJWaWV3SW5pdC5waXBlKGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSA9PT0gdHJ1ZSksIHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKClcblxuICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbG9yOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgZGF0YS5mb3JFYWNoKF9kID0+IHtcbiAgICAgICAgdG90YWwgKz0gKF9kIGFzIElCaXp5UGllQ2hhcnREYXRhKS52YWx1ZTtcbiAgICAgICAgaWYgKChfZCBhcyBJQml6eVBpZUNoYXJ0RGF0YSkuY29sb3IpIHtcbiAgICAgICAgICBjb2xvci5wdXNoKChfZCBhcyBJQml6eVBpZUNoYXJ0RGF0YSkuY29sb3IgYXMgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbjogYW55ID0ge1xuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICAgIGZvcm1hdHRlcjogdGhpcy5vbkZvcm1hdHRlclxuICAgICAgICB9LFxuICAgICAgICB0b29sYm94OiB7XG4gICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgICBzYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICB0aXRsZTogdGhpcy5kb3dubG9hZExhYmVsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBpY29uU3R5bGU6IHtcbiAgICAgICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgICAgICByYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgY2VudGVyOiBbJzUwJScsICc1MCUnXSxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbm9ybWFsOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnb3V0ZXInLFxuICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiB0aGlzLm9uRm9ybWF0dGVyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYWJlbExpbmU6IHtcbiAgICAgICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2xvci5sZW5ndGggPiAwICYmIGNvbG9yLmxlbmd0aCA9PT0gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuI3Jlc2l6ZSQubmV4dCgpKTtcbiAgICAgIGNvbnN0IHJlc2l6ZVJlZiA9IHRoaXMucmVzaXplUmVmID8gdGhpcy5yZXNpemVSZWYgOiB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpID8gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZXNpemVSZWYpO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLiNyZXNpemUkLnBpcGUoc2tpcCgxKSwgYXVkaXRUaW1lKDMwMCksIHRocm90dGxlVGltZSg1MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLiNkZWxldGVDaGFydENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpO1xuXG4gICAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNlY2hhcnRzID0gZWNoYXJ0cy5pbml0KHRoaXMuI2NoYXJ0Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy4jZWNoYXJ0cy5zZXRPcHRpb24oey4uLm9wdGlvbiwgc2VyaWVzOiBvcHRpb24uc2VyaWVzLm1hcChfc2VyaWUgPT4geyByZXR1cm4gey4uLl9zZXJpZSwgZGF0YTogdGhpcy4jZGF0YX19KX0pO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLm9uKCdjbGljaycsIHBhcmFtcyA9PiB7XG4gICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHBhcmFtcy5uYW1lKVxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH1cblxuICAjY3JlYXRlQ2hhcnRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuI2NoYXJ0Q29udGFpbmVyIHx8ICF0aGlzLmVsZW1lbnRSZWYgfHwgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsZW1lbnRXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IE1JTl9DSEFSVF9TSVpFO1xuICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IE1JTl9DSEFSVF9TSVpFO1xuXG4gICAgbGV0IG1pbldpZHRoID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IG1pbkhlaWdodCA9IE1JTl9DSEFSVF9TSVpFO1xuICAgIGNvbnN0IHBpZUNoYXJ0TWluV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LXBpZS1jaGFydC1taW4td2lkdGgnKTtcbiAgICBjb25zdCBwaWVDaGFydE1pbkhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktcGllLWNoYXJ0LW1pbi1oZWlnaHQnKTtcbiAgICBpZiAoTnVtYmVyKHBpZUNoYXJ0TWluV2lkdGgpKSB7XG4gICAgICBtaW5XaWR0aCA9IE51bWJlcihwaWVDaGFydE1pbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKE51bWJlcihwaWVDaGFydE1pbkhlaWdodCkpIHtcbiAgICAgIG1pbkhlaWdodCA9IE51bWJlcihwaWVDaGFydE1pbkhlaWdodCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoZWxlbWVudFdpZHRoLCBtaW5XaWR0aCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoZWxlbWVudEhlaWdodCwgbWluSGVpZ2h0KTtcblxuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2RlbGV0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy4jY2hhcnRDb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jZWNoYXJ0cykge1xuICAgICAgdGhpcy4jZWNoYXJ0cy5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIl19