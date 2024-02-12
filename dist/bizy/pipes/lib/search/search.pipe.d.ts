import { IFuseOptions } from './search.model';
import { PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';
import * as i0 from "@angular/core";
export declare class SearchPipe implements PipeTransform {
    fuseOptions: IFuseOptions;
    fuse: Fuse<any>;
    elements: Array<unknown>;
    searchIsText: boolean;
    readonly perfectMatch: {
        ignoreLocation: boolean;
        threshold: number;
    };
    transform<T>(elements: Array<T>, search: Array<string>, keys?: Array<string>, options?: IFuseOptions): Array<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SearchPipe, "bizySearch", false>;
}
