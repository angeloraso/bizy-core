import { ChangeDetectorRef, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { IBizyPieChartData } from './pie-chart.types';
import * as i0 from "@angular/core";
export declare class BizyPieChartComponent {
    #private;
    private elementRef;
    private document;
    private ref;
    private renderer;
    resizeRef: HTMLElement | null;
    tooltip: boolean;
    name: string;
    downloadLabel: string;
    onTooltipFormatter: (item: any) => string;
    onSelect: EventEmitter<string>;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyPieChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPieChartComponent, "bizy-pie-chart", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "name": { "alias": "name"; "required": false; }; "downloadLabel": { "alias": "downloadLabel"; "required": false; }; "onTooltipFormatter": { "alias": "onTooltipFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}
