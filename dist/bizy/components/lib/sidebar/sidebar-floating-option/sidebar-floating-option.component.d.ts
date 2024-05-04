import { ChangeDetectorRef, EventEmitter, OnInit, QueryList } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';
import * as i0 from "@angular/core";
export declare class BizySidebarFloatingOptionComponent implements OnInit {
    #private;
    private ref;
    private document;
    options: QueryList<BizySidebarOptionComponent>;
    id: string;
    disabled: boolean;
    offsetX: number;
    offsetY: number;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent>;
    _opened: boolean;
    constructor(ref: ChangeDetectorRef, document: Document);
    ngOnInit(): void;
    _onSelect(event: any): void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    setSelected: (selected: boolean) => void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarFloatingOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarFloatingOptionComponent, "bizy-sidebar-floating-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, ["options"], ["*", "bizy-sidebar-floating-option-title", "bizy-sidebar-option"], false, never>;
}
