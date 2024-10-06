import { BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE } from './formatSeconds.types';
import * as i0 from "@angular/core";
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
