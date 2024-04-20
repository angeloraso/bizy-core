import { Subject } from 'rxjs';
import { ChangeDetectorRef, OnInit, ElementRef } from '@angular/core';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import * as i0 from "@angular/core";
export declare class BizyVirtualScrollComponent implements OnInit {
    #private;
    private elementRef;
    private ref;
    private document;
    virtualFor: BizyVirtualScrollNgForDirective;
    itemMinHeight: number | string;
    itemMinWidth: number | string;
    emptyText: string;
    viewportHeight: string;
    virtualScrollItems: Array<any>;
    itemsByRow: number;
    items: Array<any>;
    _itemMinHeight: number;
    bizyVirtualScrollWidth: number;
    notifier$: Subject<void>;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef, document: Document);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyVirtualScrollComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyVirtualScrollComponent, "bizy-virtual-scroll", never, { "itemMinHeight": { "alias": "itemMinHeight"; "required": false; }; "itemMinWidth": { "alias": "itemMinWidth"; "required": false; }; "emptyText": { "alias": "emptyText"; "required": false; }; "viewportHeight": { "alias": "viewportHeight"; "required": false; }; }, {}, ["virtualFor"], ["*"], false, never>;
}
