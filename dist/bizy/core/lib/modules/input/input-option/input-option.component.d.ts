import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyInputOptionComponent {
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<PointerEvent>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: PointerEvent): void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyInputOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyInputOptionComponent, "bizy-input-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}
