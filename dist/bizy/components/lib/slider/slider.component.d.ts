import { ElementRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SliderComponent {
    fromSlider: ElementRef;
    toSlider: ElementRef;
    minLimit: number;
    maxLimit: number;
    onChange: EventEmitter<{
        min: number;
        max: number;
    }>;
    _min: number;
    _max: number;
    set min(min: number);
    set max(max: number);
    setFromSlider(value: number): void;
    setToSlider(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SliderComponent, "bizy-slider", never, { "minLimit": { "alias": "minLimit"; "required": false; }; "maxLimit": { "alias": "maxLimit"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; }, { "onChange": "onChange"; }, never, never, false, never>;
}
