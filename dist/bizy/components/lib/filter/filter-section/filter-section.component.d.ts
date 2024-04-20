import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionComponent {
    #private;
    private document;
    private ref;
    private checkboxOptions;
    private rangeOption;
    private searchOption;
    id: string;
    disabled: boolean;
    customClass: string;
    onSelect: EventEmitter<boolean>;
    _options: Array<{
        id: string;
        selected: boolean;
    }>;
    _activated: boolean;
    constructor(document: Document, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    _onSelect: (selected: boolean) => void;
    onClear: () => void;
    isActivated: () => boolean;
    getId: () => string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionComponent, "bizy-filter-section", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onSelect": "onSelect"; }, ["rangeOption", "searchOption", "checkboxOptions"], ["[filter-section-title]", "*", "bizy-filter-section-checkbox-option", "bizy-filter-section-range-option", "bizy-filter-section-search-option"], false, never>;
}
