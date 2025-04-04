import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BizyRouterService {
    private router;
    static backPath: string;
    transitionsEnd$: Observable<ActivatedRouteSnapshot>;
    transitionsStart$: Observable<ActivatedRouteSnapshot>;
    popStateEvent$: Observable<PopStateEvent>;
    routeChange$: Observable<void>;
    constructor(router: Router);
    getURL(): string;
    getBackPath(): string;
    getId(activatedRoute: ActivatedRoute, param: string): string | null;
    getQueryParam(activatedRoute: ActivatedRoute, param: string): string | null;
    getAllQueryParam(): Record<string, string>;
    goTo(data: {
        path: string;
        params?: Record<string, string>;
        replace?: boolean;
        skip?: boolean;
    }): void;
    goBack(data?: {
        path: string;
    }): void;
    reload(force?: boolean): void;
    private _serialize;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyRouterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyRouterService>;
}
