import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RouterService {
    private router;
    private _backPath;
    transitionsEnd$: Observable<ActivatedRouteSnapshot>;
    transitionsStart$: Observable<ActivatedRouteSnapshot>;
    constructor(router: Router);
    getURL(): string;
    getBackPath(): string;
    getId(activatedRoute: ActivatedRoute, param: string): string | null;
    getQueryParam(activatedRoute: ActivatedRoute, param: string): string | null;
    goTo(data: {
        path: string;
        params?: Record<string, string>;
    }): void;
    goBack(): void;
    reload(force?: boolean): void;
    private _serialize;
    static ɵfac: i0.ɵɵFactoryDeclaration<RouterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RouterService>;
}
