import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TableColumnComponent {
    id: string;
    customClass: string;
    onSelect: EventEmitter<void>;
    getId: () => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableColumnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableColumnComponent, "bizy-table-column", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
