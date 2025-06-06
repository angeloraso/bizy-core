import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { EventEmitter, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyMenuComponent {
    #private;
    options: QueryList<BizyMenuOptionComponent>;
    id: string;
    disabled: boolean;
    offsetX: number;
    offsetY: number;
    customClass: string;
    hideArrow: boolean;
    opened: boolean;
    onSelect: EventEmitter<PointerEvent>;
    _menuWidth: number;
    readonly bizyMenuOptionsId = "bizyMenuOptionsId";
    _onSelect(event: any): void;
    selectButton(event: any): void;
    close: (event: Event & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyMenuComponent, "bizy-menu", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "hideArrow": { "alias": "hideArrow"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onSelect": "onSelect"; }, ["options"], ["*", "bizy-menu-title", "bizy-input", "bizy-menu-option"], true, never>;
}
