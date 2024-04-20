import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyBarChartComponent {
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
                type: 'bar',
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
        const barParam = params.filter(_param => _param.componentSubType === 'bar');
        barParam.forEach(_param => {
            const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
            tooltip += `<br/>${bullet} ${_param.seriesName} : ${this.yLabelPrefix}${this.decimalPipe.transform(_param.value, '1.2-2')}${this.yLabelSuffix}`;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyBarChartComponent, selector: "bizy-bar-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", tooltip: "tooltip", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyBarChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bizy-bar-chart',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9iYXItY2hhcnQvYmFyLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBT3hELE1BQU0sT0FBTyxxQkFBcUI7SUFvQkg7SUFDQztJQUNGO0lBQ0c7SUF0QnRCLHNCQUFzQixHQUFXLFdBQVcsQ0FBQztJQUM3QyxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLFlBQVksR0FBVyxFQUFFLENBQUM7SUFDMUIsWUFBWSxHQUFXLEVBQUUsQ0FBQztJQUMxQixZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLE9BQU8sR0FBa0IsRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBUztJQUNmLEtBQUssQ0FBUztJQUNkLE9BQU8sR0FBWSxJQUFJLENBQUM7SUFFakMsY0FBYyxHQUEwQixJQUFJLENBQUM7SUFFN0MsSUFBYSxJQUFJLENBQUMsSUFBMEI7UUFDMUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxZQUM2QixRQUFtQixFQUNsQixVQUFzQixFQUN4QixRQUFrQixFQUNmLFdBQXdCO1FBSDFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QixhQUFRLEdB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QU0sSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBRXJELGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUM5QixPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQXhKVSxxQkFBcUIsa0JBb0J0QixTQUFTLGFBQ1QsVUFBVSxhQUNWLFFBQVEsYUFDUixXQUFXOzRGQXZCVixxQkFBcUIsb1VBSHRCLEVBQUU7OzRGQUdELHFCQUFxQjtrQkFMakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQXFCSSxNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVzs0Q0F0Qlosc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUlPLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsgSUJhckNoYXJ0RGF0YSB9IGZyb20gJy4vYmFyLWNoYXJ0LnR5cGVzJztcbmltcG9ydCB7IERPQ1VNRU5ULCBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYmFyLWNoYXJ0JyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5QmFyQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSBzYXZlQXNJbWFnZUJ1dHRvbkxhYmVsOiBzdHJpbmcgPSAnRGVzY2FyZ2FyJztcbiAgQElucHV0KCkgeExhYmVsUHJlZml4OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgeExhYmVsU3VmZml4OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgeUxhYmVsUHJlZml4OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgeUxhYmVsU3VmZml4OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgbGFiZWxzWDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgdG9vbHRpcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY2hhcnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KCkgc2V0IGRhdGEoZGF0YTogQXJyYXk8SUJhckNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShkYXRhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoRGVjaW1hbFBpcGUpIHByaXZhdGUgZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlXG4gICkge31cblxuICBhc3luYyAjc2V0Q2hhcnREYXRhKGRhdGE6IEFycmF5PElCYXJDaGFydERhdGE+KSB7XG4gICAgbGV0IHNpemUgPSB7d2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xuICAgIGlmICghdGhpcy53aWR0aCB8fCAhdGhpcy5oZWlnaHQpIHtcbiAgICAgIHNpemUgPSBhd2FpdCB0aGlzLiNnZXRDaGFydFNpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY2hhcnRDb250YWluZXIpIHtcbiAgICAgIHRoaXMuY2hhcnRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHtzaXplLndpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtzaXplLmhlaWdodH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jaGFydENvbnRhaW5lcilcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgY29uc3QgX2RhdGEgPSBbXTtcbiAgICBjb25zdCBsZWdlbmREYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZGF0YS5mb3JFYWNoKF9kID0+IHtcbiAgICAgIGlmIChfZC5jb2xvcikge1xuICAgICAgICBjb2xvci5wdXNoKF9kLmNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgbGVnZW5kRGF0YS5wdXNoKF9kLm5hbWUpO1xuXG4gICAgICBfZGF0YS5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgIGlkOiBfZC5pZCA/PyBTdHJpbmcoTWF0aC5yYW5kb20oKSksXG4gICAgICAgIG5hbWU6IF9kLm5hbWUsXG4gICAgICAgIHNtb290aDogdHJ1ZSxcbiAgICAgICAgZGF0YTogIV9kLnZhbHVlcyB8fCBfZC52YWx1ZXMubGVuZ3RoID09PSAwID8gWzBdIDogX2QudmFsdWVzXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbjogYW55ID0ge1xuICAgICAgdG9vbHRpcDoge1xuICAgICAgICBzaG93OiB0aGlzLnRvb2x0aXAsXG4gICAgICAgIHRyaWdnZXI6ICdheGlzJyxcbiAgICAgICAgYXBwZW5kVG9Cb2R5OiB0cnVlLFxuICAgICAgICBmb3JtYXR0ZXI6IHRoaXMuI3Rvb2x0aXBGb3JtYXR0ZXJcbiAgICAgIH0sXG4gICAgICBsZWdlbmQ6IHtcbiAgICAgICAgeTogJ2JvdHRvbScsXG4gICAgICAgIHBhZGRpbmc6IFswLCAwLCAwLCAwXSxcbiAgICAgICAgZGF0YTogbGVnZW5kRGF0YVxuICAgICAgfSxcbiAgICAgIHRvb2xib3g6IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgZmVhdHVyZToge1xuICAgICAgICAgIHNhdmVBc0ltYWdlOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2F2ZUFzSW1hZ2VCdXR0b25MYWJlbFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWNvblN0eWxlOiB7XG4gICAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHhBeGlzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgIGRhdGE6IHRoaXMubGFiZWxzWCxcbiAgICAgICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogYCR7dGhpcy54TGFiZWxQcmVmaXh9e3ZhbHVlfSR7dGhpcy54TGFiZWxTdWZmaXh9YCxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICB5QXhpczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogYCR7dGhpcy55TGFiZWxQcmVmaXh9e3ZhbHVlfSR7dGhpcy55TGFiZWxTdWZmaXh9YCxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHNlcmllczogX2RhdGFcbiAgICB9O1xuXG4gICAgb3B0aW9uLmdyaWQgPSB7XG4gICAgICBib3R0b206IGAke01hdGgubWF4KGxlZ2VuZERhdGEubGVuZ3RoICogMi40LCAxMCl9JWAsXG4gICAgICBjb250YWluTGFiZWw6IHRydWUsXG4gICAgICBsZWZ0OiAnMyUnLFxuICAgICAgcmlnaHQ6ICczJScgXG4gICAgfTtcblxuICAgIGlmIChjb2xvci5sZW5ndGggPiAwKSB7XG4gICAgICBvcHRpb24uY29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBpZiAoKGxlZ2VuZERhdGEubGVuZ3RoIC8gMTgpID4gMSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNoYXJ0Q29udGFpbmVyLCAnaGVpZ2h0JywgYCR7dGhpcy5oZWlnaHQgKiAobGVnZW5kRGF0YS5sZW5ndGggLyAxOCl9cHhgKTtcbiAgICB9XG5cbiAgICBlY2hhcnRzLmluaXQodGhpcy5jaGFydENvbnRhaW5lciEpLnNldE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgI3Rvb2x0aXBGb3JtYXR0ZXIgPSAocGFyYW1zOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgbGV0IHRvb2x0aXAgPSBgJHtwYXJhbXNbMF0ubmFtZX1gO1xuICAgIGNvbnN0IGJhclBhcmFtID0gcGFyYW1zLmZpbHRlcihfcGFyYW0gPT4gX3BhcmFtLmNvbXBvbmVudFN1YlR5cGUgPT09ICdiYXInKTtcblxuICAgIGJhclBhcmFtLmZvckVhY2goX3BhcmFtID0+IHtcbiAgICAgIGNvbnN0IGJ1bGxldCA9IGA8c3BhbiBzdHlsZT1cImNvbG9yOiAke19wYXJhbS5jb2xvcn07IGZvbnQtc2l6ZTogMnJlbTsgcG9zaXRpb246IHJlbGF0aXZlOyB0b3A6IDAuM3JlbTtcIj4mIzgyMjY7PC9zcGFuPmA7XG4gICAgICB0b29sdGlwICs9IGA8YnIvPiR7YnVsbGV0fSAke19wYXJhbS5zZXJpZXNOYW1lfSA6ICR7dGhpcy55TGFiZWxQcmVmaXh9JHt0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybShfcGFyYW0udmFsdWUsICcxLjItMicpfSR7dGhpcy55TGFiZWxTdWZmaXh9YDtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b29sdGlwO1xuICB9XG5cbiAgI2dldENoYXJ0U2l6ZSgpOiBQcm9taXNlPHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8e3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfT4ocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRSZWYgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBpZiAocGFyZW50UmVmICYmIHBhcmVudFJlZi5vZmZzZXRXaWR0aCAmJiBwYXJlbnRSZWYub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgbGV0IHdpZHRoID0gKHRoaXMud2lkdGggfHwgcGFyZW50UmVmLm9mZnNldFdpZHRoKTtcbiAgICAgICAgICBsZXQgaGVpZ2h0ID0gKHRoaXMuaGVpZ2h0IHx8IHBhcmVudFJlZi5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgcmVzb2x2ZSh7d2lkdGgsIGhlaWdodH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSlcbiAgfVxufVxuIl19