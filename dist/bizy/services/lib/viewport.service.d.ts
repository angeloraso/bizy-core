import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface IViewportSize {
    height: number;
    width: number;
}
export declare class BizyViewportService {
    #private;
    private window;
    get sizeChange$(): Observable<IViewportSize>;
    constructor(window: Window);
    width(): number;
    height(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyViewportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyViewportService>;
}
export {};
