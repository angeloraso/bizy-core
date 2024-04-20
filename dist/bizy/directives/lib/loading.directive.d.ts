import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
type LoadingType = 'spinner' | 'card' | 'item';
export declare class BizyLoadingDirective {
    #private;
    private elementRef;
    private renderer;
    private document;
    set bizyLoading(value: boolean);
    type: LoadingType;
    constructor(elementRef: ElementRef, renderer: Renderer2, document: Document);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyLoadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyLoadingDirective, "[bizyLoading]", never, { "bizyLoading": { "alias": "bizyLoading"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
