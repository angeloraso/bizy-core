import { ElementRef, Renderer2 } from '@angular/core';
import { ILineChartData } from './line-chart.types';
import { DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class LineChartComponent {
    #private;
    private renderer;
    private elementRef;
    private document;
    private decimalPipe;
    saveAsImageButtonLabel: string;
    xLabelPrefix: string;
    xLabelSuffix: string;
    yLabelPrefix: string;
    yLabelSuffix: string;
    labelsX: Array<string>;
    height: number;
    width: number;
    tooltip: boolean;
    chartContainer: HTMLDivElement | null;
    set data(data: Array<ILineChartData>);
    constructor(renderer: Renderer2, elementRef: ElementRef, document: Document, decimalPipe: DecimalPipe);
    static ɵfac: i0.ɵɵFactoryDeclaration<LineChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LineChartComponent, "bizy-line-chart", never, { "saveAsImageButtonLabel": { "alias": "saveAsImageButtonLabel"; "required": false; }; "xLabelPrefix": { "alias": "xLabelPrefix"; "required": false; }; "xLabelSuffix": { "alias": "xLabelSuffix"; "required": false; }; "yLabelPrefix": { "alias": "yLabelPrefix"; "required": false; }; "yLabelSuffix": { "alias": "yLabelSuffix"; "required": false; }; "labelsX": { "alias": "labelsX"; "required": false; }; "height": { "alias": "height"; "required": false; }; "width": { "alias": "width"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, {}, never, never, false, never>;
}
