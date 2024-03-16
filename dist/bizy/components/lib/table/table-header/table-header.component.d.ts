import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TableHeaderComponent {
    private ref;
    id: string;
    customClass: string;
    selected: boolean;
    selectable: boolean | null;
    onSelect: EventEmitter<boolean>;
    marginRight: number;
    constructor(ref: ChangeDetectorRef);
    getId: () => string;
    getSelected: () => boolean;
    setSelectable: (selectable: boolean) => void;
    setMarginRight(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableHeaderComponent, "bizy-table-header", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["bizy-table-column"], false, never>;
}
