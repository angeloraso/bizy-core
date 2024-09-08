import { AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { BizyInputComponent } from '../input';
import * as i0 from "@angular/core";
export declare class BizyFormComponent implements AfterViewInit, OnDestroy {
    #private;
    private elementRef;
    inputs: QueryList<BizyInputComponent>;
    id: string;
    customClass: string;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFormComponent, "bizy-form", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, {}, ["inputs"], ["*"], false, never>;
}