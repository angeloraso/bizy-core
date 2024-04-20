import { ElementRef } from '@angular/core';
import { IBizyPieChartData } from './pie-chart.types';
import { DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class BizyPieChartComponent {
    #private;
    private elementRef;
    private document;
    private decimalPipe;
    prefix: string;
    suffix: string;
    downloadLabel: string;
    constructor(elementRef: ElementRef, document: Document, decimalPipe: DecimalPipe);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyPieChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPieChartComponent, "bizy-pie-chart", never, { "prefix": { "alias": "prefix"; "required": false; }; "suffix": { "alias": "suffix"; "required": false; }; "downloadLabel": { "alias": "downloadLabel"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, {}, never, never, false, never>;
}
