import { ChangeDetectorRef, AfterContentInit, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { BizyGridForDirective } from './grid.directive';
import * as i0 from "@angular/core";
export declare class BizyGridComponent implements AfterContentInit {
    #private;
    private ref;
    private document;
    private renderer;
    private elementRef;
    content: TemplateRef<object>;
    gridDirective: BizyGridForDirective;
    resizeRef: ElementRef | null;
    notifier$: Subject<void>;
    rowHeight: number;
    itemRows: Array<Array<unknown>>;
    items: Array<unknown>;
    itemTemplate: TemplateRef<unknown>;
    itemsPerRow: number;
    constructor(ref: ChangeDetectorRef, document: Document, renderer: Renderer2, elementRef: ElementRef);
    ngAfterContentInit(): void;
    trackById(index: number, item: any): any;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyGridComponent, "bizy-grid", never, { "resizeRef": { "alias": "resizeRef"; "required": false; }; }, {}, ["gridDirective"], ["*"], true, never>;
}
