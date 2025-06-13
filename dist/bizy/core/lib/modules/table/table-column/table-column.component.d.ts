import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTableColumnComponent {
    #private;
    id: string;
    customClass: string;
    contextMenu: EventEmitter<MouseEvent>;
    onSelect: EventEmitter<PointerEvent>;
    onRightClick(event: MouseEvent): void;
    getId: () => string;
    setMarginLeft(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableColumnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableColumnComponent, "bizy-table-column", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "contextMenu": "contextMenu"; "onSelect": "onSelect"; }, never, ["*"], true, never>;
}
