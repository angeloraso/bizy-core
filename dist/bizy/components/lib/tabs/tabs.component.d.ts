import { QueryList, ChangeDetectorRef } from '@angular/core';
import { BizyTabComponent } from './tab/tab.component';
import * as i0 from "@angular/core";
export declare class BizyTabsComponent {
    #private;
    private ref;
    private document;
    tabs: QueryList<BizyTabComponent>;
    customClass: string;
    constructor(ref: ChangeDetectorRef, document: Document);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabsComponent, "bizy-tabs", never, { "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["tabs"], ["bizy-tab"], false, never>;
}
