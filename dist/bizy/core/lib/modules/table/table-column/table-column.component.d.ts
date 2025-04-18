import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTableColumnComponent {
    #private;
    id: string;
    customClass: string;
    onSelect: EventEmitter<PointerEvent>;
    getId: () => string;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableColumnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableColumnComponent, "bizy-table-column", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}
