import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import { BehaviorSubject, Subscription, filter, take } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const EMPTY_CHART = [0];
export class BizyPieChartComponent {
    elementRef;
    document;
    decimalPipe;
    prefix = '';
    suffix = '';
    downloadLabel = 'Descargar';
    #mutationObserver = null;
    #subscription = new Subscription();
    #afterViewInit = new BehaviorSubject(false);
    constructor(elementRef, document, decimalPipe) {
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    ngAfterViewInit() {
        this.#mutationObserver = new MutationObserver(() => {
            if (this.elementRef.nativeElement && this.elementRef.nativeElement.offsetWidth && this.elementRef.nativeElement.offsetHeight) {
                this.#afterViewInit.next(true);
                this.#mutationObserver.disconnect();
            }
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
        else if (data && data.length === 0) {
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        this.#subscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
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
                    formatter: (item) => `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, '1.2-2')}${this.suffix} (${item.percent.toFixed(2)}%)`
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
                                    formatter: (item) => {
                                        return `${item.name}: ${this.prefix}${this.decimalPipe.transform(item.value, '1.2-2')}${this.suffix} (${item.percent.toFixed(2)}%)`;
                                    }
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
            echarts.init(this.elementRef.nativeElement).setOption(option);
        }));
    }
    ngOnDestroy() {
        this.#mutationObserver.disconnect();
        this.#subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyPieChartComponent, deps: [{ token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { prefix: "prefix", suffix: "suffix", downloadLabel: "downloadLabel", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], downloadLabel: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUVuQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUVuRSxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBT3hCLE1BQU0sT0FBTyxxQkFBcUI7SUFVRjtJQUNGO0lBQ0c7SUFYdEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDWixhQUFhLEdBQVcsV0FBVyxDQUFDO0lBRTdDLGlCQUFpQixHQUE0QixJQUFJLENBQUM7SUFDbEQsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkMsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXJELFlBQzhCLFVBQXNCLEVBQ3hCLFFBQWtCLEVBQ2YsV0FBd0I7UUFGekIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDcEQsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDakQsSUFBSSxJQUFJLENB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TTsyQkFBQyxXQUFXOzRDQVhaLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkF1Qk8sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzJztcbmltcG9ydCB7IElCaXp5UGllQ2hhcnREYXRhIH0gZnJvbSAnLi9waWUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzJztcblxuY29uc3QgRU1QVFlfQ0hBUlQgPSBbMF07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcGllLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UGllQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSBwcmVmaXggPSAnJztcbiAgQElucHV0KCkgc3VmZml4ID0gJyc7XG4gIEBJbnB1dCgpIGRvd25sb2FkTGFiZWw6IHN0cmluZyA9ICdEZXNjYXJnYXInO1xuXG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICNhZnRlclZpZXdJbml0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChEZWNpbWFsUGlwZSkgcHJpdmF0ZSBkZWNpbWFsUGlwZTogRGVjaW1hbFBpcGVcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICB0aGlzLiNhZnRlclZpZXdJbml0Lm5leHQodHJ1ZSk7XG4gICAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGF0YShkYXRhOiBBcnJheTxJQml6eVBpZUNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShkYXRhKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShFTVBUWV9DSEFSVCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI3NldENoYXJ0RGF0YShkYXRhOiBBcnJheTxJQml6eVBpZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI2FmdGVyVmlld0luaXQucGlwZShmaWx0ZXIodmFsdWUgPT4gdmFsdWUgPT09IHRydWUpLCB0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgY29sb3I6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICBkYXRhLmZvckVhY2goX2QgPT4ge1xuICAgICAgICB0b3RhbCArPSAoX2QgYXMgSUJpenlQaWVDaGFydERhdGEpLnZhbHVlO1xuICAgICAgICBpZiAoKF9kIGFzIElCaXp5UGllQ2hhcnREYXRhKS5jb2xvcikge1xuICAgICAgICAgIGNvbG9yLnB1c2goKF9kIGFzIElCaXp5UGllQ2hhcnREYXRhKS5jb2xvciBhcyBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7XG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICAgICAgZm9ybWF0dGVyOiAoaXRlbTogYW55KSA9PiBgJHtpdGVtLm5hbWV9OiAke3RoaXMucHJlZml4fSR7dGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0oaXRlbS52YWx1ZSwgJzEuMi0yJyl9JHt0aGlzLnN1ZmZpeH0gKCR7aXRlbS5wZXJjZW50LnRvRml4ZWQoMil9JSlgXG4gICAgICAgIH0sXG4gICAgICAgIHRvb2xib3g6IHtcbiAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgIGZlYXR1cmU6IHtcbiAgICAgICAgICAgIHNhdmVBc0ltYWdlOiB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmRvd25sb2FkTGFiZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGljb25TdHlsZToge1xuICAgICAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXJpZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGllJyxcbiAgICAgICAgICAgIHJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBjZW50ZXI6IFsnNTAlJywgJzUwJSddLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBub3JtYWw6IHtcbiAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdvdXRlcicsXG4gICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2l0ZW0ubmFtZX06ICR7dGhpcy5wcmVmaXh9JHt0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybShpdGVtLnZhbHVlLCAnMS4yLTInKX0ke3RoaXMuc3VmZml4fSAoJHtpdGVtLnBlcmNlbnQudG9GaXhlZCgyKX0lKWA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYWJlbExpbmU6IHtcbiAgICAgICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2xvci5sZW5ndGggPiAwICYmIGNvbG9yLmxlbmd0aCA9PT0gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgICB9XG4gICAgICBlY2hhcnRzLmluaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnNldE9wdGlvbihvcHRpb24pO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==