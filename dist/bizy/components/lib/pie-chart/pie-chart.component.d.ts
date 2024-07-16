import { ChangeDetectorRef, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { IBizyPieChartData } from './pie-chart.types';
import { DecimalPipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class BizyPieChartComponent {
    #private;
    private elementRef;
    private document;
    private ref;
    private renderer;
    private decimalPipe;
    prefix: string;
    suffix: string;
    fixedTo: number;
    resizeRef: ElementRef;
    downloadLabel: string;
    onSelect: EventEmitter<string>;
    onFormatter: (item: any) => string;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2, decimalPipe: DecimalPipe);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyPieChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPieChartComponent, "bizy-pie-chart", never, { "prefix": { "alias": "prefix"; "required": false; }; "suffix": { "alias": "suffix"; "required": false; }; "fixedTo": { "alias": "fixedTo"; "required": false; }; "resizeRef": { "alias": "resizeRef"; "required": false; }; "downloadLabel": { "alias": "downloadLabel"; "required": false; }; "onFormatter": { "alias": "onFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}
