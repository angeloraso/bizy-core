import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RangeFilterPipe implements PipeTransform {
    transform<T>(items: Array<T>, property: string, range: {
        min: number | null;
        max: number | null;
    }): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RangeFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RangeFilterPipe, "bizyRangeFilter", false>;
}
