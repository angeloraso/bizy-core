import { ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { BizyCopyToClipboardService } from '../services/copy-to-clipboard.service';
import * as i0 from "@angular/core";
export declare class BizyCopyToClipboardDirective {
    #private;
    private elementRef;
    private renderer;
    private copyToClipboard;
    onCopy: EventEmitter<void>;
    constructor(elementRef: ElementRef, renderer: Renderer2, copyToClipboard: BizyCopyToClipboardService);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCopyToClipboardDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyCopyToClipboardDirective, "[bizyCopyToClipboard]", never, {}, { "onCopy": "onCopy"; }, never, never, true, never>;
}
