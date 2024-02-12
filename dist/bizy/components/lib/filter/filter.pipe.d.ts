import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FilterPipe implements PipeTransform {
    transform<T>(items: Array<T>, property: string, states: Array<{
        id: string;
        selected: boolean;
    }>): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterPipe, "bizyFilter", false>;
}
