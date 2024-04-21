import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyTabComponent {
    private ref;
    id: string;
    disabled: boolean;
    linePosition: 'bottom' | 'top';
    customClass: string;
    selected: boolean;
    selectedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<void>;
    constructor(ref: ChangeDetectorRef);
    _onSelect(): void;
    setSelected: (selected: boolean) => void;
    getId: () => string;
    getSelected: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTabComponent, "bizy-tab", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "linePosition": { "alias": "linePosition"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "selectedChange": "selectedChange"; "onSelect": "onSelect"; }, never, ["*"], false, never>;
}
