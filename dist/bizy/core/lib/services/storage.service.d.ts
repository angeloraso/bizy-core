import * as i0 from "@angular/core";
export declare class BizyStorageService {
    get<T>(key: string): T;
    set(key: string, value: unknown): void;
    remove(key: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyStorageService>;
}
