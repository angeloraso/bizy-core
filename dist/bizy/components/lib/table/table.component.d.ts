import { QueryList, ChangeDetectorRef, AfterContentInit, ElementRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { TableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import * as i0 from "@angular/core";
export declare class TableComponent implements AfterContentInit {
    #private;
    private ref;
    private document;
    private elementRef;
    viewport: TableScrollingComponent;
    virtualFor: TableScrollingDirective;
    header: TableHeaderComponent;
    rows: QueryList<TableRowComponent>;
    footer: TableFooterComponent;
    marginRight: number;
    set selectable(selectable: boolean);
    constructor(ref: ChangeDetectorRef, document: Document, elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent, "bizy-table", never, { "selectable": { "alias": "selectable"; "required": false; }; }, {}, ["virtualFor", "header", "footer", "rows"], ["bizy-table-header", "bizy-table-row", "bizy-table-footer"], false, never>;
}
