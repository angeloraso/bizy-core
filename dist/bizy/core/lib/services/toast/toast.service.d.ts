import { BizyToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
export declare enum TOAST {
    DEFAULT = "default",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger"
}
export declare class BizyToastService {
    #private;
    private dialog;
    static toasts: Set<DialogRef<BizyToastWrapperComponent, unknown>>;
    duration: number;
    defaultSuccessTitle: string;
    defaultDangerTitle: string;
    constructor(dialog: Dialog);
    config(data: {
        defaultSuccessTitle?: string;
        defaultDangerTitle?: string;
        duration?: number;
    }): void;
    default(data: string | {
        title: string;
        msg?: string;
    }): void;
    info(data: string | {
        title: string;
        msg?: string;
    }): void;
    success(data?: string | {
        title: string;
        msg?: string;
    }): void;
    warning(data: string | {
        title: string;
        msg?: string;
    }): void;
    danger(data?: string | {
        title: string;
        msg?: string;
    }): void;
    close: (id: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyToastService>;
}
