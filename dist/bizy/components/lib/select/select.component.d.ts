import { SelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectorRef, EventEmitter, QueryList, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SelectComponent implements OnInit {
    #private;
    private ref;
    private document;
    options: QueryList<SelectOptionComponent>;
    id: string;
    disabled: boolean;
    label: string;
    customClass: string;
    opened: boolean;
    onSelect: EventEmitter<string | number>;
    valueChange: EventEmitter<string | number>;
    onOpen: EventEmitter<PointerEvent>;
    set value(value: string | number);
    _selectWidth: number;
    _value: string | number;
    _optionValue: string;
    constructor(ref: ChangeDetectorRef, document: Document);
    ngOnInit(): void;
    _onOpen(event: any): void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectComponent, "bizy-select", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "onSelect": "onSelect"; "valueChange": "valueChange"; "onOpen": "onOpen"; }, ["options"], ["bizy-search-input", "bizy-select-option"], false, never>;
}
