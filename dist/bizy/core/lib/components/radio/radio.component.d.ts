import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyRadioComponent {
    id: string;
    name: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyRadioComponent, "bizy-radio", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["[slot=start]", "[slot=end]"], true, never>;
}
