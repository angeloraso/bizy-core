import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum LOADING_TYPE {
    SPINNER = "spinner",
    BAR = "bar"
}
export declare class BizyLoadingDirective {
    #private;
    private elementRef;
    private renderer;
    set bizyLoading(value: boolean);
    bizyLoadingType: LOADING_TYPE;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyLoadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyLoadingDirective, "[bizyLoading]", never, { "bizyLoading": { "alias": "bizyLoading"; "required": false; }; "bizyLoadingType": { "alias": "bizyLoadingType"; "required": false; }; }, {}, never, never, false, never>;
}
