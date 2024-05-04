import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionSearchOptionComponent {
    id: string;
    value: string | number;
    customClass: string;
    onChange: EventEmitter<string[]>;
    valueChange: EventEmitter<string[]>;
    setValue(value: any): void;
    getId: () => string;
    isActivated: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionSearchOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionSearchOptionComponent, "bizy-filter-section-search-option", never, { "id": { "alias": "id"; "required": false; }; "value": { "alias": "value"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "onChange": "onChange"; "valueChange": "valueChange"; }, never, never, false, never>;
}
