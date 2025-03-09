import { AfterContentInit, ChangeDetectorRef, EventEmitter, QueryList } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizySidebarFloatingOptionComponent implements AfterContentInit {
    #private;
    private ref;
    options: QueryList<BizySidebarOptionComponent>;
    id: string;
    disabled: boolean;
    selectable: boolean;
    offsetX: number;
    offsetY: number;
    customClass: string;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _turnOn$: BehaviorSubject<boolean>;
    _selected: boolean;
    _opened: boolean;
    set selected(selected: boolean);
    constructor(ref: ChangeDetectorRef);
    ngAfterContentInit(): void;
    _onSelect(event: PointerEvent): void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    getId: () => string;
    getSelected: () => boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarFloatingOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarFloatingOptionComponent, "bizy-sidebar-floating-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, ["options"], ["*", "bizy-sidebar-floating-option-title", "bizy-sidebar-option"], true, never>;
}
