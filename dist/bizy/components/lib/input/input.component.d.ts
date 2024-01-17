import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import * as i0 from "@angular/core";
export declare class InputComponent {
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
    type: 'text' | 'date' | 'password' | 'email' | 'number' | 'search' | 'tel';
    label: string;
    max: number;
    maxLength: number;
    min: number;
    minLength: number;
    control: FormControl;
    placeholder: string;
    customClass: string;
    onFocus: EventEmitter<void>;
    onInput(event: {
        target: {
            value: string | number;
        };
    }): void;
    onBlur(): void;
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputComponent, "bizy-input", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "clear": { "alias": "clear"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; "autoCapitalize": { "alias": "autoCapitalize"; "required": false; }; "autoCorrect": { "alias": "autoCorrect"; "required": false; }; "browserAutoComplete": { "alias": "browserAutoComplete"; "required": false; }; "type": { "alias": "type"; "required": false; }; "label": { "alias": "label"; "required": false; }; "max": { "alias": "max"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "min": { "alias": "min"; "required": false; }; "minLength": { "alias": "minLength"; "required": false; }; "control": { "alias": "control"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onFocus": "onFocus"; }, never, ["[input-start]", "[input-label]", "[input-end]", "[input-error]"], false, never>;
}
