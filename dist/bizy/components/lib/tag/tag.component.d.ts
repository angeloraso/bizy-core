import { EventEmitter } from '@angular/core';
import { BIZY_TAG_TYPE } from './tag.types';
import * as i0 from "@angular/core";
export declare class BizyTagComponent {
    id: string;
    customClass: string;
    type: BIZY_TAG_TYPE;
    onSelect: EventEmitter<PointerEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTagComponent, "bizy-tag", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
