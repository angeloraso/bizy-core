import { EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { LabelPosition } from './toggle.types';
import * as i0 from "@angular/core";
export declare class ToggleComponent {
    #private;
    private renderer;
    bizyToggleInput: ElementRef;
    id: string;
    label: string;
    labelPosition: LabelPosition;
    disabled: boolean;
    onSelect: EventEmitter<boolean>;
    valueChange: EventEmitter<boolean>;
    _checked: boolean;
    set checked(checked: boolean);
    ngAfterViewInit(): void;
    constructor(renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleComponent, "bizy-toggle", never, { "id": { "alias": "id"; "required": false; }; "label": { "alias": "label"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; }, { "onSelect": "onSelect"; "valueChange": "valueChange"; }, never, never, false, never>;
}
