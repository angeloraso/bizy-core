import { Observable } from 'rxjs';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyGridForDirective {
    #private;
    readonly viewContainerRef: ViewContainerRef;
    readonly templateRef: TemplateRef<any>;
    get items$(): Observable<Array<unknown>>;
    set gridForOf(items: Array<unknown>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridForDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyGridForDirective, "[gridFor]", never, { "gridForOf": { "alias": "gridForOf"; "required": false; }; }, {}, never, never, true, never>;
}
