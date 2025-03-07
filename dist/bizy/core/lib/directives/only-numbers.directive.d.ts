import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyOnlyNumbersDirective {
    #private;
    private elementRef;
    onlyNumbers: boolean;
    constructor(elementRef: ElementRef);
    onInput(event: Event): void;
    onKeyDown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyOnlyNumbersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyOnlyNumbersDirective, "[bizyOnlyNumbers]", never, { "onlyNumbers": { "alias": "bizyOnlyNumbers"; "required": false; }; }, {}, never, never, true, never>;
}
