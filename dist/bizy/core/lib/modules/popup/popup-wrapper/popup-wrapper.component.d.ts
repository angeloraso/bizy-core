import { ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyPopupWrapperComponent<T> {
    #private;
    dynamicComponentContainer: ViewContainerRef;
    ngAfterViewInit(): void;
    loadDynamicComponent(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPopupWrapperComponent<any>, "bizy-popup-wrapper", never, {}, {}, never, never, true, never>;
}
