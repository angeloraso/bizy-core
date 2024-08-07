import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { IBizyBarLineChartData } from './bar-line-chart.types';
import * as i0 from "@angular/core";
export declare class BizyBarLineChartComponent implements OnDestroy, AfterViewInit {
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
    axisPointer: 'line' | 'cross';
    xAxisLabels: Array<string>;
    onTooltipFormatter: (item: any) => string;
    onXAxisLabelFormatter: (item: any) => string;
    onDownload: EventEmitter<void>;
    onSelect: EventEmitter<string>;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyBarLineChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBarLineChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyBarLineChartComponent, "bizy-bar-line-chart", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "download": { "alias": "download"; "required": false; }; "axisPointer": { "alias": "axisPointer"; "required": false; }; "xAxisLabels": { "alias": "xAxisLabels"; "required": false; }; "onTooltipFormatter": { "alias": "onTooltipFormatter"; "required": false; }; "onXAxisLabelFormatter": { "alias": "onXAxisLabelFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onDownload": "onDownload"; "onSelect": "onSelect"; }, never, never, false, never>;
}
