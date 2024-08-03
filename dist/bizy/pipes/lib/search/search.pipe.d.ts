import { IFuseOptions } from './search.model';
import { PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';
import * as i0 from "@angular/core";
export declare class BizySearchPipe implements PipeTransform {
    #private;
    fuseOptions: IFuseOptions;
    fuse: Fuse<any>;
    items: Array<unknown>;
    readonly perfectMatch: {
        threshold: number;
    };
    transform<T>(items: Array<T>, search: string | number | Array<string | number>, keys?: string | Array<string>, options?: IFuseOptions): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySearchPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySearchPipe, "bizySearch", false>;
}
