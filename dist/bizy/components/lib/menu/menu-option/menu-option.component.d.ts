import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MenuOptionComponent {
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent & {
        target: {
            id: string;
        };
    }>;
    _onSelect(event: PointerEvent & {
        target: {
            id: string;
        };
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuOptionComponent, "bizy-menu-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*", "bizy-menu"], false, never>;
}
