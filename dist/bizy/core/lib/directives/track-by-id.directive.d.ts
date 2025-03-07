import { NgForOf } from '@angular/common';
import * as i0 from "@angular/core";
interface Item {
    id: string;
}
export declare class BizyTrackByIdDirective<T extends Item> {
    private readonly ngFor;
    constructor(ngFor: NgForOf<T>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTrackByIdDirective<any>, [{ host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BizyTrackByIdDirective<any>, "[bizyTrackById]", never, {}, {}, never, never, true, never>;
}
export {};
