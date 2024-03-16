import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FilterSectionComponent {
    #private;
    private document;
    private checkboxOptions;
    private rangeOption;
    id: string;
    disabled: boolean;
    customClass: string;
    selected: boolean;
    onSelect: EventEmitter<{
        id: string;
        selected: boolean;
    }[]>;
    onRange: EventEmitter<{
        min: number | null;
        max: number | null;
    }>;
    _options: Array<{
        id: string;
        selected: boolean;
    }>;
    constructor(document: Document);
    ngAfterViewInit(): void;
    _onSelect(): void;
    onClear(): void;
    getSelected(): boolean;
    getId(): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterSectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterSectionComponent, "bizy-filter-section", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; "onRange": "onRange"; }, ["rangeOption", "checkboxOptions"], ["[filter-section-title]", "*", "bizy-filter-section-checkbox-option", "bizy-filter-section-range-option"], false, never>;
}
