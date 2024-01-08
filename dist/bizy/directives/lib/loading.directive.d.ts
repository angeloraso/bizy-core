import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
type LoadingType = 'spinner' | 'card' | 'item';
export declare class LoadingDirective {
    #private;
    private elementRef;
    private renderer;
    set bizyLoading(value: boolean);
    type: LoadingType;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    setLoading(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LoadingDirective, "[bizyLoading]", never, { "bizyLoading": { "alias": "bizyLoading"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
