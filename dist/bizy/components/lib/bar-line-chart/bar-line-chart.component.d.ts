import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { IBizyBarLineChartData } from './bar-line-chart.types';
import * as i0 from "@angular/core";
export declare class BizyBarLineChartComponent implements OnDestroy, AfterViewInit {
    #private;
    private elementRef;
    private document;
    private ref;
    private renderer;
    resizeRef: HTMLElement;
    downloadLabel: string;
    name: string;
    axisPointer: 'line' | 'cross';
    xAxisLabels: {
        (arrayLength: number): string[];
        (...items: string[]): string[];
        new (arrayLength: number): string[];
        new (...items: string[]): string[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    onTooltipFormatter: (item: any) => string;
    onXAxisLabelFormatter: (item: any) => string;
    onSelect: EventEmitter<string>;
    constructor(elementRef: ElementRef, document: Document, ref: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    set data(data: Array<IBizyBarLineChartData>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBarLineChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyBarLineChartComponent, "bizy-bar-line-chart", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; "downloadLabel": { "alias": "downloadLabel"; "required": false; }; "name": { "alias": "name"; "required": false; }; "axisPointer": { "alias": "axisPointer"; "required": false; }; "xAxisLabels": { "alias": "xAxisLabels"; "required": false; }; "onTooltipFormatter": { "alias": "onTooltipFormatter"; "required": false; }; "onXAxisLabelFormatter": { "alias": "onXAxisLabelFormatter"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}
