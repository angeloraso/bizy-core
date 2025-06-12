import { ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFullScreenPopupWrapperComponent<T> {
    #private;
    dynamicComponentContainer: ViewContainerRef;
    disabled: boolean;
    disableClose: boolean;
    disableDrag: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadDynamicComponent: () => void;
    close(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFullScreenPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyFullScreenPopupWrapperComponent<any>, "bizy-full-screen-popup-wrapper", never, {}, {}, never, never, true, never>;
}
