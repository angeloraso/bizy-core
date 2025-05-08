import { ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyPopupWrapperComponent<T> {
    #private;
    dynamicComponentContainer: ViewContainerRef;
    disabled: boolean;
    disableClose: boolean;
    disableDrag: boolean;
    ngAfterViewInit(): void;
    loadDynamicComponent(): void;
    close(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPopupWrapperComponent<any>, "bizy-popup-wrapper", never, {}, {}, never, never, true, never>;
}
