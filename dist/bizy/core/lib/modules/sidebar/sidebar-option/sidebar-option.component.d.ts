import { EventEmitter, QueryList, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizySidebarOptionComponent {
    private ref;
    options: QueryList<BizySidebarOptionComponent>;
    id: string;
    disabled: boolean;
    selectable: boolean;
    customClass: string;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _turnOn$: BehaviorSubject<boolean>;
    _selected: boolean;
    set selected(selected: boolean);
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: PointerEvent): void;
    _setSelected(selected: boolean): void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySidebarOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySidebarOptionComponent, "bizy-sidebar-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, ["options"], ["*", "bizy-sidebar-option"], true, never>;
}
