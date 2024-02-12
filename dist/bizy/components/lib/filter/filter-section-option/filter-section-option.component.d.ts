import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FilterSectionOptionComponent {
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<{
        id: string;
        selected: boolean;
    }>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(): void;
    setSelect(selected: boolean): void;
    getSelected(): boolean;
    getId(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterSectionOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterSectionOptionComponent, "bizy-filter-section-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
