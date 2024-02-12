import { ChangeDetectorRef, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SelectOptionComponent {
    private elementRef;
    private ref;
    key: string | number;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<void>;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    _onSelect(): void;
    setSelected: (selected: boolean) => void;
    getKey: () => string | number;
    getId: () => string;
    getValue: () => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectOptionComponent, "bizy-select-option", never, { "key": { "alias": "key"; "required": false; }; "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
