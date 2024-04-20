import { EventEmitter, QueryList, ChangeDetectorRef, OnInit } from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import * as i0 from "@angular/core";
export declare class BizySidebarComponent implements OnInit {
    #private;
    private ref;
    private document;
    options: QueryList<BizySidebarOptionComponent>;
    floatingOptions: QueryList<BizySidebarFloatingOptionComponent>;
    toggle: boolean;
    onToggle: EventEmitter<boolean>;
    constructor(ref: ChangeDetectorRef, document: Document);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarComponent, "bizy-sidebar", never, { "toggle": { "alias": "toggle"; "required": false; }; }, { "onToggle": "onToggle"; }, ["options", "floatingOptions"], ["[slot=start]", "*", "[slot=end]"], false, never>;
}
