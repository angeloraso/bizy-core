import { DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyPopupWrapperComponent<T> {
    private component;
    private dialogRef;
    private ref;
    dynamicComponentContainer: ViewContainerRef;
    constructor(component: ComponentType<T>, dialogRef: DialogRef<void>, ref: ChangeDetectorRef);
    ngAfterViewInit(): void;
    loadDynamicComponent(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPopupWrapperComponent<any>, "bizy-popup-wrapper", never, {}, {}, never, never, false, never>;
}
