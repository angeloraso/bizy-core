import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CheckboxComponent {
    id: string;
    name: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<boolean>;
    _checkboxId: string;
    setSelected(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxComponent, "bizy-checkbox", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, never, false, never>;
}
