import { QueryList, ChangeDetectorRef, AfterContentInit, ElementRef } from '@angular/core';
import { BizyTableHeaderComponent } from './table-header/table-header.component';
import { BizyTableFooterComponent } from './table-footer/table-footer.component';
import { BizyTableRowComponent } from './table-row/table-row.component';
import { Subject } from 'rxjs';
import { BizyTableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { BizyTableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import * as i0 from "@angular/core";
export declare class BizyTableComponent implements AfterContentInit {
    #private;
    private ref;
    private document;
    private elementRef;
    viewport: BizyTableScrollingComponent;
    virtualFor: BizyTableScrollingDirective;
    header: BizyTableHeaderComponent;
    rows: QueryList<BizyTableRowComponent>;
    footer: BizyTableFooterComponent;
    notifier$: Subject<void>;
    marginRight: number;
    set selectable(selectable: boolean);
    constructor(ref: ChangeDetectorRef, document: Document, elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableComponent, "bizy-table", never, { "selectable": { "alias": "selectable"; "required": false; }; }, {}, ["virtualFor", "header", "footer", "rows"], ["bizy-table-header", "bizy-table-row", "bizy-table-footer"], false, never>;
}
