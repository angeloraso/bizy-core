import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class BizyFilterSectionSearchOptionComponent implements OnInit, OnDestroy {
    #private;
    id: string;
    customClass: string;
    onChange: EventEmitter<string[]>;
    searchChange: EventEmitter<string[]>;
    _control: FormControl<string>;
    ngOnInit(): void;
    set search(search: Array<string>);
    getId: () => string;
    isActivated: () => boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterSectionSearchOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterSectionSearchOptionComponent, "bizy-filter-section-search-option", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "search": { "alias": "search"; "required": false; }; }, { "onChange": "onChange"; "searchChange": "searchChange"; }, never, never, false, never>;
}
