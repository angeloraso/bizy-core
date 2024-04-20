import { ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyVirtualScrollGridDirective implements AfterViewInit {
    private elRef;
    private renderer;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyVirtualScrollGridDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyVirtualScrollGridDirective, "[virtualScrollGrid]", never, {}, {}, never, never, false, never>;
}
