import { EventEmitter, ChangeDetectorRef, QueryList } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import * as i0 from "@angular/core";
export declare class BizyTableRowComponent {
    private ref;
    columns: QueryList<BizyTableColumnComponent>;
    id: string;
    customClass: string;
    disabled: boolean;
    selected: boolean;
    opened: boolean;
    selectable: boolean | null;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    openedChange: EventEmitter<boolean>;
    onOpen: EventEmitter<PointerEvent>;
    marginRight: number;
    constructor(ref: ChangeDetectorRef);
    _onOpen(event: PointerEvent): void;
    getId: () => string;
    getSelected: () => boolean;
    setSelectable: (selectable: boolean) => void;
    setSelected: (selected: boolean) => void;
    setMarginRight(margin: number): void;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableRowComponent, "bizy-table-row", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; "openedChange": "openedChange"; "onOpen": "onOpen"; }, ["columns"], ["bizy-table-column", "bizy-table-row-expand-content"], true, never>;
}
