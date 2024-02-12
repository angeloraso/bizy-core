import { QueryList, ChangeDetectorRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import * as i0 from "@angular/core";
export declare class TableComponent {
    #private;
    private ref;
    private document;
    header: TableHeaderComponent;
    rows: QueryList<TableRowComponent>;
    footer: TableFooterComponent;
    set selectable(selectable: boolean);
    constructor(ref: ChangeDetectorRef, document: Document);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent, "bizy-table", never, { "selectable": { "alias": "selectable"; "required": false; }; }, {}, ["header", "footer", "rows"], ["bizy-table-header", "bizy-table-row", "bizy-table-footer"], false, never>;
}
