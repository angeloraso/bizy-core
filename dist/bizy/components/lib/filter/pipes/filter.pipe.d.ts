import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyFilterPipe implements PipeTransform {
    transform<T>(items: Array<T>, property: string, states: Array<{
        id: string | number | boolean;
        selected: boolean;
    }>): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyFilterPipe, "bizyFilter", false>;
}
