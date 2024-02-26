import { ElementRef, Renderer2 } from '@angular/core';
import { IPieChartData } from './pie-chart.types';
import { DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class PieChartComponent {
    #private;
    private renderer;
    private elementRef;
    private document;
    private decimalPipe;
    title: string;
    currency: string;
    saveAsImageButtonLabel: string;
    isCurrency: boolean;
    decimals: number;
    height: number;
    width: number;
    chartContainer: HTMLDivElement | null;
    constructor(renderer: Renderer2, elementRef: ElementRef, document: Document, decimalPipe: DecimalPipe);
    set data(data: Array<IPieChartData>);
    static ɵfac: i0.ɵɵFactoryDeclaration<PieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PieChartComponent, "bizy-pie-chart", never, { "title": { "alias": "title"; "required": false; }; "currency": { "alias": "currency"; "required": false; }; "saveAsImageButtonLabel": { "alias": "saveAsImageButtonLabel"; "required": false; }; "isCurrency": { "alias": "isCurrency"; "required": false; }; "decimals": { "alias": "decimals"; "required": false; }; "height": { "alias": "height"; "required": false; }; "width": { "alias": "width"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, {}, never, never, false, never>;
}
