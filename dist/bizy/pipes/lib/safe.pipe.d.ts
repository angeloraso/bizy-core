import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class BizySafePipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizySafePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BizySafePipe, "bizySafe", false>;
}
