import { EventEmitter } from '@angular/core';
import { BIZY_TAG_TYPE } from './tag.types';
import * as i0 from "@angular/core";
export declare class BizyTagComponent {
    id: string;
    customClass: string;
    disabled: boolean;
    type: BIZY_TAG_TYPE;
    onSelect: EventEmitter<PointerEvent>;
    _focused: boolean;
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTagComponent, "bizy-tag", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}
