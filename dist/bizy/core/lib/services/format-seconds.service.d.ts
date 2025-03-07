import * as i0 from "@angular/core";
export declare enum BIZY_FORMAT_SECONDS_LANGUAGE {
    SPANISH = "es",
    ENGLISH = "en"
}
export declare enum BIZY_FORMAT_SECONDS_FORMAT {
    DATE_TIME = "date-time",
    TIME = "time"
}
export declare class BizyFormatSecondsService {
    #private;
    getOptions(): {
        language: BIZY_FORMAT_SECONDS_LANGUAGE;
        format: BIZY_FORMAT_SECONDS_FORMAT;
    };
    setOptions(options: {
        language?: BIZY_FORMAT_SECONDS_LANGUAGE;
        format?: BIZY_FORMAT_SECONDS_FORMAT;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormatSecondsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyFormatSecondsService>;
}
