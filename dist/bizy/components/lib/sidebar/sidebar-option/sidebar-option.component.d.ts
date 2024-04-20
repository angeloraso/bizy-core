import { EventEmitter, QueryList, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizySidebarOptionComponent {
    private ref;
    options: QueryList<BizySidebarOptionComponent>;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<void>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(): void;
    setSelected: (selected: boolean) => void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarOptionComponent, "bizy-sidebar-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, ["options"], ["*", "bizy-sidebar-option"], false, never>;
}
