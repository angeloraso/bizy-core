import { Subject } from 'rxjs';
import { ChangeDetectorRef, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
export declare class BizyVirtualScrollComponent implements OnInit {
    #private;
    private elementRef;
    private renderer;
    private ref;
    private document;
    virtualFor: BizyVirtualScrollNgForDirective;
    viewport: CdkVirtualScrollViewport;
    itemMinHeight: number | string;
    itemMinWidth: number | string;
    viewportHeight: string;
    virtualScrollItems: Array<any>;
    itemsByRow: number;
    items: Array<any>;
    _itemMinHeight: number;
    bizyVirtualScrollWidth: number;
    notifier$: Subject<void>;
    constructor(elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, document: Document);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyVirtualScrollComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyVirtualScrollComponent, "bizy-virtual-scroll", never, { "itemMinHeight": { "alias": "itemMinHeight"; "required": false; }; "itemMinWidth": { "alias": "itemMinWidth"; "required": false; }; "viewportHeight": { "alias": "viewportHeight"; "required": false; }; }, {}, ["virtualFor"], ["*"], false, never>;
}
