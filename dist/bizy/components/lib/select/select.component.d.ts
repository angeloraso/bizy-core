import { BizySelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectorRef, EventEmitter, QueryList, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizySelectComponent implements AfterViewInit {
    #private;
    private ref;
    private document;
    options: QueryList<BizySelectOptionComponent>;
    id: string;
    disabled: boolean;
    label: string;
    customClass: string;
    opened: boolean;
    onOpen: EventEmitter<PointerEvent>;
    _selectWidth: number;
    _optionValue: string;
    constructor(ref: ChangeDetectorRef, document: Document);
    ngAfterViewInit(): void;
    _onOpen(event: any): void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySelectComponent, "bizy-select", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onOpen": "onOpen"; }, ["options"], ["bizy-input", "bizy-select-option"], false, never>;
}
