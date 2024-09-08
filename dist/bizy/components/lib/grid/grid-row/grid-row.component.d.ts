import { ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyGridRowComponent {
    private elementRef;
    private ref;
    private renderer;
    rowHeight: number;
    set itemsPerRow(itemsPerRow: number);
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyGridRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyGridRowComponent, "bizy-grid-row", never, { "rowHeight": { "alias": "rowHeight"; "required": false; }; "itemsPerRow": { "alias": "itemsPerRow"; "required": false; }; }, {}, never, ["*"], false, never>;
}
