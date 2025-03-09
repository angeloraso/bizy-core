import { ComponentType } from "@angular/cdk/portal";
import { BizyPopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { DialogRef } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
export declare class BizyPopupService {
    #private;
    static dialogs: Set<DialogRef<unknown, BizyPopupWrapperComponent<unknown>>>;
    open<R>(data: {
        component: ComponentType<unknown>;
        data?: unknown;
        customClass?: string;
        disableClose?: boolean;
        id?: string;
    }, callback?: (res: R) => void): void;
    getData<D>(): D;
    close(data?: {
        id?: string;
        response?: unknown;
    }): void;
    closeAll(): void;
    openedPopups(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyPopupService>;
}
