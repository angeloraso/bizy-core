import { NgForOf } from '@angular/common';
import * as i0 from "@angular/core";
interface Item {
    id: string;
}
export declare class BizyNgForTrackByIdDirective<T extends Item> {
    private readonly ngFor;
    constructor(ngFor: NgForOf<T>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyNgForTrackByIdDirective<any>, [{ host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyNgForTrackByIdDirective<any>, "[ngForBizyTrackById]", never, {}, {}, never, never, false, never>;
}
export {};
