import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ButtonComponent {
    id: string;
    disabled: boolean;
    type: 'button' | 'submit';
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "bizy-button", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
