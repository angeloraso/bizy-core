import { Observable } from 'rxjs';
import { TemplateRef, ElementRef } from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { TableScrollingDirective } from './table-scrolling.directive';
import { ITableRow } from '../table.types';
import * as i0 from "@angular/core";
export declare class TableScrollingComponent {
    #private;
    private elementRef;
    content: TemplateRef<object>;
    items$: Observable<Array<ITableRow>>;
    itemTemplate: TemplateRef<TableRowComponent>;
    itemSize: number;
    constructor(elementRef: ElementRef);
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective: TableScrollingDirective): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableScrollingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableScrollingComponent, "bizy-table-scrolling", never, {}, {}, never, ["*"], false, never>;
}
