import { TOAST, BizyToastService } from '../toast.service';
import * as i0 from "@angular/core";
export declare class BizyToastWrapperComponent {
    private data;
    private toast;
    type: TOAST;
    title: string;
    msg: string;
    id: string;
    constructor(data: {
        type: TOAST;
        title: string;
        msg: string;
        id: string;
        duration: number;
    }, toast: BizyToastService);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyToastWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyToastWrapperComponent, "bizy-toast-wrapper", never, {}, {}, never, never, true, never>;
}
