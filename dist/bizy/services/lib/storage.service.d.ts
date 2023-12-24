import * as i0 from "@angular/core";
export declare class StorageService {
    get<T>(key: string): T;
    set(key: string, value: unknown): void;
    remove(key: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StorageService>;
}
