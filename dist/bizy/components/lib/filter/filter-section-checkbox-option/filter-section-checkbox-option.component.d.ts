import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionCheckboxOptionComponent {
    private ref;
    id: string | number | boolean;
    disabled: boolean;
    customClass: string;
    onChange: EventEmitter<boolean>;
    set selected(selected: boolean);
    _selected: boolean;
    constructor(ref: ChangeDetectorRef);
    onSelect: (selected: boolean) => void;
    getSelected: () => boolean;
    getId: () => string | number | boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionCheckboxOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionCheckboxOptionComponent, "bizy-filter-section-checkbox-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onChange": "onChange"; }, never, ["*"], false, never>;
}
