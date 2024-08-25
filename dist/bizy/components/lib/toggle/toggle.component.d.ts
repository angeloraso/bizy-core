import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyToggleComponent {
    id: string;
    disabled: boolean;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent>;
    selectedChange: EventEmitter<boolean>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyToggleComponent, "bizy-toggle", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; "selectedChange": "selectedChange"; }, never, ["[slot=start]", "[slot=end]"], false, never>;
}
