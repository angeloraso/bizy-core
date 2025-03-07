import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyKeyboardService {
    #private;
    private document;
    get shiftHolding$(): Observable<boolean>;
    constructor(document: Document);
    isShiftHolding(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyKeyboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyKeyboardService>;
}
