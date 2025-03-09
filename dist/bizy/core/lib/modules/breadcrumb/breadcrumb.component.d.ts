import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { IBizyBreadcrumb } from './breadcrumb.types';
import * as i0 from "@angular/core";
export declare class BizyBreadcrumbComponent {
    private ref;
    onSelect: EventEmitter<IBizyBreadcrumb>;
    _breadcrumbs: Array<IBizyBreadcrumb>;
    showGoBack: boolean;
    constructor(ref: ChangeDetectorRef);
    set breadcrumbs(breadcrumbs: Array<IBizyBreadcrumb>);
    goTo(breadcrumb: IBizyBreadcrumb): void;
    goBack(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyBreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyBreadcrumbComponent, "bizy-breadcrumb", never, { "breadcrumbs": { "alias": "breadcrumbs"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}
