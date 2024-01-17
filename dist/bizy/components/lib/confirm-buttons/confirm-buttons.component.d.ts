import { EventEmitter, Renderer2, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ConfirmButtonsComponent {
    private componentRef;
    private renderer;
    confirmLabel: string;
    cancelLabel: string;
    fixed: boolean;
    disabled: boolean;
    cancel: EventEmitter<void>;
    confirm: EventEmitter<void>;
    constructor(componentRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmButtonsComponent, "bizy-confirm-buttons", never, { "confirmLabel": { "alias": "confirmLabel"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "fixed": { "alias": "fixed"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "cancel": "cancel"; "confirm": "confirm"; }, never, never, false, never>;
}
