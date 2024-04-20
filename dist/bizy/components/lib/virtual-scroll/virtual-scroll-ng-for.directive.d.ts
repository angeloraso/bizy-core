import { TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyVirtualScrollNgForDirective {
    template: TemplateRef<any>;
    _items: BehaviorSubject<unknown[]>;
    get items(): import("rxjs").Observable<unknown[]>;
    set virtualNgForIn(items: Array<unknown>);
    constructor(template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyVirtualScrollNgForDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyVirtualScrollNgForDirective, "[virtualNgFor]", never, { "virtualNgForIn": { "alias": "virtualNgForIn"; "required": false; }; }, {}, never, never, false, never>;
}
