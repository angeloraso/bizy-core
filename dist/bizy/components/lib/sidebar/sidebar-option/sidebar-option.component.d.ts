import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SidebarOptionComponent {
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidebarOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SidebarOptionComponent, "bizy-sidebar-option", never, { "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["[sidebar-option-content]", "bizy-sidebar-option"], false, never>;
}
