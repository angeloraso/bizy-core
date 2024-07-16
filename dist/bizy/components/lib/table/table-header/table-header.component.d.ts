import { ChangeDetectorRef, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTableHeaderComponent {
    private ref;
    elementRef: ElementRef;
    id: string;
    customClass: string;
    selected: boolean;
    selectable: boolean | null;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    marginRight: number;
    constructor(ref: ChangeDetectorRef, elementRef: ElementRef);
    getId: () => string;
    getSelected: () => boolean;
    setSelectable: (selectable: boolean) => void;
    setMarginRight(margin: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableHeaderComponent, "bizy-table-header", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["bizy-table-column"], false, never>;
}
