import { ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyPopupWrapperComponent<T> {
    #private;
    dynamicComponentContainer: ViewContainerRef;
    disabled: boolean;
    disableClose: boolean;
    disableDrag: boolean;
    position: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    } | null;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadDynamicComponent: () => void;
    close(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupWrapperComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyPopupWrapperComponent<any>, "bizy-popup-wrapper", never, {}, {}, never, never, true, never>;
}
