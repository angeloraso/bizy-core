import { ComponentType } from "@angular/cdk/portal";
import { Subject } from "rxjs";
import { Dialog } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
export declare class PopupService<T, R> {
    #private;
    private dialog;
    closed$: Subject<R>;
    constructor(dialog: Dialog);
    open(data: {
        component: ComponentType<T>;
        data?: unknown;
        customClass?: string;
        disableClose?: boolean;
        id?: string;
    }): void;
    getData<S>(): S;
    close(data?: {
        id?: string;
        data?: R;
    }): void;
    closeAll(): void;
    openedPopups(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopupService<any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PopupService<any, any>>;
}
