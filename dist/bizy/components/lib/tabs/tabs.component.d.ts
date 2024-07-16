import { AfterContentInit, AfterViewInit, ChangeDetectorRef, QueryList } from '@angular/core';
import { BizyTabComponent } from './tab/tab.component';
import * as i0 from "@angular/core";
export declare class BizyTabsComponent implements AfterViewInit, AfterContentInit {
    #private;
    private ref;
    tabs: QueryList<BizyTabComponent>;
    private bizyTabs;
    private bizyTabsWrapper;
    customClass: string;
    showLeftButton: boolean;
    showRightButton: boolean;
    constructor(ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    onScrollLeft(): void;
    onScrollRight(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabsComponent, "bizy-tabs", never, { "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["tabs"], ["bizy-tab"], false, never>;
}
