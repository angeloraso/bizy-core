import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class LongPressDirective implements OnDestroy {
    #private;
    private elementRef;
    threshold: number;
    press: EventEmitter<void>;
    constructor(elementRef: ElementRef);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LongPressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LongPressDirective, "[bizyLongPress]", never, { "threshold": { "alias": "threshold"; "required": false; }; }, { "press": "press"; }, never, never, false, never>;
}
