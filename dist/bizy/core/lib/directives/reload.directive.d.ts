import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyReloadDirective {
    #private;
    threshold: number;
    bizyReload: EventEmitter<void>;
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyReloadDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyReloadDirective, "[bizyReload]", never, { "threshold": { "alias": "threshold"; "required": false; }; }, { "bizyReload": "bizyReload"; }, never, never, true, never>;
}
