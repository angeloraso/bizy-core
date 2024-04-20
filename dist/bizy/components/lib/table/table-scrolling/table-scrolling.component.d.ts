import { Observable } from 'rxjs';
import { TemplateRef, ElementRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { BizyTableScrollingDirective } from './table-scrolling.directive';
import { IBizyTableRow } from '../table.types';
import * as i0 from "@angular/core";
export declare class BizyTableScrollingComponent {
    #private;
    private elementRef;
    content: TemplateRef<object>;
    items$: Observable<Array<IBizyTableRow>>;
    itemTemplate: TemplateRef<BizyTableRowComponent>;
    itemSize: number;
    constructor(elementRef: ElementRef);
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective: BizyTableScrollingDirective): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableScrollingComponent, "bizy-table-scrolling", never, {}, {}, never, ["*"], false, never>;
}
