import { ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TableFooterComponent {
    private ref;
    id: string;
    customClass: string;
    _selectable: boolean | null;
    constructor(ref: ChangeDetectorRef);
    getId: () => string;
    setSelectable: (selectable: boolean) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableFooterComponent, "bizy-table-footer", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, ["bizy-table-column"], false, never>;
}
