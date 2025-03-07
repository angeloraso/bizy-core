import { PipeTransform } from '@angular/core';
import { BizyTranslateService } from '../services/translate';
import * as i0 from "@angular/core";
export declare class BizyTranslatePipe implements PipeTransform {
    private translate;
    constructor(translate: BizyTranslateService);
    transform(label: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizyTranslatePipe, "translate", true>;
}
