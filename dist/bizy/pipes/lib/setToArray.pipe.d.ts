import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizySetToArrayPipe implements PipeTransform {
    transform<T>(items: Set<T>): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySetToArrayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySetToArrayPipe, "bizySetToArray", false>;
}
