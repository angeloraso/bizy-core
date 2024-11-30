import { Component, Input, ChangeDetectionStrategy, ContentChild, Inject, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { BizyGridForDirective } from './grid.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "./grid-row/grid-row.component";
export class BizyGridComponent {
    ref;
    document;
    renderer;
    elementRef;
    content;
    gridDirective;
    resizeRef = null;
    #rowScrollingMutationObserver;
    #resizeObserver;
    #subscription = new Subscription();
    #view;
    notifier$ = new Subject();
    rowHeight = 100;
    itemRows = [];
    items = [];
    itemTemplate;
    itemsPerRow = 1;
    constructor(ref, document, renderer, elementRef) {
        this.ref = ref;
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.gridDirective) {
                return;
            }
            this.#subscription.add(this.gridDirective.items$.subscribe(items => {
                if (this.items.length === 0 && items.length === 0) {
                    return;
                }
                this.items = items;
                this.#updateView();
                if (!this.#view) {
                    this.#view = this.gridDirective.viewContainerRef;
                    this.#view.createEmbeddedView(this.content);
                }
            }));
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(debounceTime(50)).subscribe(() => {
            this.#updateView();
        }));
    }
    #updateView = () => {
        this.itemTemplate = this.gridDirective.templateRef;
        const rowWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
        let columnWidth = 100;
        const fontSize = Number(getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size').split('px')[0]);
        const rowHeightParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-row-height');
        if (rowHeightParameter && rowHeightParameter.includes('rem')) {
            this.rowHeight = fontSize * Number(rowHeightParameter.split('rem')[0]);
        }
        else if (rowHeightParameter && rowHeightParameter.includes('px')) {
            this.rowHeight = Number(rowHeightParameter.split('px')[0]);
        }
        let gap = 10;
        const gapParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-gap');
        if (gapParameter && gapParameter.includes('rem')) {
            gap = fontSize * Number(gapParameter.split('rem')[0]);
        }
        else if (gapParameter && gapParameter.includes('px')) {
            gap = Number(gapParameter.split('px')[0]);
        }
        const columnWidthParameter = getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--bizy-grid-column-width');
        if (columnWidthParameter && columnWidthParameter.includes('rem')) {
            columnWidth = fontSize * Number(columnWidthParameter.split('rem')[0]);
        }
        else if (columnWidthParameter && columnWidthParameter.includes('px')) {
            columnWidth = Number(columnWidthParameter.split('px')[0]);
        }
        columnWidth += gap;
        const count = Math.trunc(rowWidth / (columnWidth));
        if (Math.round((gap * (count - 1)) + (columnWidth * count)) <= (rowWidth)) {
            this.itemsPerRow = count <= 0 ? 1 : count;
        }
        else {
            this.itemsPerRow = (count - 1) <= 0 ? 1 : count - 1;
        }
        const itemRows = [];
        for (let i = 0; i < this.items.length; i += this.itemsPerRow) {
            const row = this.items.slice(i, i + this.itemsPerRow);
            itemRows.push(row);
        }
        this.itemRows = itemRows;
        this.ref.detectChanges();
    };
    trackById(index, item) {
        return item?.id ?? index;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: Renderer2 }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridComponent, selector: "bizy-grid", inputs: { resizeRef: "resizeRef" }, queries: [{ propertyName: "gridDirective", first: true, predicate: BizyGridForDirective, descendants: true }], viewQueries: [{ propertyName: "content", first: true, predicate: ["gridScrollingContent"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-grid\" [ngClass]=\"{'bizy-grid--empty': items && items.length === 0}\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 5)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 10)\">\n\n        <ng-content></ng-content>\n        \n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item; trackBy: trackById\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n</div>\n", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}:host:has(.bizy-grid--empty){height:0!important;min-height:0!important;max-height:0!important}.bizy-grid{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-grid-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: i3.BizyGridRowComponent, selector: "bizy-grid-row", inputs: ["rowHeight", "itemsPerRow"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-grid\" [ngClass]=\"{'bizy-grid--empty': items && items.length === 0}\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 5)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 10)\">\n\n        <ng-content></ng-content>\n        \n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item; trackBy: trackById\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n</div>\n", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}:host:has(.bizy-grid--empty){height:0!important;min-height:0!important;max-height:0!important}.bizy-grid{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb:hover{background-color:var(--bizy-grid-scroll-bar-hover-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['gridScrollingContent']
            }], gridDirective: [{
                type: ContentChild,
                args: [BizyGridForDirective]
            }], resizeRef: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZ3JpZC9ncmlkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9ncmlkL2dyaWQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLFNBQVMsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDdE0sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFReEQsTUFBTSxPQUFPLGlCQUFpQjtJQWtCUztJQUNUO0lBQ0M7SUFDQztJQXBCSyxPQUFPLENBQXNCO0lBQzVCLGFBQWEsQ0FBdUI7SUFDL0QsU0FBUyxHQUFzQixJQUFJLENBQUM7SUFFN0MsNkJBQTZCLENBQW1CO0lBQ2hELGVBQWUsQ0FBaUI7SUFDaEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkMsS0FBSyxDQUFtQjtJQUN4QixTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVoQyxTQUFTLEdBQVcsR0FBRyxDQUFDO0lBQ3hCLFFBQVEsR0FBMEIsRUFBRSxDQUFDO0lBQ3JDLEtBQUssR0FBbUIsRUFBRSxDQUFDO0lBQzNCLFlBQVksQ0FBdUI7SUFDbkMsV0FBVyxHQUFXLENBQUMsQ0FBQztJQUV4QixZQUNxQyxHQUFzQixFQUMvQixRQUFrQixFQUNqQixRQUFtQixF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Uzs7MEJBQ2hCLE1BQU07MkJBQUMsVUFBVTs0Q0FwQmUsT0FBTztzQkFBekMsU0FBUzt1QkFBQyxzQkFBc0I7Z0JBQ0csYUFBYTtzQkFBaEQsWUFBWTt1QkFBQyxvQkFBb0I7Z0JBQ3pCLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29udGVudENoaWxkLCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5R3JpZEZvckRpcmVjdGl2ZSB9IGZyb20gJy4vZ3JpZC5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQFZpZXdDaGlsZCgnZ3JpZFNjcm9sbGluZ0NvbnRlbnQnKSBjb250ZW50OiBUZW1wbGF0ZVJlZjxvYmplY3Q+O1xuICBAQ29udGVudENoaWxkKEJpenlHcmlkRm9yRGlyZWN0aXZlKSBncmlkRGlyZWN0aXZlOiBCaXp5R3JpZEZvckRpcmVjdGl2ZTtcbiAgQElucHV0KCkgcmVzaXplUmVmOiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG5cbiAgI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICN2aWV3OiBWaWV3Q29udGFpbmVyUmVmO1xuICBub3RpZmllciQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBcbiAgcm93SGVpZ2h0OiBudW1iZXIgPSAxMDA7XG4gIGl0ZW1Sb3dzOiBBcnJheTxBcnJheTx1bmtub3duPj4gPSBbXTtcbiAgaXRlbXM6IEFycmF5PHVua25vd24+ID0gW107XG4gIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8dW5rbm93bj47XG4gIGl0ZW1zUGVyUm93OiBudW1iZXIgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5ncmlkRGlyZWN0aXZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmdyaWREaXJlY3RpdmUuaXRlbXMkLnN1YnNjcmliZShpdGVtcyA9PiB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCAmJiBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuI3VwZGF0ZVZpZXcoKTtcblxuICAgICAgICBpZiAoIXRoaXMuI3ZpZXcpIHtcbiAgICAgICAgICB0aGlzLiN2aWV3ID0gdGhpcy5ncmlkRGlyZWN0aXZlLnZpZXdDb250YWluZXJSZWY7XG4gICAgICAgICAgdGhpcy4jdmlldy5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblxuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG5cbiAgICB0aGlzLiNyZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLm5vdGlmaWVyJC5uZXh0KCkpO1xuICAgIGNvbnN0IHJlc2l6ZVJlZiA9IHRoaXMucmVzaXplUmVmID8gdGhpcy5yZXNpemVSZWYgOiB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpID8gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUocmVzaXplUmVmKTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubm90aWZpZXIkLnBpcGUoZGVib3VuY2VUaW1lKDUwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuI3VwZGF0ZVZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICAjdXBkYXRlVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IHRoaXMuZ3JpZERpcmVjdGl2ZS50ZW1wbGF0ZVJlZjtcbiAgICBjb25zdCByb3dXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGNvbHVtbldpZHRoID0gMTAwO1xuICAgIGNvbnN0IGZvbnRTaXplID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpLnNwbGl0KCdweCcpWzBdKTtcblxuICAgIGNvbnN0IHJvd0hlaWdodFBhcmFtZXRlciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1ncmlkLXJvdy1oZWlnaHQnKTtcbiAgICBpZiAocm93SGVpZ2h0UGFyYW1ldGVyICYmIHJvd0hlaWdodFBhcmFtZXRlci5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgIHRoaXMucm93SGVpZ2h0ID0gZm9udFNpemUgKiBOdW1iZXIocm93SGVpZ2h0UGFyYW1ldGVyLnNwbGl0KCdyZW0nKVswXSk7XG4gICAgfSBlbHNlIGlmIChyb3dIZWlnaHRQYXJhbWV0ZXIgJiYgcm93SGVpZ2h0UGFyYW1ldGVyLmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICB0aGlzLnJvd0hlaWdodCA9IE51bWJlcihyb3dIZWlnaHRQYXJhbWV0ZXIuc3BsaXQoJ3B4JylbMF0pO1xuICAgIH1cblxuICAgIGxldCBnYXAgPSAxMDtcbiAgICBjb25zdCBnYXBQYXJhbWV0ZXIgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktZ3JpZC1nYXAnKTtcbiAgICBpZiAoZ2FwUGFyYW1ldGVyICYmIGdhcFBhcmFtZXRlci5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgIGdhcCA9IGZvbnRTaXplICogTnVtYmVyKGdhcFBhcmFtZXRlci5zcGxpdCgncmVtJylbMF0pO1xuICAgIH0gZWxzZSBpZiAoZ2FwUGFyYW1ldGVyICYmIGdhcFBhcmFtZXRlci5pbmNsdWRlcygncHgnKSkge1xuICAgICAgZ2FwID0gTnVtYmVyKGdhcFBhcmFtZXRlci5zcGxpdCgncHgnKVswXSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29sdW1uV2lkdGhQYXJhbWV0ZXIgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktZ3JpZC1jb2x1bW4td2lkdGgnKTtcbiAgICBpZiAoY29sdW1uV2lkdGhQYXJhbWV0ZXIgJiYgY29sdW1uV2lkdGhQYXJhbWV0ZXIuaW5jbHVkZXMoJ3JlbScpKSB7XG4gICAgICBjb2x1bW5XaWR0aCA9IGZvbnRTaXplICogTnVtYmVyKGNvbHVtbldpZHRoUGFyYW1ldGVyLnNwbGl0KCdyZW0nKVswXSk7XG4gICAgfSBlbHNlIGlmIChjb2x1bW5XaWR0aFBhcmFtZXRlciAmJiBjb2x1bW5XaWR0aFBhcmFtZXRlci5pbmNsdWRlcygncHgnKSkge1xuICAgICAgY29sdW1uV2lkdGggPSBOdW1iZXIoY29sdW1uV2lkdGhQYXJhbWV0ZXIuc3BsaXQoJ3B4JylbMF0pO1xuICAgIH1cblxuICAgIGNvbHVtbldpZHRoICs9IGdhcDtcblxuICAgIGNvbnN0IGNvdW50ID0gTWF0aC50cnVuYyhyb3dXaWR0aCAvIChjb2x1bW5XaWR0aCkpO1xuICAgIGlmIChNYXRoLnJvdW5kKChnYXAgKiAoY291bnQgLSAxKSkgKyAoY29sdW1uV2lkdGggKiBjb3VudCkpIDw9IChyb3dXaWR0aCkpIHtcbiAgICAgIHRoaXMuaXRlbXNQZXJSb3cgPSBjb3VudCA8PSAwID8gMSA6IGNvdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zUGVyUm93ID0gKGNvdW50IC0gMSkgPD0gMCA/IDEgOiBjb3VudCAtIDE7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbVJvd3M6IEFycmF5PEFycmF5PHVua25vd24+PiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkgKz0gdGhpcy5pdGVtc1BlclJvdykge1xuICAgICAgY29uc3Qgcm93OiBBcnJheTx1bmtub3duPiA9IHRoaXMuaXRlbXMuc2xpY2UoaSwgaSArIHRoaXMuaXRlbXNQZXJSb3cpO1xuICAgICAgaXRlbVJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHRoaXMuaXRlbVJvd3MgPSBpdGVtUm93cztcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KTogYW55IHtcbiAgICByZXR1cm4gaXRlbT8uaWQgPz8gaW5kZXg7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIGlmICh0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LWdyaWRcIiBbbmdDbGFzc109XCJ7J2JpenktZ3JpZC0tZW1wdHknOiBpdGVtcyAmJiBpdGVtcy5sZW5ndGggPT09IDB9XCI+XG5cbiAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0XG4gICAgICAgIGNsYXNzPVwiYml6eS1ncmlkX19yb3dzXCJcbiAgICAgICAgW2l0ZW1TaXplXT1cInJvd0hlaWdodFwiXG4gICAgICAgIFttaW5CdWZmZXJQeF09XCJyb3dIZWlnaHQgKyAocm93SGVpZ2h0ICogNSlcIlxuICAgICAgICBbbWF4QnVmZmVyUHhdPVwicm93SGVpZ2h0ICsgKHJvd0hlaWdodCAqIDEwKVwiPlxuXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JpZFNjcm9sbGluZ0NvbnRlbnQ+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gY2RrVmlydHVhbEZvciBbY2RrVmlydHVhbEZvck9mXT1cIml0ZW1Sb3dzXCI+XG4gICAgICAgICAgICAgICAgPGJpenktZ3JpZC1yb3cgW3Jvd0hlaWdodF09XCJyb3dIZWlnaHRcIiBbaXRlbXNQZXJSb3ddPVwiaXRlbXNQZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXQgb2YgaXRlbTsgdHJhY2tCeTogdHJhY2tCeUlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9iaXp5LWdyaWQtcm93PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cblxuPC9kaXY+XG4iXX0=