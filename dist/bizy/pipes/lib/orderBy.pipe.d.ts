import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyOrderByPipe implements PipeTransform {
    #private;
    transform<T>(items: Array<T>, order?: 'asc' | 'desc' | null, property?: string): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyOrderByPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyOrderByPipe, "bizyOrderBy", false>;
}
