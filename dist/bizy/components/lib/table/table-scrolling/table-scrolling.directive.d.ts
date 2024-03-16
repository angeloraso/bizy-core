import { Observable } from 'rxjs';
import { ChangeDetectorRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { ITableRow } from '../table.types';
import * as i0 from "@angular/core";
export declare class TableScrollingDirective {
    #private;
    viewContainerRef: ViewContainerRef;
    template: TemplateRef<TableRowComponent>;
    ref: ChangeDetectorRef;
    get items$(): Observable<Array<ITableRow>>;
    set tableForIn(value: Array<ITableRow>);
    constructor(viewContainerRef: ViewContainerRef, template: TemplateRef<TableRowComponent>, ref: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<TableScrollingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TableScrollingDirective, "[tableFor]", never, { "tableForIn": { "alias": "tableForIn"; "required": false; }; }, {}, never, never, false, never>;
}
