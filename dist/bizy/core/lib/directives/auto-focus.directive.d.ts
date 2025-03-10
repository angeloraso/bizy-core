import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyAutoFocusDirective implements AfterViewInit {
    private elementRef;
    private ref;
    autoFocus: boolean;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    setFocus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAutoFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyAutoFocusDirective, "[bizyAutoFocus]", never, { "autoFocus": { "alias": "bizyAutoFocus"; "required": false; }; }, {}, never, never, true, never>;
}
