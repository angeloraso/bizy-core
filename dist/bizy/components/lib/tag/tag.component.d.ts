import { ElementRef, Renderer2 } from '@angular/core';
import { BIZY_TAG_TYPE } from './tag.types';
import * as i0 from "@angular/core";
export declare class BizyTagComponent {
    private elementRef;
    private renderer;
    set type(type: BIZY_TAG_TYPE);
    constructor(elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTagComponent, "bizy-tag", never, { "type": { "alias": "type"; "required": false; }; }, {}, never, ["*"], false, never>;
}
