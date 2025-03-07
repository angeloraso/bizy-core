import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionRangeOptionComponent {
    #private;
    private fb;
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    onChange: EventEmitter<{
        min: number | null;
        max: number | null;
    }>;
    _minLimit: number;
    _maxLimit: number;
    get activated$(): Observable<boolean>;
    form: FormGroup;
    set min(min: number | null);
    set max(max: number | null);
    set minLimit(min: number | null);
    set maxLimit(max: number | null);
    constructor(fb: FormBuilder, ref: ChangeDetectorRef);
    setMinValue(value: number | string): void;
    setMaxValue(value: number | string | null): void;
    get minValue(): AbstractControl<number | string>;
    get maxValue(): AbstractControl<number | string>;
    onClean: () => void;
    getId: () => string;
    isActivated: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionRangeOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionRangeOptionComponent, "bizy-filter-section-range-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "minLimit": { "alias": "minLimit"; "required": false; }; "maxLimit": { "alias": "maxLimit"; "required": false; }; }, { "onChange": "onChange"; }, never, ["[slot=min-header]", "[slot=max-header]"], true, never>;
}
