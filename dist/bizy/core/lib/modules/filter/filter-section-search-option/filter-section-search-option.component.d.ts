import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionSearchOptionComponent {
    #private;
    private ref;
    id: string;
    customClass: string;
    valueChange: EventEmitter<string>;
    onChange: EventEmitter<string>;
    _value: string;
    get activated$(): Observable<boolean>;
    set value(value: string);
    constructor(ref: ChangeDetectorRef);
    _onChange(value: string): void;
    getId: () => string;
    getValue: () => string;
    isActivated: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionSearchOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionSearchOptionComponent, "bizy-filter-section-search-option", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "onChange": "onChange"; }, never, ["[slot=prefix]", "[slot=suffix]"], true, never>;
}
