import { Dialog } from '@angular/cdk/dialog';
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
    constructor(dialog: Dialog);
    default(data: {
        title?: string;
        msg?: string;
    }): void;
    info(data: {
        title?: string;
        msg?: string;
    }): void;
    success(data: {
        title?: string;
        msg?: string;
    }): void;
    warning(data: {
        title?: string;
        msg?: string;
    }): void;
    danger(data: {
        title?: string;
        msg?: string;
    }): void;
    close: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyToastService>;
}
