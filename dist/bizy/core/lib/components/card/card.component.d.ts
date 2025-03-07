import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyCardComponent {
    id: string;
    disabled: boolean;
    selected: boolean;
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyCardComponent, "bizy-card", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["[slot=header-start]", "[slot=header-end]", "*", "[slot=footer-start]", "[slot=footer-end]"], true, never>;
}
