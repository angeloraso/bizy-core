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
    download: {
        hide?: boolean;
        label: string;
        name: string;
    };
    onLabelFormatter: (item: any) => string;
    onTooltipFormatter: (item: any) => string;
    onSelect: EventEmitter<string>;
    onDownload: EventEmitter<void>;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyPieChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPieChartComponent, "bizy-pie-chart", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "download": { "alias": "download"; "required": false; }; "onLabelFormatter": { "alias": "onLabelFormatter"; "required": false; }; "onTooltipFormatter": { "alias": "onTooltipFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onSelect": "onSelect"; "onDownload": "onDownload"; }, never, never, false, never>;
}
