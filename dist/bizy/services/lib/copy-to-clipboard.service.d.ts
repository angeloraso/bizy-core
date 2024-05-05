import { Clipboard } from '@angular/cdk/clipboard';
import * as i0 from "@angular/core";
export declare class BizyCopyToClipboardService {
    private clipboard;
    constructor(clipboard: Clipboard);
    copy(data: string | {
        items: Array<unknown>;
        model: Record<string, string>;
    }): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCopyToClipboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyCopyToClipboardService>;
}
