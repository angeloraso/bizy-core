import { RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum BIZY_ANIMATION {
    FADE_IN = "fade-in",
    FADE_OUT = "fade-out",
    FADE_IN_UP = "fade-in-up",
    FADE_IN_RIGHT = "fade-in-right",
    FADE_IN_DOWN = "fade-in-down",
    FADE_IN_LEFT = "fade-in-left",
    SLIDE_IN_UP = "slide-in-up",
    SLIDE_IN_RIGHT = "slide-in-right",
    SLIDE_IN_DOWN = "slide-in-down",
    SLIDE_IN_LEFT = "slide-in-left",
    SLIDE_OUT_RIGHT = "slide-out-right",
    SLIDE_OUT_LEFT = "slide-out-left"
}
export declare class BizyAnimationService {
    #private;
    private rendererFactory;
    constructor(rendererFactory: RendererFactory2);
    setAnimation(element: HTMLElement, animation: BIZY_ANIMATION): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAnimationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyAnimationService>;
}
