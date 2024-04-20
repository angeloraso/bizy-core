import { ChangeDetectorRef, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizySelectOptionComponent {
    private elementRef;
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<void>;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    _onSelect(): void;
    getId: () => string;
    getSelected: () => boolean;
    getValue: () => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySelectOptionComponent, "bizy-select-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
