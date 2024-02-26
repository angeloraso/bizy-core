import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class LineChartComponent {
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
                type: 'line',
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartComponent, deps: [{ token: Renderer2 }, { token: ElementRef }, { token: DOCUMENT }, { token: DecimalPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: LineChartComponent, selector: "bizy-line-chart", inputs: { saveAsImageButtonLabel: "saveAsImageButtonLabel", xLabelPrefix: "xLabelPrefix", xLabelSuffix: "xLabelSuffix", yLabelPrefix: "yLabelPrefix", yLabelSuffix: "yLabelSuffix", labelsX: "labelsX", height: "height", width: "width", data: "data" }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LineChartComponent, decorators: [{
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
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBT3hELE1BQU0sT0FBTyxrQkFBa0I7SUFtQkE7SUFDQztJQUNGO0lBQ0c7SUFyQnRCLHNCQUFzQixHQUFXLFdBQVcsQ0FBQztJQUM3QyxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLFlBQVksR0FBVyxFQUFFLENBQUM7SUFDMUIsWUFBWSxHQUFXLEVBQUUsQ0FBQztJQUMxQixZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLE9BQU8sR0FBa0IsRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBUztJQUNmLEtBQUssQ0FBUztJQUV2QixjQUFjLEdBQTBCLElBQUksQ0FBQztJQUU3QyxJQUFhLElBQUksQ0FBQyxJQUEyQjtRQUMzQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFlBQzZCLFFBQW1CLEVBQ2xCLFVBQXNCLEVBQ3hCLFFBQWtCLEVBQ2YsV0FBd0I7UUFIMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDZixnQkFB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QVUsRUFBRSxDQUFDO29CQUM5QixPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQXRKVSxrQkFBa0Isa0JBbUJuQixTQUFTLGFBQ1QsVUFBVSxhQUNWLFFBQVEsYUFDUixXQUFXOzRGQXRCVixrQkFBa0IsaVRBSG5CLEVBQUU7OzRGQUdELGtCQUFrQjtrQkFMOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzBCQW9CSSxNQUFNOzJCQUFDLFNBQVM7OzBCQUNoQixNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVzs0Q0FyQlosc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBSU8sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cyc7XG5pbXBvcnQgeyBJTGluZUNoYXJ0RGF0YSB9IGZyb20gJy4vbGluZS1jaGFydC50eXBlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCwgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWxpbmUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIExpbmVDaGFydENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNhdmVBc0ltYWdlQnV0dG9uTGFiZWw6IHN0cmluZyA9ICdEZXNjYXJnYXInO1xuICBASW5wdXQoKSB4TGFiZWxQcmVmaXg6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB4TGFiZWxTdWZmaXg6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB5TGFiZWxQcmVmaXg6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB5TGFiZWxTdWZmaXg6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBsYWJlbHNYOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuXG4gIGNoYXJ0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNldCBkYXRhKGRhdGE6IEFycmF5PElMaW5lQ2hhcnREYXRhPikge1xuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy4jc2V0Q2hhcnREYXRhKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChEZWNpbWFsUGlwZSkgcHJpdmF0ZSBkZWNpbWFsUGlwZTogRGVjaW1hbFBpcGVcbiAgKSB7fVxuXG4gIGFzeW5jICNzZXRDaGFydERhdGEoZGF0YTogQXJyYXk8SUxpbmVDaGFydERhdGE+KSB7XG4gICAgbGV0IHNpemUgPSB7d2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHR9O1xuICAgIGlmICghdGhpcy53aWR0aCB8fCAhdGhpcy5oZWlnaHQpIHtcbiAgICAgIHNpemUgPSBhd2FpdCB0aGlzLiNnZXRDaGFydFNpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY2hhcnRDb250YWluZXIpIHtcbiAgICAgIHRoaXMuY2hhcnRDb250YWluZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNoYXJ0Q29udGFpbmVyLCAnd2lkdGgnLCBgJHtzaXplLndpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHtzaXplLmhlaWdodH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jaGFydENvbnRhaW5lcilcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgY29uc3QgX2RhdGEgPSBbXTtcbiAgICBjb25zdCBsZWdlbmREYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZGF0YS5mb3JFYWNoKF9kID0+IHtcbiAgICAgIGlmIChfZC5jb2xvcikge1xuICAgICAgICBjb2xvci5wdXNoKF9kLmNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgbGVnZW5kRGF0YS5wdXNoKF9kLm5hbWUpO1xuXG4gICAgICBfZGF0YS5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICBpZDogX2QuaWQgPz8gU3RyaW5nKE1hdGgucmFuZG9tKCkpLFxuICAgICAgICBuYW1lOiBfZC5uYW1lLFxuICAgICAgICBzbW9vdGg6IHRydWUsXG4gICAgICAgIGRhdGE6ICFfZC52YWx1ZXMgfHwgX2QudmFsdWVzLmxlbmd0aCA9PT0gMCA/IFswXSA6IF9kLnZhbHVlc1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb246IGFueSA9IHtcbiAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxuICAgICAgICBhcHBlbmRUb0JvZHk6IHRydWUsXG4gICAgICAgIGZvcm1hdHRlcjogdGhpcy4jdG9vbHRpcEZvcm1hdHRlclxuICAgICAgfSxcbiAgICAgIGxlZ2VuZDoge1xuICAgICAgICB5OiAnYm90dG9tJyxcbiAgICAgICAgcGFkZGluZzogWzAsIDAsIDAsIDBdLFxuICAgICAgICBkYXRhOiBsZWdlbmREYXRhXG4gICAgICB9LFxuICAgICAgdG9vbGJveDoge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBmZWF0dXJlOiB7XG4gICAgICAgICAgc2F2ZUFzSW1hZ2U6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zYXZlQXNJbWFnZUJ1dHRvbkxhYmVsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uU3R5bGU6IHtcbiAgICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgeEF4aXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgZGF0YTogdGhpcy5sYWJlbHNYLFxuICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiBgJHt0aGlzLnhMYWJlbFByZWZpeH17dmFsdWV9JHt0aGlzLnhMYWJlbFN1ZmZpeH1gLFxuICAgICAgICAgICAgZm9udFNpemU6IDEwLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHlBeGlzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiBgJHt0aGlzLnlMYWJlbFByZWZpeH17dmFsdWV9JHt0aGlzLnlMYWJlbFN1ZmZpeH1gLFxuICAgICAgICAgICAgZm9udFNpemU6IDEwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgc2VyaWVzOiBfZGF0YVxuICAgIH07XG5cbiAgICBvcHRpb24uZ3JpZCA9IHtcbiAgICAgIGJvdHRvbTogYCR7TWF0aC5tYXgobGVnZW5kRGF0YS5sZW5ndGggKiAyLjQsIDEwKX0lYCxcbiAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZSxcbiAgICAgIGxlZnQ6ICczJScsXG4gICAgICByaWdodDogJzMlJyBcbiAgICB9O1xuXG4gICAgaWYgKGNvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wdGlvbi5jb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIGlmICgobGVnZW5kRGF0YS5sZW5ndGggLyAxOCkgPiAxKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY2hhcnRDb250YWluZXIsICdoZWlnaHQnLCBgJHt0aGlzLmhlaWdodCAqIChsZWdlbmREYXRhLmxlbmd0aCAvIDE4KX1weGApO1xuICAgIH1cblxuICAgIGVjaGFydHMuaW5pdCh0aGlzLmNoYXJ0Q29udGFpbmVyISkuc2V0T3B0aW9uKG9wdGlvbik7XG4gIH1cblxuICAjdG9vbHRpcEZvcm1hdHRlciA9IChwYXJhbXM6IEFycmF5PGFueT4pID0+IHtcbiAgICBsZXQgdG9vbHRpcCA9IGAke3BhcmFtc1swXS5uYW1lfWA7XG4gICAgY29uc3QgbGluZVBhcmFtID0gcGFyYW1zLmZpbHRlcihfcGFyYW0gPT4gX3BhcmFtLmNvbXBvbmVudFN1YlR5cGUgPT09ICdsaW5lJyk7XG5cbiAgICBsaW5lUGFyYW0uZm9yRWFjaChfcGFyYW0gPT4ge1xuICAgICAgY29uc3QgbGluZSA9IGA8c3BhbiBzdHlsZT1cImNvbG9yOiAke19wYXJhbS5jb2xvcn07IGZvbnQtc2l6ZTogMnJlbTsgcG9zaXRpb246IHJlbGF0aXZlOyB0b3A6IDAuM3JlbTtcIj4tPC9zcGFuPmA7XG4gICAgICB0b29sdGlwICs9IGA8YnIvPiR7bGluZX0gJHtfcGFyYW0uc2VyaWVzTmFtZX0gOiAke3RoaXMueUxhYmVsUHJlZml4fSR7dGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0oX3BhcmFtLnZhbHVlLCAnMS4yLTInKX0ke3RoaXMueUxhYmVsU3VmZml4fWA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9vbHRpcDtcbiAgfVxuXG4gICNnZXRDaGFydFNpemUoKTogUHJvbWlzZTx7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0+KHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50UmVmID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHBhcmVudFJlZiAmJiBwYXJlbnRSZWYub2Zmc2V0V2lkdGggJiYgcGFyZW50UmVmLm9mZnNldEhlaWdodCkge1xuICAgICAgICAgIGxldCB3aWR0aCA9ICh0aGlzLndpZHRoIHx8IHBhcmVudFJlZi5vZmZzZXRXaWR0aCk7XG4gICAgICAgICAgbGV0IGhlaWdodCA9ICh0aGlzLmhlaWdodCB8fCBwYXJlbnRSZWYub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIHJlc29sdmUoe3dpZHRoLCBoZWlnaHR9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==