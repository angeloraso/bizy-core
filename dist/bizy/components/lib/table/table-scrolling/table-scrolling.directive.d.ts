import { Observable } from 'rxjs';
import { ChangeDetectorRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import * as i0 from "@angular/core";
export declare class BizyTableScrollingDirective<T> {
    #private;
    viewContainerRef: ViewContainerRef;
    template: TemplateRef<BizyTableRowComponent>;
    ref: ChangeDetectorRef;
    get items$(): Observable<Array<T>>;
    set tableForIn(value: Array<T>);
    constructor(viewContainerRef: ViewContainerRef, template: TemplateRef<BizyTableRowComponent>, ref: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTableScrollingDirective<any>, "[tableFor]", never, { "tableForIn": { "alias": "tableForIn"; "required": false; }; }, {}, never, never, false, never>;
}
