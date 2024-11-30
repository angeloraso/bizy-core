import { Observable } from 'rxjs';
import { TemplateRef, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { BizyTableScrollingDirective } from './table-scrolling.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
export declare class BizyTableScrollingComponent implements OnDestroy {
    #private;
    private document;
    elementRef: ElementRef;
    ref: ChangeDetectorRef;
    viewport: CdkVirtualScrollViewport;
    content: TemplateRef<object>;
    items$: Observable<Array<unknown>>;
    itemTemplate: TemplateRef<BizyTableRowComponent>;
    itemSize: number;
    constructor(document: Document, elementRef: ElementRef, ref: ChangeDetectorRef);
    /** Called by the virtual-for directive inside of the viewport. */
    attachView(tableDirective: BizyTableScrollingDirective): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BizyTableScrollingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BizyTableScrollingComponent, "bizy-table-scrolling", never, {}, {}, never, ["*"], false, never>;
}
