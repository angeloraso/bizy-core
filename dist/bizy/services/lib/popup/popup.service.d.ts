import { ComponentType } from "@angular/cdk/portal";
import { Dialog } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
export declare class PopupService {
    #private;
    private dialog;
    constructor(dialog: Dialog);
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
    static ɵfac: i0.ɵɵFactoryDeclaration<PopupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PopupService>;
}
