import { EventEmitter } from '@angular/core';
import { IButtonOption } from './button.types';
import * as i0 from "@angular/core";
export declare class ButtonComponent {
    id: string;
    disabled: boolean;
    type: 'button' | 'submit';
    customClass: string;
    options: Array<IButtonOption>;
    opened: boolean;
    selected: boolean;
    onSelect: EventEmitter<Event>;
    _menuWidth: number;
    selectButton(event: any): void;
    selectOption(option: IButtonOption, event: any): void;
    closeAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "bizy-button", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "options": { "alias": "options"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
