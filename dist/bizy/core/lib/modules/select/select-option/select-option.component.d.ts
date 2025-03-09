import { ChangeDetectorRef, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizySelectOptionComponent {
    #private;
    private elementRef;
    private ref;
    id: string;
    disabled: boolean;
    customClass: string;
    onSelect: EventEmitter<void>;
    set selected(selected: boolean);
    get selected$(): Observable<boolean>;
    constructor(elementRef: ElementRef, ref: ChangeDetectorRef);
    _onSelect(): void;
    getId: () => string;
    getSelected: () => boolean;
    getValue: () => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySelectOptionComponent, "bizy-select-option", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelect": "onSelect"; }, never, ["*"], true, never>;
}
