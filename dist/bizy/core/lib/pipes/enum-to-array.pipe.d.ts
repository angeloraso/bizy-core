import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyEnumToArrayPipe implements PipeTransform {
    transform(enumObj: any): {
        key: string;
        value: any;
    }[];
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyEnumToArrayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyEnumToArrayPipe, "bizyEnumToArray", true>;
}
