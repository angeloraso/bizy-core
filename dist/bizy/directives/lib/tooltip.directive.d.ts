import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTooltipDirective {
    private elRef;
    private renderer;
    private document;
    tooltipTitle: string;
    customClass: string;
    clickeable: boolean;
    placement: 'top' | 'right' | 'bottom' | 'left';
    delay: string;
    tooltip: HTMLElement | null;
    hiding: boolean;
    constructor(elRef: ElementRef, renderer: Renderer2, document: Document);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    show(): void;
    hide(): void;
    create(): void;
    setPosition(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTooltipDirective, "[bizyTooltip]", never, { "tooltipTitle": { "alias": "bizyTooltip"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "clickeable": { "alias": "clickeable"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; }, {}, never, never, false, never>;
}
