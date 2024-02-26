import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BarChartComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BarChartComponent, selector: "bizy-bar-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BarChartComponent, decorators: [{
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
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9iYXItY2hhcnQvYmFyLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBT3hELE1BQU0sT0FBTyxpQkFBaUI7SUFtQkM7SUFDQztJQUNGO0lBQ0c7SUFyQnRCLHNCQUFzQixHQUFXLFdBQVcsQ0FBQztJQUM3QyxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLFlBQVksR0FBVyxFQUFFLENBQUM7SUFDMUIsWUFBWSxHQUFXLEVBQUUsQ0FBQztJQUMxQixZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLE9BQU8sR0FBa0IsRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBUztJQUNmLEtBQUssQ0FBUztJQUV2QixjQUFjLEdBQTBCLElBQUksQ0FBQztJQUU3QyxJQUFhLElBQUksQ0FBQyxJQUEwQjtRQUMxQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFlBQzZCLFFBQW1CLEVBQ2xCLFVBQXNCLEVBQ3hCLFFBQWtCLEVBQ2YsV0FBd0I7UUFIMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDZixnQkFBVyxH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RUFBRSxDQUFDO29CQUM5QixPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQXRKVSxpQkFBaUIsa0JBbUJsQixTQUFTLGFBQ1QsVUFBVSxhQUNWLFFBQVEsYUFDUixXQUFXOzRGQXRCVixpQkFBaUIsZ1RBSGxCLEVBQUU7OzRGQUdELGlCQUFpQjtrQkFMN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQW9CSSxNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVzs0Q0FyQlosc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBSU8sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cyc7XG5pbXBvcnQgeyBJQmFyQ2hhcnREYXRhIH0gZnJvbSAnLi9iYXItY2hhcnQudHlwZXMnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1iYXItY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJhckNoYXJ0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgc2F2ZUFzSW1hZ2VCdXR0b25MYWJlbDogc3RyaW5nID0gJ0Rlc2Nhcmdhcic7XG4gIEBJbnB1dCgpIHhMYWJlbFByZWZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHhMYWJlbFN1ZmZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHlMYWJlbFByZWZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHlMYWJlbFN1ZmZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGxhYmVsc1g6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG5cbiAgY2hhcnRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KCkgc2V0IGRhdGEoZGF0YTogQXJyYXk8SUJhckNoYXJ0RGF0YT4pIHtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuI3NldENoYXJ0RGF0YShkYXRhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoRGVjaW1hbFBpcGUpIHByaXZhdGUgZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlXG4gICkge31cblxuICBhc3luYyAjc2V0Q2hhcnREYXRhKGRhdGE6IEFycmF5PElCYXJDaGFydERhdGE+KSB7XG4gICAgbGV0IHNpemUgPSB7d2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xuICAgIGlmICghdGhpcy53aWR0aCB8fCAhdGhpcy5oZWlnaHQpIHtcbiAgICAgIHNpemUgPSBhd2FpdCB0aGlzLiNnZXRDaGFydFNpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY2hhcnRDb250YWluZXIpIHtcbiAgICAgIHRoaXMuY2hhcnRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHtzaXplLndpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtzaXplLmhlaWdodH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jaGFydENvbnRhaW5lcilcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgY29uc3QgX2RhdGEgPSBbXTtcbiAgICBjb25zdCBsZWdlbmREYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZGF0YS5mb3JFYWNoKF9kID0+IHtcbiAgICAgIGlmIChfZC5jb2xvcikge1xuICAgICAgICBjb2xvci5wdXNoKF9kLmNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgbGVnZW5kRGF0YS5wdXNoKF9kLm5hbWUpO1xuXG4gICAgICBfZGF0YS5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgIGlkOiBfZC5pZCA/PyBTdHJpbmcoTWF0aC5yYW5kb20oKSksXG4gICAgICAgIG5hbWU6IF9kLm5hbWUsXG4gICAgICAgIHNtb290aDogdHJ1ZSxcbiAgICAgICAgZGF0YTogIV9kLnZhbHVlcyB8fCBfZC52YWx1ZXMubGVuZ3RoID09PSAwID8gWzBdIDogX2QudmFsdWVzXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbjogYW55ID0ge1xuICAgICAgdG9vbHRpcDoge1xuICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgICAgZm9ybWF0dGVyOiB0aGlzLiN0b29sdGlwRm9ybWF0dGVyXG4gICAgICB9LFxuICAgICAgbGVnZW5kOiB7XG4gICAgICAgIHk6ICdib3R0b20nLFxuICAgICAgICBwYWRkaW5nOiBbMCwgMCwgMCwgMF0sXG4gICAgICAgIGRhdGE6IGxlZ2VuZERhdGFcbiAgICAgIH0sXG4gICAgICB0b29sYm94OiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGZlYXR1cmU6IHtcbiAgICAgICAgICBzYXZlQXNJbWFnZToge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNhdmVBc0ltYWdlQnV0dG9uTGFiZWxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb25TdHlsZToge1xuICAgICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB4QXhpczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgICBkYXRhOiB0aGlzLmxhYmVsc1gsXG4gICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGAke3RoaXMueExhYmVsUHJlZml4fXt2YWx1ZX0ke3RoaXMueExhYmVsU3VmZml4fWAsXG4gICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgeUF4aXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGAke3RoaXMueUxhYmVsUHJlZml4fXt2YWx1ZX0ke3RoaXMueUxhYmVsU3VmZml4fWAsXG4gICAgICAgICAgICBmb250U2l6ZTogMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBzZXJpZXM6IF9kYXRhXG4gICAgfTtcblxuICAgIG9wdGlvbi5ncmlkID0ge1xuICAgICAgYm90dG9tOiBgJHtNYXRoLm1heChsZWdlbmREYXRhLmxlbmd0aCAqIDIuNCwgMTApfSVgLFxuICAgICAgY29udGFpbkxhYmVsOiB0cnVlLFxuICAgICAgbGVmdDogJzMlJyxcbiAgICAgIHJpZ2h0OiAnMyUnIFxuICAgIH07XG5cbiAgICBpZiAoY29sb3IubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9uLmNvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKChsZWdlbmREYXRhLmxlbmd0aCAvIDE4KSA+IDEpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jaGFydENvbnRhaW5lciwgJ2hlaWdodCcsIGAke3RoaXMuaGVpZ2h0ICogKGxlZ2VuZERhdGEubGVuZ3RoIC8gMTgpfXB4YCk7XG4gICAgfVxuXG4gICAgZWNoYXJ0cy5pbml0KHRoaXMuY2hhcnRDb250YWluZXIhKS5zZXRPcHRpb24ob3B0aW9uKTtcbiAgfVxuXG4gICN0b29sdGlwRm9ybWF0dGVyID0gKHBhcmFtczogQXJyYXk8YW55PikgPT4ge1xuICAgIGxldCB0b29sdGlwID0gYCR7cGFyYW1zWzBdLm5hbWV9YDtcbiAgICBjb25zdCBiYXJQYXJhbSA9IHBhcmFtcy5maWx0ZXIoX3BhcmFtID0+IF9wYXJhbS5jb21wb25lbnRTdWJUeXBlID09PSAnYmFyJyk7XG5cbiAgICBiYXJQYXJhbS5mb3JFYWNoKF9wYXJhbSA9PiB7XG4gICAgICBjb25zdCBidWxsZXQgPSBgPHNwYW4gc3R5bGU9XCJjb2xvcjogJHtfcGFyYW0uY29sb3J9OyBmb250LXNpemU6IDJyZW07IHBvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAwLjNyZW07XCI+JiM4MjI2Ozwvc3Bhbj5gO1xuICAgICAgdG9vbHRpcCArPSBgPGJyLz4ke2J1bGxldH0gJHtfcGFyYW0uc2VyaWVzTmFtZX0gOiAke3RoaXMueUxhYmVsUHJlZml4fSR7dGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0oX3BhcmFtLnZhbHVlLCAnMS4yLTInKX0ke3RoaXMueUxhYmVsU3VmZml4fWA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9vbHRpcDtcbiAgfVxuXG4gICNnZXRDaGFydFNpemUoKTogUHJvbWlzZTx7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0+KHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50UmVmID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHBhcmVudFJlZiAmJiBwYXJlbnRSZWYub2Zmc2V0V2lkdGggJiYgcGFyZW50UmVmLm9mZnNldEhlaWdodCkge1xuICAgICAgICAgIGxldCB3aWR0aCA9ICh0aGlzLndpZHRoIHx8IHBhcmVudFJlZi5vZmZzZXRXaWR0aCk7XG4gICAgICAgICAgbGV0IGhlaWdodCA9ICh0aGlzLmhlaWdodCB8fCBwYXJlbnRSZWYub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIHJlc29sdmUoe3dpZHRoLCBoZWlnaHR9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==