import { Observable } from 'rxjs';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyGridForDirective {
    #private;
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<unknown>;
    get items$(): Observable<Array<unknown>>;
    set gridForOf(items: Array<unknown>);
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<unknown>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridForDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyGridForDirective, "[gridFor]", never, { "gridForOf": { "alias": "gridForOf"; "required": false; }; }, {}, never, never, false, never>;
}
