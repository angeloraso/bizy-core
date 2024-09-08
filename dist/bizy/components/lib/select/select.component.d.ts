import { BizySelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectorRef, EventEmitter, QueryList, AfterViewInit, TemplateRef } from '@angular/core';
import { BizyInputComponent } from '../input';
import { Portal, TemplatePortal } from '@angular/cdk/portal';
import * as i0 from "@angular/core";
export declare class BizySelectComponent implements AfterViewInit {
    #private;
    private ref;
    templatePortalContent: TemplateRef<unknown>;
    options: QueryList<BizySelectOptionComponent>;
    bizyInput: BizyInputComponent;
    id: string;
    disabled: boolean;
    customClass: string;
    opened: boolean;
    openedChange: EventEmitter<boolean>;
    onSelect: EventEmitter<PointerEvent>;
    onOpen: EventEmitter<boolean>;
    _optionValue: string;
    touched: boolean;
    optionPortal: Portal<any>;
    templatePortal: TemplatePortal<any> | null;
    constructor(ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    _onOpen(event: PointerEvent): void;
    close: (event?: PointerEvent & {
        target: {
            id: string;
        };
    }, select?: BizyInputComponent) => void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizySelectComponent, "bizy-select", never, { "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "openedChange": "openedChange"; "onSelect": "onSelect"; "onOpen": "onOpen"; }, ["bizyInput", "options"], ["[slot=header]", "[slot=prefix]", "[slot=error]", "bizy-select-option", "bizy-input"], false, never>;
}
