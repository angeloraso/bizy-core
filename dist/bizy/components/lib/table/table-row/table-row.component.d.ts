import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TableRowComponent {
    private ref;
    id: string;
    customClass: string;
    disabled: boolean;
    selected: boolean;
    selectable: boolean | null;
    onSelect: EventEmitter<boolean>;
    constructor(ref: ChangeDetectorRef);
    getId: () => string;
    getSelected: () => boolean;
    setSelectable: (selectable: boolean) => void;
    setSelected: (selected: boolean) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableRowComponent, "bizy-table-row", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["bizy-table-column"], false, never>;
}
