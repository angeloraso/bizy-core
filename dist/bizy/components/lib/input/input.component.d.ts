import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonDatetime, IonInput } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import * as i0 from "@angular/core";
export declare class BizyInputComponent {
    private ref;
    bizyInput: IonInput;
    id: string;
    disabled: boolean;
    readonly: boolean;
    multiple: boolean;
    clear: boolean;
    autoFocus: boolean;
    autoCapitalize: boolean;
    autoCorrect: boolean;
    browserAutoComplete: boolean;
    type: 'text' | 'date' | 'date-time' | 'time' | 'month-year' | 'month' | 'year' | 'password' | 'email' | 'number' | 'search' | 'tel';
    label: string;
    max: number;
    maxLength: number;
    min: number;
    minLength: number;
    control: FormControl;
    value: string | number;
    placeholder: string;
    cancelLabel: string;
    confirmLabel: string;
    customClass: string;
    onFocus: EventEmitter<void>;
    onEnter: EventEmitter<void>;
    onBlur: EventEmitter<void>;
    constructor(ref: ChangeDetectorRef);
    onInput: (event: {
        target: {
            value: string | number;
        };
    }) => void;
    _onBlur(): void;
    focus(): void;
    cancel(modal: IonModal, dateTime: IonDatetime): void;
    confirm(modal: IonModal, dateTime: IonDatetime): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyInputComponent, "bizy-input", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "clear": { "alias": "clear"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; "autoCapitalize": { "alias": "autoCapitalize"; "required": false; }; "autoCorrect": { "alias": "autoCorrect"; "required": false; }; "browserAutoComplete": { "alias": "browserAutoComplete"; "required": false; }; "type": { "alias": "type"; "required": false; }; "label": { "alias": "label"; "required": false; }; "max": { "alias": "max"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "min": { "alias": "min"; "required": false; }; "minLength": { "alias": "minLength"; "required": false; }; "control": { "alias": "control"; "required": false; }; "value": { "alias": "value"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "confirmLabel": { "alias": "confirmLabel"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onFocus": "onFocus"; "onEnter": "onEnter"; "onBlur": "onBlur"; }, never, ["[input-start]", "[input-label]", "[input-end]", "[input-start]", "[input-label]", "[input-end]", "[input-error]"], false, never>;
}
