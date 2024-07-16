import { ChangeDetectorRef, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTableFooterComponent {
    private ref;
    elementRef: ElementRef;
    id: string;
    customClass: string;
    marginRight: number;
    _selectable: boolean;
    constructor(ref: ChangeDetectorRef, elementRef: ElementRef);
    getId: () => string;
    setSelectable: (selectable: boolean) => void;
    setMarginRight(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableFooterComponent, "bizy-table-footer", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, never, ["bizy-table-column"], false, never>;
}
