import { PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';
import * as i0 from "@angular/core";
export declare class TranslatePipe implements PipeTransform {
    private translate;
    constructor(translate: TranslateService);
    transform(label: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslatePipe, "translate", false>;
}
