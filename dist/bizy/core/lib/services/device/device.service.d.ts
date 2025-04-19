import * as i0 from "@angular/core";
export declare class BizyDeviceService {
    #private;
    getUserAgent(): Promise<string>;
    isMobile: () => boolean;
    isTablet: () => boolean;
    isDesktop: () => boolean;
    isPortrait: () => boolean;
    isLandscape: () => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyDeviceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyDeviceService>;
}
