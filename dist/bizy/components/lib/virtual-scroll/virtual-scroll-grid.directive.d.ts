import { ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class VirtualScrollGridDirective implements AfterViewInit {
    private elRef;
    private renderer;
    constructor(elRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VirtualScrollGridDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<VirtualScrollGridDirective, "[virtualScrollGrid]", never, {}, {}, never, never, false, never>;
}
