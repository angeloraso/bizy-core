import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyConfirmButtonsComponent {
    confirmLabel: string;
    cancelLabel: string;
    position: 'fixed' | 'sticky';
    disabled: boolean;
    cancel: EventEmitter<void>;
    confirm: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyConfirmButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyConfirmButtonsComponent, "bizy-confirm-buttons", never, { "confirmLabel": { "alias": "confirmLabel"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "position": { "alias": "position"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "cancel": "cancel"; "confirm": "confirm"; }, never, never, false, never>;
}
