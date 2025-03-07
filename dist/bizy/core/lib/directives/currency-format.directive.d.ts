import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import AutoNumeric from 'autonumeric';
import * as i0 from "@angular/core";
export declare class BizyCurrencyFormatDirective implements OnInit, OnDestroy {
    #private;
    private elementRef;
    bizyCurrencyFormat: boolean;
    options: AutoNumeric.Options;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getValue: () => number;
    setValue: (value: number) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCurrencyFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyCurrencyFormatDirective, "[bizyCurrencyFormat]", never, { "bizyCurrencyFormat": { "alias": "bizyCurrencyFormat"; "required": false; }; "options": { "alias": "bizyCurrencyOptions"; "required": false; }; }, {}, never, never, true, never>;
}
