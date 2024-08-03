import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT } from '@angular/common';
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
    name = 'Bizy';
    downloadLabel = 'Descargar';
    onTooltipFormatter;
    onSelect = new EventEmitter();
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
                    normal: {
                        label: {
                            position: 'outer',
                            formatter: this.onTooltipFormatter
                        },
                        labelLine: {
                            show: true
                        }
                    }
                }];
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyPieChartComponent, selector: "bizy-pie-chart", inputs: { resizeRef: "resizeRef", tooltip: "tooltip", name: "name", downloadLabel: "downloadLabel", onTooltipFormatter: "onTooltipFormatter", data: "data" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
            }], name: [{
                type: Input
            }], downloadLabel: [{
                type: Input
            }], onTooltipFormatter: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzRyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQSxDQUFDLE1BQU07QUFPakMsTUFBTSxPQUFPLHFCQUFxQjtJQW1CRjtJQUNGO0lBQ1M7SUFDUjtJQXJCcEIsU0FBUyxHQUF1QixJQUFJLENBQUM7SUFDckMsT0FBTyxHQUFZLElBQUksQ0FBQztJQUN4QixJQUFJLEdBQVcsTUFBTSxDQUFDO0lBQ3RCLGFBQWEsR0FBVyxXQUFXLENBQUM7SUFDcEMsa0JBQWtCLENBQXlCO0lBQzFDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRWhELFFBQVEsR0FBMkIsSUFBSSxDQUFBO0lBRXZDLGlCQUFpQixHQUE0QixJQUFJLENBQUM7SUFDbEQsZUFBZSxHQUEwQixJQUFJLENBQUM7SUFDOUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkMsZUFBZSxHQUEwQixJQUFJLENBQUM7SUFDOUMsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3JELFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBQy9CLEtBQUssR0FBNEYsV0FBVyxDQUFDO0lBRTdHLFlBQzhCLFVBQXNCLEVBQ3hCLFFBQWtCLEVBQ1QsR0FBc0IsRUFDOUIsUUFBbUI7UUFIbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ1QsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUM3QyxDQUFDO0lBRUosZUFBZTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtZQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pKLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxJQUFhLElBQUksQ0FBQyxJQUE4QjtRQUM5QyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBbUQ7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7WUFFNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE9BQU87YUFDUjtZQUVELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNXLElBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO3dCQUNiLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO29CQUVELElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFO3dCQUNaLEVBQUUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFBO3FCQUNoQjtvQkFFRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFFZ0IsSUFBSSxDQUFDLEtBQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2pGLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTt3QkFDYixLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUs7d0JBQ2YsU0FBUztxQkFDVixDQUFDLENBQUE7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQzthQUMxQjtZQUVELE1BQU0sTUFBTSxHQUFHLENBQUM7b0JBQ2QsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztvQkFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNoQixNQUFNLEVBQUU7d0JBQ04sS0FBSyxFQUFFOzRCQUNMLFFBQVEsRUFBRSxPQUFPOzRCQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjt5QkFDbkM7d0JBQ0QsU0FBUyxFQUFFOzRCQUNULElBQUksRUFBRSxJQUFJO3lCQUNYO3FCQUNGO2lCQUNGLENBQUMsQ0FBQztZQUVILE1BQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxNQUFNLENBQUM7WUFDckgsTUFBTSxtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGlDQUFpQyxDQUFDLElBQUksTUFBTSxDQUFDO1lBQzFJLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsNkJBQTZCLENBQUMsSUFBSSxNQUFNLENBQUM7WUFFOUgsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRTt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhO3FCQUMxQjtpQkFDRjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULEtBQUssRUFBRSxTQUFTO3dCQUNoQixXQUFXO3dCQUNYLFdBQVcsRUFBRSxDQUFDO3dCQUNkLG1CQUFtQjt3QkFDbkIsV0FBVyxFQUFFLENBQUM7cUJBQ2Y7aUJBQ0Y7YUFDRixDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNsQixPQUFPLEVBQUUsTUFBTTtnQkFDZixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxrQkFBa0I7YUFDbkMsQ0FBQTtZQUVELE1BQU0sTUFBTSxHQUFRO2dCQUNsQixPQUFPO2dCQUNQLE9BQU87Z0JBQ1AsTUFBTTthQUNQLENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdE0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNuRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRTdCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN6QixPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFDLEdBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7Z0JBQ25ILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHFCQUFxQixHQUFHLEdBQUcsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDOUUsT0FBTztTQUNSO1FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLGNBQWMsQ0FBQztRQUMvRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLElBQUksY0FBYyxDQUFDO1FBRWpGLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUM5QixJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDL0IsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RHLE1BQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzdCLFNBQVMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN2QztRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDL0UsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzt3R0FyTlUscUJBQXFCLGtCQW1CdEIsVUFBVSxhQUNWLFFBQVEsYUFDUixpQkFBaUIsYUFDakIsU0FBUzs0RkF0QlIscUJBQXFCLHVQQUh0QixFQUFFOzs0RkFHRCxxQkFBcUI7a0JBTGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFvQkksTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsU0FBUzs0Q0FyQlYsU0FBUztzQkFBakIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBOEJNLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cyc7XG5pbXBvcnQgeyBJQml6eVBpZUNoYXJ0RGF0YSB9IGZyb20gJy4vcGllLWNoYXJ0LnR5cGVzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBhdWRpdFRpbWUsIGZpbHRlciwgc2tpcCwgdGFrZSwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IEVNUFRZX0NIQVJUID0gWzBdO1xuY29uc3QgTUlOX0NIQVJUX1NJWkUgPSAzNTAgLy8gcHg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcGllLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5UGllQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSByZXNpemVSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSAnQml6eSc7XG4gIEBJbnB1dCgpIGRvd25sb2FkTGFiZWw6IHN0cmluZyA9ICdEZXNjYXJnYXInO1xuICBASW5wdXQoKSBvblRvb2x0aXBGb3JtYXR0ZXI6IChpdGVtOiBhbnkgKSA9PiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICNlY2hhcnRzOiBlY2hhcnRzLkVDaGFydHMgfCBudWxsID0gbnVsbFxuXG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI2NoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAjYWZ0ZXJWaWV3SW5pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAjcmVzaXplJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNkYXRhOiAgQXJyYXk8e25hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciwgaXRlbVN0eWxlOiB7Y29sb3I/OiBzdHJpbmd9fT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQgPSBFTVBUWV9DSEFSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElCaXp5UGllQ2hhcnREYXRhPikge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jZGVsZXRlQ2hhcnRDb250YWluZXIoKTtcblxuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKEVNUFRZX0NIQVJUKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyAjc2V0Q2hhcnREYXRhKGRhdGE6IEFycmF5PElCaXp5UGllQ2hhcnREYXRhPiB8IHR5cGVvZiBFTVBUWV9DSEFSVCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy4jYWZ0ZXJWaWV3SW5pdC5waXBlKGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSA9PT0gdHJ1ZSksIHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLiNjcmVhdGVDaGFydENvbnRhaW5lcigpXG5cbiAgICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDAgJiYgZGF0YVswXSAhPT0gMCkge1xuICAgICAgICB0aGlzLiNkYXRhID0gW107XG4gICAgICAgICg8QXJyYXk8SUJpenlQaWVDaGFydERhdGE+PmRhdGEpLmZvckVhY2goX2QgPT4ge1xuICAgICAgICAgIGlmICghX2QudmFsdWUpIHtcbiAgICAgICAgICAgIF9kLnZhbHVlID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIV9kLm5hbWUpIHtcbiAgICAgICAgICAgIF9kLm5hbWUgPSAnLS0tJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGl0ZW1TdHlsZSA9IF9kLmNvbG9yID8ge2NvbG9yOiBfZC5jb2xvcn0gOiB7fTtcbiAgICAgICAgICBcbiAgICAgICAgICAoPEFycmF5PHtuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGl0ZW1TdHlsZToge2NvbG9yPzogc3RyaW5nfX0+PnRoaXMuI2RhdGEpLnB1c2goe1xuICAgICAgICAgICAgICBuYW1lOiBfZC5uYW1lLFxuICAgICAgICAgICAgICB2YWx1ZTogX2QudmFsdWUsXG4gICAgICAgICAgICAgIGl0ZW1TdHlsZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiNkYXRhID0gRU1QVFlfQ0hBUlQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlcmllcyA9IFt7XG4gICAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgICByYWRpdXM6ICc1MCUnLFxuICAgICAgICBjZW50ZXI6IFsnNTAlJywgJzUwJSddLFxuICAgICAgICBkYXRhOiB0aGlzLiNkYXRhLFxuICAgICAgICBub3JtYWw6IHtcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdvdXRlcicsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IHRoaXMub25Ub29sdGlwRm9ybWF0dGVyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbExpbmU6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1dO1xuXG4gICAgICBjb25zdCB0ZXh0Q29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1jb2xvcicpID8/ICcjMDAwJztcbiAgICAgIGNvbnN0IHRleHRCYWNrZ3JvdW5kQ29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1iYWNrZ3JvdW5kLWNvbG9yJykgPz8gJyNmZmYnO1xuICAgICAgY29uc3QgYm9yZGVyQ29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktdG9vbHRpcC1ib3JkZXItY29sb3InKSA/PyAnI2ZmZic7XG5cbiAgICAgIGNvbnN0IHRvb2xib3ggPSB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZlYXR1cmU6IHtcbiAgICAgICAgICBzYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmRvd25sb2FkTGFiZWxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgaWNvblN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3IsXG4gICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICB0ZXh0UGFkZGluZzogNSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHRvb2x0aXAgPSB7XG4gICAgICAgIHNob3c6IHRoaXMudG9vbHRpcCxcbiAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICBhcHBlbmRUb0JvZHk6IHRydWUsXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy5vblRvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7XG4gICAgICAgIHRvb2x0aXAsXG4gICAgICAgIHRvb2xib3gsXG4gICAgICAgIHNlcmllc1xuICAgICAgfTtcbiAgICAgIFxuICAgICAgdGhpcy4jZWNoYXJ0cyA9IGVjaGFydHMuaW5pdCh0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbihvcHRpb24pO1xuICAgICAgdGhpcy4jZWNoYXJ0cy5vbignY2xpY2snLCBwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy4jcmVzaXplJC5uZXh0KCkpO1xuICAgICAgY29uc3QgcmVzaXplUmVmID0gdGhpcy5yZXNpemVSZWYgPyB0aGlzLnJlc2l6ZVJlZiA6IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgPyB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHJlc2l6ZVJlZik7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuI3Jlc2l6ZSQucGlwZShza2lwKDEpLCBhdWRpdFRpbWUoMzAwKSwgdGhyb3R0bGVUaW1lKDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuI2RlbGV0ZUNoYXJ0Q29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuI2NyZWF0ZUNoYXJ0Q29udGFpbmVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLiNjaGFydENvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI2VjaGFydHMgPSBlY2hhcnRzLmluaXQodGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgICAgICB0aGlzLiNlY2hhcnRzLnNldE9wdGlvbih7Li4ub3B0aW9uLCBzZXJpZXM6IG9wdGlvbi5zZXJpZXMubWFwKF9zZXJpZSA9PiB7IHJldHVybiB7Li4uX3NlcmllLCBkYXRhOiB0aGlzLiNkYXRhfX0pfSk7XG4gICAgICAgIHRoaXMuI2VjaGFydHMub24oJ2NsaWNrJywgcGFyYW1zID0+IHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQocGFyYW1zLm5hbWUpXG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfVxuXG4gICNjcmVhdGVDaGFydENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgTUlOX0NIQVJUX1NJWkU7XG4gICAgbGV0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgTUlOX0NIQVJUX1NJWkU7XG5cbiAgICBsZXQgbWluV2lkdGggPSBNSU5fQ0hBUlRfU0laRTtcbiAgICBsZXQgbWluSGVpZ2h0ID0gTUlOX0NIQVJUX1NJWkU7XG4gICAgY29uc3QgY2hhcnRNaW5XaWR0aCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktY2hhcnQtbWluLXdpZHRoJyk7XG4gICAgY29uc3QgcGllQ2hhcnRNaW5IZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWNoYXJ0LW1pbi1oZWlnaHQnKTtcbiAgICBpZiAoTnVtYmVyKGNoYXJ0TWluV2lkdGgpKSB7XG4gICAgICBtaW5XaWR0aCA9IE51bWJlcihjaGFydE1pbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKE51bWJlcihwaWVDaGFydE1pbkhlaWdodCkpIHtcbiAgICAgIG1pbkhlaWdodCA9IE51bWJlcihwaWVDaGFydE1pbkhlaWdodCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoZWxlbWVudFdpZHRoLCBtaW5XaWR0aCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoZWxlbWVudEhlaWdodCwgbWluSGVpZ2h0KTtcblxuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuI2NoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy4jY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLiNjaGFydENvbnRhaW5lcik7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2RlbGV0ZUNoYXJ0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy4jY2hhcnRDb250YWluZXIgfHwgIXRoaXMuZWxlbWVudFJlZiB8fCAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiNlY2hhcnRzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy4jY2hhcnRDb250YWluZXIpO1xuICAgIHRoaXMuI2NoYXJ0Q29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jbXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2VjaGFydHMpIHtcbiAgICAgIHRoaXMuI2VjaGFydHMuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxufVxuIl19