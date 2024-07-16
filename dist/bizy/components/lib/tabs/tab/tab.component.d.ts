import { ElementRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTabComponent {
    elementRef: ElementRef;
    id: string;
    disabled: boolean;
    selected: boolean;
    linePosition: 'bottom' | 'top';
    customClass: string;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    constructor(elementRef: ElementRef);
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabComponent, "bizy-tab", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "linePosition": { "alias": "linePosition"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
