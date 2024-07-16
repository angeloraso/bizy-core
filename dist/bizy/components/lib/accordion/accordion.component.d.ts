import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyAccordionComponent {
    private ref;
    id: string;
    customClass: string;
    disabled: boolean;
    opened: boolean;
    openedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: PointerEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyAccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyAccordionComponent, "bizy-accordion", never, { "id": { "alias": "id"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "openedChange": "openedChange"; "onSelect": "onSelect"; }, never, ["*", "[accordion-option]"], false, never>;
}
