import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFilterComponent {
    #private;
    private document;
    private ref;
    private sections;
    id: string;
    disabled: boolean;
    customClass: string;
    opened: boolean;
    onOpen: EventEmitter<PointerEvent>;
    onChange: EventEmitter<boolean>;
    _filterWidth: number;
    _activated: boolean;
    constructor(document: Document, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    _onOpen: (event: any) => void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFilterComponent, "bizy-filter", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onOpen": "onOpen"; "onChange": "onChange"; }, ["sections"], ["*", "bizy-filter-section", "bizy-filter-content"], false, never>;
}
