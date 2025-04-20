import { ComponentType } from "@angular/cdk/portal";
import { DialogRef } from '@angular/cdk/dialog';
import * as i0 from "@angular/core";
export declare class BizyPopupService {
    #private;
    static dialogs: Set<DialogRef<unknown, any>>;
    open<R>(data: {
        component: ComponentType<unknown>;
        data?: unknown;
        customClass?: Array<string> | string;
        fullScreen?: boolean;
        disableClose?: boolean;
        id?: string;
    }, callback?: (res: R) => void): void;
    getData<D>(): D;
    close(data?: {
        id?: string;
        response?: unknown;
    }): Promise<void>;
    closeAll(): void;
    openedPopups(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyPopupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyPopupService>;
}
