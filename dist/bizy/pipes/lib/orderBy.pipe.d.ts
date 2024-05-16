import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyOrderByPipe implements PipeTransform {
    transform<T>(items: Array<T>, order?: 'asc' | 'desc', property?: string, turnOff?: boolean): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyOrderByPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyOrderByPipe, "bizyOrderBy", false>;
}
