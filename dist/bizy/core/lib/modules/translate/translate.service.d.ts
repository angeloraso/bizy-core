import * as i0 from "@angular/core";
export declare enum LANGUAGE {
    SPANISH = "es",
    ENGLISH = "en"
}
export interface ILocale {
    lang: LANGUAGE;
    translations: Record<string, unknown>;
}
export declare class BizyTranslateService {
    #private;
    loadTranslations(...args: ILocale[]): void;
    addLangs(langs: Array<LANGUAGE>): void;
    getLangs(): Array<LANGUAGE>;
    setDefault(lang: LANGUAGE): void;
    getCurrentLang(): LANGUAGE;
    use(lang: LANGUAGE): void;
    get(translation: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTranslateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyTranslateService>;
}
