import { EventEmitter, QueryList, AfterContentInit } from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import * as i0 from "@angular/core";
export declare class BizySidebarComponent implements AfterContentInit {
    #private;
    id: string;
    options: QueryList<BizySidebarOptionComponent>;
    floatingOptions: QueryList<BizySidebarFloatingOptionComponent>;
    toggle: boolean;
    onToggle: EventEmitter<boolean>;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarComponent, "bizy-sidebar", never, { "id": { "alias": "id"; "required": false; }; "toggle": { "alias": "toggle"; "required": false; }; }, { "onToggle": "onToggle"; }, ["options", "floatingOptions"], ["[slot=start]", "[slot=start]", "*", "[slot=end]"], false, never>;
}
