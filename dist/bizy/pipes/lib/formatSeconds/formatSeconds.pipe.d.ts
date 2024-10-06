import { PipeTransform } from '@angular/core';
import { BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE } from './formatSeconds.types';
import { BizyFormatSecondsService } from './formatSeconds.service';
import * as i0 from "@angular/core";
export declare class BizyFormatSecondsPipe implements PipeTransform {
    private bizyFormatSecondsService;
    constructor(bizyFormatSecondsService: BizyFormatSecondsService);
    transform(seconds: number, options?: {
        format: BIZY_FORMAT_SECONDS_FORMAT;
        language: BIZY_FORMAT_SECONDS_LANGUAGE;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormatSecondsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyFormatSecondsPipe, "bizyFormatSeconds", false>;
}
