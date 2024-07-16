import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFormatSecondsPipe implements PipeTransform {
    transform(seconds: number, language?: 'es' | 'en'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFormatSecondsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyFormatSecondsPipe, "bizyFormatSeconds", false>;
}
