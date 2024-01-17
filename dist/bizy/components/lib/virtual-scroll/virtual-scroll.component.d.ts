import { Subject } from 'rxjs';
import { AfterViewInit, ChangeDetectorRef, OnInit, ElementRef } from '@angular/core';
import { VirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import * as i0 from "@angular/core";
export declare class VirtualScrollComponent implements OnInit, AfterViewInit {
    #private;
    private elementRef;
    private ref;
    virtualFor: VirtualScrollNgForDirective;
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
    private _resizeObserver;
    private _subscription;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    fillVirtualScroll: () => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VirtualScrollComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VirtualScrollComponent, "bizy-virtual-scroll", never, { "itemMinHeight": { "alias": "itemMinHeight"; "required": false; }; "itemMinWidth": { "alias": "itemMinWidth"; "required": false; }; "emptyText": { "alias": "emptyText"; "required": false; }; "viewportHeight": { "alias": "viewportHeight"; "required": false; }; }, {}, ["virtualFor"], ["*"], false, never>;
}
