import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class OrderByPipe implements PipeTransform {
    transform<T>(items: Array<T>, order?: 'asc' | 'desc' | null, property?: string, turnOff?: boolean): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderByPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<OrderByPipe, "bizyOrderBy", false>;
}
