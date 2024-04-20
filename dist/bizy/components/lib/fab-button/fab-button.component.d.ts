import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFabButtonComponent {
    id: string;
    disabled: boolean;
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFabButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFabButtonComponent, "bizy-fab-button", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
