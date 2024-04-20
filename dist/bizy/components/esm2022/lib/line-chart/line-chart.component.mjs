import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyLineChartComponent {
    renderer;
    elementRef;
    document;
    decimalPipe;
    saveAsImageButtonLabel = 'Descargar';
    xLabelPrefix = '';
    xLabelSuffix = '';
    yLabelPrefix = '';
    yLabelSuffix = '';
    labelsX = [];
    height;
    width;
    tooltip = true;
    chartContainer = null;
    set data(data) {
        if (data && data.length > 0) {
            this.#setChartData(data);
        }
    }
    constructor(renderer, elementRef, document, decimalPipe) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.document = document;
        this.decimalPipe = decimalPipe;
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
        const _data = [];
        const legendData = [];
        data.forEach(_d => {
            if (_d.color) {
                color.push(_d.color);
            }
            legendData.push(_d.name);
            _data.push({
                type: 'line',
                id: _d.id ?? String(Math.random()),
                name: _d.name,
                smooth: true,
                data: !_d.values || _d.values.length === 0 ? [0] : _d.values
            });
        });
        const option = {
            tooltip: {
                show: this.tooltip,
                trigger: 'axis',
                appendToBody: true,
                formatter: this.#tooltipFormatter
            },
            legend: {
                y: 'bottom',
                padding: [0, 0, 0, 0],
                data: legendData
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
            xAxis: [
                {
                    type: 'category',
                    data: this.labelsX,
                    axisLabel: {
                        formatter: `${this.xLabelPrefix}{value}${this.xLabelSuffix}`,
                        fontSize: 10,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: `${this.yLabelPrefix}{value}${this.yLabelSuffix}`,
                        fontSize: 10
                    }
                }
            ],
            series: _data
        };
        option.grid = {
            bottom: `${Math.max(legendData.length * 2.4, 10)}%`,
            containLabel: true,
            left: '3%',
            right: '3%'
        };
        if (color.length > 0) {
            option.color = color;
        }
        if ((legendData.length / 18) > 1) {
            this.renderer.setStyle(this.chartContainer, 'height', `${this.height * (legendData.length / 18)}px`);
        }
        echarts.init(this.chartContainer).setOption(option);
    }
    #tooltipFormatter = (params) => {
        let tooltip = `${params[0].name}`;
        const lineParam = params.filter(_param => _param.componentSubType === 'line');
        lineParam.forEach(_param => {
            const line = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">-</span>`;
            tooltip += `<br/>${line} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
        });
        return tooltip;
    };
    #getChartSize() {
        return new Promise(resolve => {
            const mutationObserver = new MutationObserver(() => {
                const parentRef = this.renderer.parentNode(this.elementRef.nativeElement);
                if (parentRef && parentRef.offsetWidth && parentRef.offsetHeight) {
                    let width = (this.width || parentRef.offsetWidth);
                    let height = (this.height || parentRef.offsetHeight);
                    mutationObserver.disconnect();
                    resolve({ width, height });
                }
            });
            mutationObserver.observe(this.document.body, { childList: true, subtree: true });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyLineChartComponent, selector: "bizy-line-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", tooltip: "tooltip", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyLineChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-line-chart',
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
                }] }]; }, propDecorators: { saveAsImageButtonLabel: [{
                type: Input
            }], xLabelPrefix: [{
                type: Input
            }], xLabelSuffix: [{
                type: Input
            }], yLabelPrefix: [{
                type: Input
            }], yLabelSuffix: [{
                type: Input
            }], labelsX: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBT3hELE1BQU0sT0FBTyxzQkFBc0I7SUFvQko7SUFDQztJQUNGO0lBQ0c7SUF0QnRCLHNCQUFzQixHQUFXLFdBQVcsQ0FBQztJQUM3QyxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLFlBQVksR0FBVyxFQUFFLENBQUM7SUFDMUIsWUFBWSxHQUFXLEVBQUUsQ0FBQztJQUMxQixZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLE9BQU8sR0FBa0IsRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBUztJQUNmLEtBQUssQ0FBUztJQUNkLE9BQU8sR0FBWSxJQUFJLENBQUM7SUFFakMsY0FBYyxHQUEwQixJQUFJLENBQUM7SUFFN0MsSUFBYSxJQUFJLENBQUMsSUFBMkI7UUFDM0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxZQUM2QixRQUFtQixFQUNsQixVQUFzQixFQUN4QixRQUFrQixFQUNmLFdBQXdCO1FBSDFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QixhQUFR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LE1BQU0sSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBRXJELGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUM5QixPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQXhKVSxzQkFBc0Isa0JBb0J2QixTQUFTLGFBQ1QsVUFBVSxhQUNWLFFBQVEsYUFDUixXQUFXOzRGQXZCVixzQkFBc0IscVVBSHZCLEVBQUU7OzRGQUdELHNCQUFzQjtrQkFMbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQXFCSSxNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVzs0Q0F0Qlosc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUlPLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsgSUxpbmVDaGFydERhdGEgfSBmcm9tICcuL2xpbmUtY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1saW5lLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5TGluZUNoYXJ0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgc2F2ZUFzSW1hZ2VCdXR0b25MYWJlbDogc3RyaW5nID0gJ0Rlc2Nhcmdhcic7XG4gIEBJbnB1dCgpIHhMYWJlbFByZWZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHhMYWJlbFN1ZmZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHlMYWJlbFByZWZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHlMYWJlbFN1ZmZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGxhYmVsc1g6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElMaW5lQ2hhcnREYXRhPikge1xuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChEZWNpbWFsUGlwZSkgcHJpdmF0ZSBkZWNpbWFsUGlwZTogRGVjaW1hbFBpcGVcbiAgKSB7fVxuXG4gIGFzeW5jICNzZXRDaGFydERhdGEoZGF0YTogQXJyYXk8SUxpbmVDaGFydERhdGE+KSB7XG4gICAgbGV0IHNpemUgPSB7d2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xuICAgIGlmICghdGhpcy53aWR0aCB8fCAhdGhpcy5oZWlnaHQpIHtcbiAgICAgIHNpemUgPSBhd2FpdCB0aGlzLiNnZXRDaGFydFNpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY2hhcnRDb250YWluZXIpIHtcbiAgICAgIHRoaXMuY2hhcnRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHtzaXplLndpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtzaXplLmhlaWdodH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jaGFydENvbnRhaW5lcilcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgY29uc3QgX2RhdGEgPSBbXTtcbiAgICBjb25zdCBsZWdlbmREYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZGF0YS5mb3JFYWNoKF9kID0+IHtcbiAgICAgIGlmIChfZC5jb2xvcikge1xuICAgICAgICBjb2xvci5wdXNoKF9kLmNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgbGVnZW5kRGF0YS5wdXNoKF9kLm5hbWUpO1xuXG4gICAgICBfZGF0YS5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICBpZDogX2QuaWQgPz8gU3RyaW5nKE1hdGgucmFuZG9tKCkpLFxuICAgICAgICBuYW1lOiBfZC5uYW1lLFxuICAgICAgICBzbW9vdGg6IHRydWUsXG4gICAgICAgIGRhdGE6ICFfZC52YWx1ZXMgfHwgX2QudmFsdWVzLmxlbmd0aCA9PT0gMCA/IFswXSA6IF9kLnZhbHVlc1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb246IGFueSA9IHtcbiAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgc2hvdzogdGhpcy50b29sdGlwLFxuICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgZm9ybWF0dGVyOiB0aGlzLiN0b29sdGlwRm9ybWF0dGVyXG4gICAgICB9LFxuICAgICAgbGVnZW5kOiB7XG4gICAgICAgIHk6ICdib3R0b20nLFxuICAgICAgICBwYWRkaW5nOiBbMCwgMCwgMCwgMF0sXG4gICAgICAgIGRhdGE6IGxlZ2VuZERhdGFcbiAgICAgIH0sXG4gICAgICB0b29sYm94OiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZlYXR1cmU6IHtcbiAgICAgICAgICBzYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNhdmVBc0ltYWdlQnV0dG9uTGFiZWxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb25TdHlsZToge1xuICAgICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB4QXhpczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICBkYXRhOiB0aGlzLmxhYmVsc1gsXG4gICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGAke3RoaXMueExhYmVsUHJlZml4fXt2YWx1ZX0ke3RoaXMueExhYmVsU3VmZml4fWAsXG4gICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgeUF4aXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGAke3RoaXMueUxhYmVsUHJlZml4fXt2YWx1ZX0ke3RoaXMueUxhYmVsU3VmZml4fWAsXG4gICAgICAgICAgICBmb250U2l6ZTogMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBzZXJpZXM6IF9kYXRhXG4gICAgfTtcblxuICAgIG9wdGlvbi5ncmlkID0ge1xuICAgICAgYm90dG9tOiBgJHtNYXRoLm1heChsZWdlbmREYXRhLmxlbmd0aCAqIDIuNCwgMTApfSVgLFxuICAgICAgY29udGFpbkxhYmVsOiB0cnVlLFxuICAgICAgbGVmdDogJzMlJyxcbiAgICAgIHJpZ2h0OiAnMyUnIFxuICAgIH07XG5cbiAgICBpZiAoY29sb3IubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKChsZWdlbmREYXRhLmxlbmd0aCAvIDE4KSA+IDEpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jaGFydENvbnRhaW5lciwgJ2hlaWdodCcsIGAke3RoaXMuaGVpZ2h0ICogKGxlZ2VuZERhdGEubGVuZ3RoIC8gMTgpfXB4YCk7XG4gICAgfVxuXG4gICAgZWNoYXJ0cy5pbml0KHRoaXMuY2hhcnRDb250YWluZXIhKS5zZXRPcHRpb24ob3B0aW9uKTtcbiAgfVxuXG4gICN0b29sdGlwRm9ybWF0dGVyID0gKHBhcmFtczogQXJyYXk8YW55PikgPT4ge1xuICAgIGxldCB0b29sdGlwID0gYCR7cGFyYW1zWzBdLm5hbWV9YDtcbiAgICBjb25zdCBsaW5lUGFyYW0gPSBwYXJhbXMuZmlsdGVyKF9wYXJhbSA9PiBfcGFyYW0uY29tcG9uZW50U3ViVHlwZSA9PT0gJ2xpbmUnKTtcblxuICAgIGxpbmVQYXJhbS5mb3JFYWNoKF9wYXJhbSA9PiB7XG4gICAgICBjb25zdCBsaW5lID0gYDxzcGFuIHN0eWxlPVwiY29sb3I6ICR7X3BhcmFtLmNvbG9yfTsgZm9udC1zaXplOiAycmVtOyBwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogMC4zcmVtO1wiPi08L3NwYW4+YDtcbiAgICAgIHRvb2x0aXAgKz0gYDxici8+JHtsaW5lfSAke19wYXJhbS5zZXJpZXNOYW1lfSA6ICR7dGhpcy55TGFiZWxQcmVmaXh9JHt0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybShfcGFyYW0udmFsdWUsICcxLjItMicpfSR7dGhpcy55TGFiZWxTdWZmaXh9YDtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b29sdGlwO1xuICB9XG5cbiAgI2dldENoYXJ0U2l6ZSgpOiBQcm9taXNlPHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8e3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfT4ocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRSZWYgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBpZiAocGFyZW50UmVmICYmIHBhcmVudFJlZi5vZmZzZXRXaWR0aCAmJiBwYXJlbnRSZWYub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgbGV0IHdpZHRoID0gKHRoaXMud2lkdGggfHwgcGFyZW50UmVmLm9mZnNldFdpZHRoKTtcbiAgICAgICAgICBsZXQgaGVpZ2h0ID0gKHRoaXMuaGVpZ2h0IHx8IHBhcmVudFJlZi5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgcmVzb2x2ZSh7d2lkdGgsIGhlaWdodH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSlcbiAgfVxufVxuIl19