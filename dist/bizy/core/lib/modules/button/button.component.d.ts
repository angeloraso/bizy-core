import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyButtonComponent {
    id: string;
    disabled: boolean;
    type: 'button' | 'submit';
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    _focused: boolean;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyButtonComponent, "bizy-button", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}
