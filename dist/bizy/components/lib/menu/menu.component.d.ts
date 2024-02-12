import { MenuOptionComponent } from './menu-option/menu-option.component';
import { ChangeDetectorRef, EventEmitter, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MenuComponent {
    #private;
    private ref;
    options: QueryList<MenuOptionComponent>;
    id: string;
    disabled: boolean;
    customClass: string;
    opened: boolean;
    onSelect: EventEmitter<PointerEvent>;
    _menuWidth: number;
    constructor(ref: ChangeDetectorRef);
    _onSelect(event: any): void;
    selectButton(event: any): void;
    close: (event: PointerEvent & {
        target: {
            id: string;
        };
    }) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuComponent, "bizy-menu", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onSelect": "onSelect"; }, ["options"], ["*", "bizy-menu-option"], false, never>;
}
