import { Observable } from 'rxjs';
import { ChangeDetectorRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { IBizyTableRow } from '../table.types';
import * as i0 from "@angular/core";
export declare class BizyTableScrollingDirective {
    #private;
    viewContainerRef: ViewContainerRef;
    template: TemplateRef<BizyTableRowComponent>;
    ref: ChangeDetectorRef;
    get items$(): Observable<Array<IBizyTableRow>>;
    set tableForIn(value: Array<IBizyTableRow>);
    constructor(viewContainerRef: ViewContainerRef, template: TemplateRef<BizyTableRowComponent>, ref: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTableScrollingDirective, "[tableFor]", never, { "tableForIn": { "alias": "tableForIn"; "required": false; }; }, {}, never, never, false, never>;
}
