import { Observable } from 'rxjs';
import { TemplateRef, ElementRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { BizyTableScrollingDirective } from './table-scrolling.directive';
import * as i0 from "@angular/core";
export declare class BizyTableScrollingComponent<T> {
    #private;
    private elementRef;
    content: TemplateRef<object>;
    items$: Observable<Array<T>>;
    itemTemplate: TemplateRef<BizyTableRowComponent>;
    itemSize: number;
    constructor(elementRef: ElementRef);
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective: BizyTableScrollingDirective<T>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableScrollingComponent<any>, "bizy-table-scrolling", never, {}, {}, never, ["*"], false, never>;
}
