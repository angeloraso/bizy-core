import { BizyToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { DialogRef } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
export declare enum TOAST {
    DEBUG = "debug",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger"
}
export declare class BizyToastService {
    #private;
    static toasts: Set<DialogRef<BizyToastWrapperComponent, unknown>>;
    duration: number;
    defaultDebugTitle: string;
    defaultInfoTitle: string;
    defaultSuccessTitle: string;
    defaultWarningTitle: string;
    defaultDangerTitle: string;
    config(data: {
        defaultDebugTitle?: string;
        defaultInfoTitle?: string;
        defaultSuccessTitle?: string;
        defaultWarningTitle?: string;
        defaultDangerTitle?: string;
        duration?: number;
    }): void;
    debug(data: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    info(data: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    success(data?: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    warning(data: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    danger(data?: string | {
        title: string;
        msg?: string;
        duration?: number;
    }): void;
    close: (id: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyToastService>;
}
