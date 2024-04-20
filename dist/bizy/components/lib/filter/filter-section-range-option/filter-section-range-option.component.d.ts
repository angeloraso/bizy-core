import { EventEmitter, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionRangeOptionComponent implements AfterViewInit {
    #private;
    private fb;
    id: string;
    disabled: boolean;
    minLabel: string;
    maxLabel: string;
    customClass: string;
    onChange: EventEmitter<{
        min: number | null;
        max: number | null;
    }>;
    _minLimit: number;
    _maxLimit: number;
    form: FormGroup;
    set min(min: number | null);
    set max(max: number | null);
    set minLimit(min: number | null);
    set maxLimit(max: number | null);
    constructor(fb: FormBuilder);
    ngAfterViewInit(): void;
    get minValue(): AbstractControl<number | string>;
    get maxValue(): AbstractControl<number | string>;
    onClear: () => void;
    getId: () => string;
    isActivated: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionRangeOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionRangeOptionComponent, "bizy-filter-section-range-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "minLabel": { "alias": "minLabel"; "required": false; }; "maxLabel": { "alias": "maxLabel"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "minLimit": { "alias": "minLimit"; "required": false; }; "maxLimit": { "alias": "maxLimit"; "required": false; }; }, { "onChange": "onChange"; }, never, never, false, never>;
}
