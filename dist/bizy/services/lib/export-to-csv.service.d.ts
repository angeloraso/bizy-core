import { RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BizyExportToCSVService {
    #private;
    private document;
    private rendererFactory;
    constructor(document: Document, rendererFactory: RendererFactory2);
    toCSV(data: {
        items: Array<unknown>;
        model: Record<string, string>;
        fileName: string;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyExportToCSVService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BizyExportToCSVService>;
}
