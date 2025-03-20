import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyKeyboardService {
    #private;
    private document;
    get controlHolding$(): Observable<boolean>;
    constructor(document: Document);
    isShiftHolding(): boolean;
    isControlHolding(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyKeyboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyKeyboardService>;
}
