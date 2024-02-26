import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const EMPTY_CHART = [0];
export class PieChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    title = '';
    currency = '';
    saveAsImageButtonLabel = 'Descargar';
    isCurrency = false;
    decimals = 2;
    height;
    width;
    chartContainer = null;
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
    }
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
        else if (data && data.length === 0) {
            if (this.chartContainer) {
                this.renderer.removeChild(this.elementRef.nativeElement, this.chartContainer);
                this.chartContainer = null;
            }
            this.#setChartData(EMPTY_CHART);
        }
    }
    async #setChartData(data) {
        let size = { width: this.width, height: this.height };
        if (!this.width || !this.height) {
            size = await this.#getChartSize();
        }
        if (!this.chartContainer) {
            this.chartContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.chartContainer, 'width', `${size.width}px`);
            this.renderer.setStyle(this.chartContainer, 'height', `${size.height}px`);
            this.renderer.appendChild(this.elementRef.nativeElement, this.chartContainer);
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
                formatter: (item) => `${item.name}: ${this.currency ? this.currency + this.decimalPipe.transform(item.value, '1.2-2') : this.decimalPipe.transform(item.value, '1.2-2')} (${item.percent.toFixed()}%)`
            },
            title: {
                show: this.title,
                text: this.title,
                left: 'left',
                textStyle: {
                    color: '#2484c6',
                    width: this.width - 40,
                    overflow: 'break'
                },
                subtext: `Total: ${this.currency ? this.currency + this.decimalPipe.transform(total, '1.2-2') : this.decimalPipe.transform(total, '1.2-2')}`
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true,
                        title: this.saveAsImageButtonLabel
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
                    center: this.width >= 576 ? ['50%', '50%'] : ['50%', '65%'],
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
                                    return `${item.name}: ${this.currency ? this.currency + this.decimalPipe.transform(item.value, '1.2-2') : this.decimalPipe.transform(item.value, '1.2-2')} (${item.percent.toFixed()}%)`;
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
        echarts.init(this.chartContainer).setOption(option);
    }
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = this.width || parentRef.offsetWidth;
                    let height = this.height || parentRef.offsetHeight;
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PieChartComponent, selector: "bizy-pie-chart", inputs: { title: "title", currency: "currency", saveAsImageButtonLabel: "saveAsImageButtonLabel", isCurrency: "isCurrency", decimals: "decimals", height: "height", width: "width", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PieChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-pie-chart',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.DecimalPipe, decorators: [{
                    type: Inject,
                    args: [DecimalPipe]
                }] }]; }, propDecorators: { title: [{
                type: Input
            }], currency: [{
                type: Input
            }], saveAsImageButtonLabel: [{
                type: Input
            }], isCurrency: [{
                type: Input
            }], decimals: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRXhELE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFPeEIsTUFBTSxPQUFPLGlCQUFpQjtJQVlDO0lBQ0M7SUFDRjtJQUNHO0lBZHRCLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDWCxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2Qsc0JBQXNCLEdBQVcsV0FBVyxDQUFDO0lBQzdDLFVBQVUsR0FBWSxLQUFLLENBQUM7SUFDNUIsUUFBUSxHQUFXLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQVM7SUFDZixLQUFLLENBQVM7SUFFdkIsY0FBYyxHQUEwQixJQUFJLENBQUM7SUFFN0MsWUFDNkIsUUFBbUIsRUFDbEIsVUFBc0IsRUFDeEIsUUFBa0IsRUFDZixXQUF3QjtRQUgxQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ3BELENBQUM7SUFFSixJQUFhLElBQUksQ0FBQyxJQUEwQjtRQUMxQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxD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QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQXJJVSxpQkFBaUIsa0JBWWxCLFNBQVMsYUFDVCxVQUFVLGFBQ1YsUUFBUSxhQUNSLFdBQVc7NEZBZlYsaUJBQWlCLDBQQUhsQixFQUFFOzs0RkFHRCxpQkFBaUI7a0JBTDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFhSSxNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVzs0Q0FkWixLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBV08sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cyc7XG5pbXBvcnQgeyBJUGllQ2hhcnREYXRhIH0gZnJvbSAnLi9waWUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuY29uc3QgRU1QVFlfQ0hBUlQgPSBbMF07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktcGllLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQaWVDaGFydENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG4gIEBJbnB1dCgpIGN1cnJlbmN5ID0gJyc7XG4gIEBJbnB1dCgpIHNhdmVBc0ltYWdlQnV0dG9uTGFiZWw6IHN0cmluZyA9ICdEZXNjYXJnYXInO1xuICBASW5wdXQoKSBpc0N1cnJlbmN5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRlY2ltYWxzOiBudW1iZXIgPSAyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcblxuICBjaGFydENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoRGVjaW1hbFBpcGUpIHByaXZhdGUgZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlXG4gICkge31cblxuICBASW5wdXQoKSBzZXQgZGF0YShkYXRhOiBBcnJheTxJUGllQ2hhcnREYXRhPikge1xuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKGRhdGEpO1xuICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMuY2hhcnRDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jaGFydENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY2hhcnRDb250YWluZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNzZXRDaGFydERhdGEoRU1QVFlfQ0hBUlQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jICNzZXRDaGFydERhdGEoZGF0YTogQXJyYXk8SVBpZUNoYXJ0RGF0YT4gfCB0eXBlb2YgRU1QVFlfQ0hBUlQpIHtcbiAgICBsZXQgc2l6ZSA9IHt3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodH07XG4gICAgaWYgKCF0aGlzLndpZHRoIHx8ICF0aGlzLmhlaWdodCkge1xuICAgICAgc2l6ZSA9IGF3YWl0IHRoaXMuI2dldENoYXJ0U2l6ZSgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jaGFydENvbnRhaW5lcikge1xuICAgICAgdGhpcy5jaGFydENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY2hhcnRDb250YWluZXIsICd3aWR0aCcsIGAke3NpemUud2lkdGh9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jaGFydENvbnRhaW5lciwgJ2hlaWdodCcsIGAke3NpemUuaGVpZ2h0fXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmNoYXJ0Q29udGFpbmVyKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbG9yOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBkYXRhLmZvckVhY2goX2QgPT4ge1xuICAgICAgdG90YWwgKz0gKF9kIGFzIElQaWVDaGFydERhdGEpLnZhbHVlO1xuICAgICAgaWYgKChfZCBhcyBJUGllQ2hhcnREYXRhKS5jb2xvcikge1xuICAgICAgICBjb2xvci5wdXNoKChfZCBhcyBJUGllQ2hhcnREYXRhKS5jb2xvciBhcyBzdHJpbmcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7XG4gICAgICB0b29sdGlwOiB7XG4gICAgICAgIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgICAgZm9ybWF0dGVyOiAoaXRlbTogYW55KSA9PiBgJHtpdGVtLm5hbWV9OiAke3RoaXMuY3VycmVuY3kgPyB0aGlzLmN1cnJlbmN5ICsgdGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0oaXRlbS52YWx1ZSwgJzEuMi0yJykgOiB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybShpdGVtLnZhbHVlLCAnMS4yLTInKX0gKCR7aXRlbS5wZXJjZW50LnRvRml4ZWQoKX0lKWBcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBzaG93OiB0aGlzLnRpdGxlLFxuICAgICAgICB0ZXh0OiB0aGlzLnRpdGxlLFxuICAgICAgICBsZWZ0OiAnbGVmdCcsXG4gICAgICAgIHRleHRTdHlsZToge1xuICAgICAgICAgIGNvbG9yOiAnIzI0ODRjNicsXG4gICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggLSA0MCxcbiAgICAgICAgICBvdmVyZmxvdzogJ2JyZWFrJ1xuICAgICAgICB9LFxuICAgICAgICBzdWJ0ZXh0OiBgVG90YWw6ICR7dGhpcy5jdXJyZW5jeSA/IHRoaXMuY3VycmVuY3kgKyB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybSh0b3RhbCwgJzEuMi0yJykgOiB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybSh0b3RhbCwgJzEuMi0yJyl9YFxuICAgICAgfSxcbiAgICAgIHRvb2xib3g6IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZmVhdHVyZToge1xuICAgICAgICAgIHNhdmVBc0ltYWdlOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2F2ZUFzSW1hZ2VCdXR0b25MYWJlbFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWNvblN0eWxlOiB7XG4gICAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcmllczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgICAgcmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBjZW50ZXI6IHRoaXMud2lkdGggPj0gNTc2ID8gWyc1MCUnLCAnNTAlJ10gOiBbJzUwJScsICc2NSUnXSxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3JtYWw6IHtcbiAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ291dGVyJyxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWV9OiAke3RoaXMuY3VycmVuY3kgPyB0aGlzLmN1cnJlbmN5ICsgdGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0oaXRlbS52YWx1ZSwgJzEuMi0yJykgOiB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybShpdGVtLnZhbHVlLCAnMS4yLTInKX0gKCR7aXRlbS5wZXJjZW50LnRvRml4ZWQoKX0lKWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbExpbmU6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgaWYgKGNvbG9yLmxlbmd0aCA+IDAgJiYgY29sb3IubGVuZ3RoID09PSBkYXRhLmxlbmd0aCkge1xuICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgZWNoYXJ0cy5pbml0KHRoaXMuY2hhcnRDb250YWluZXIhKS5zZXRPcHRpb24ob3B0aW9uKTtcbiAgfVxuXG4gICNnZXRDaGFydFNpemUoKTogUHJvbWlzZTx7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0+KHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50UmVmID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHBhcmVudFJlZiAmJiBwYXJlbnRSZWYub2Zmc2V0V2lkdGggJiYgcGFyZW50UmVmLm9mZnNldEhlaWdodCkge1xuICAgICAgICAgIGxldCB3aWR0aCA9IHRoaXMud2lkdGggfHwgcGFyZW50UmVmLm9mZnNldFdpZHRoO1xuICAgICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLmhlaWdodCB8fCBwYXJlbnRSZWYub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgcmVzb2x2ZSh7d2lkdGgsIGhlaWdodH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSlcbiAgfVxufVxuIl19