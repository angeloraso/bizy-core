import { BizyRouterService } from './router.service';
import * as i0 from "@angular/core";
export declare class BizyCacheService {
    private router;
    readonly CACHE_PREFIX = "BIZY-CACHE";
    constructor(router: BizyRouterService);
    getData<T>(key?: string): T;
    setData<T>(value: T, key?: string, expiresAt?: number): void;
    remove(key?: string): void;
    removeAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyCacheService>;
}
