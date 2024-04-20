import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizySelectedPipe implements PipeTransform {
    transform<T>(items: Array<T & {
        selected: boolean;
    }>): Array<T & {
        selected: boolean;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySelectedPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySelectedPipe, "bizySelected", false>;
}
