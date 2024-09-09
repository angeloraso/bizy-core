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
            this.itemsPerRow = count;
        }
        else {
            this.itemsPerRow = count - 1;
        }
        const itemRows = [];
        for (let i = 0; i < this.items.length; i += this.itemsPerRow) {
            const row = this.items.slice(i, i + this.itemsPerRow);
            itemRows.push(row);
        }
        this.itemRows = itemRows;
        this.ref.detectChanges();
    };
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyGridComponent, selector: "bizy-grid", inputs: { resizeRef: "resizeRef" }, queries: [{ propertyName: "gridDirective", first: true, predicate: BizyGridForDirective, descendants: true }], viewQueries: [{ propertyName: "content", first: true, predicate: ["gridScrollingContent"], descendants: true }], ngImport: i0, template: "<div class=\"bizy-grid\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        *ngIf=\"items && items.length > 0\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 20)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 40)\">\n        \n        <ng-content></ng-content>\n\n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n    <span *ngIf=\"!items || items.length === 0\">\n        <ng-content select=\"[slot=empty]\"></ng-content>\n    </span>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}.bizy-grid{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: i3.BizyGridRowComponent, selector: "bizy-grid-row", inputs: ["rowHeight", "itemsPerRow"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-grid\">\n\n    <cdk-virtual-scroll-viewport\n        class=\"bizy-grid__rows\"\n        *ngIf=\"items && items.length > 0\"\n        [itemSize]=\"rowHeight\"\n        [minBufferPx]=\"rowHeight + (rowHeight * 20)\"\n        [maxBufferPx]=\"rowHeight + (rowHeight * 40)\">\n        \n        <ng-content></ng-content>\n\n        <ng-template #gridScrollingContent>\n            <ng-template let-item cdkVirtualFor [cdkVirtualForOf]=\"itemRows\">\n                <bizy-grid-row [rowHeight]=\"rowHeight\" [itemsPerRow]=\"itemsPerRow\">\n                    <ng-container *ngFor=\"let it of item\">\n                        <ng-template *ngTemplateOutlet=\"itemTemplate; context: { $implicit: it }\"></ng-template>\n                    </ng-container>\n                </bizy-grid-row>\n            </ng-template>\n        </ng-template>\n    </cdk-virtual-scroll-viewport>\n\n    <span *ngIf=\"!items || items.length === 0\">\n        <ng-content select=\"[slot=empty]\"></ng-content>\n    </span>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-grid-min-height);max-height:var(--bizy-grid-max-height);height:var(--bizy-grid-height);width:var(--bizy-grid-width);flex:1;overflow-x:auto;overflow-y:hidden;font-size:1rem}.bizy-grid{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-grid-background-color)}.bizy-grid__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}::ng-deep .cdk-virtual-scrollable{height:100%;width:100%;overflow-y:auto!important;overflow-x:hidden!important;contain:inline-size!important}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar{width:.5rem;height:.5rem}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-thumb{border-radius:1rem;background-color:var(--bizy-grid-scroll-bar-color)}::ng-deep .cdk-virtual-scrollable::-webkit-scrollbar-button{height:1rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZ3JpZC9ncmlkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9ncmlkL2dyaWQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLFNBQVMsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDdE0sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFReEQsTUFBTSxPQUFPLGlCQUFpQjtJQWtCUztJQUNUO0lBQ0M7SUFDQztJQXBCSyxPQUFPLENBQXNCO0lBQzVCLGFBQWEsQ0FBdUI7SUFDL0QsU0FBUyxHQUFzQixJQUFJLENBQUM7SUFFN0MsNkJBQTZCLENBQW1CO0lBQ2hELGVBQWUsQ0FBaUI7SUFDaEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkMsS0FBSyxDQUFtQjtJQUN4QixTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVoQyxTQUFTLEdBQVcsR0FBRyxDQUFDO0lBQ3hCLFFBQVEsR0FBMEIsRUFBRSxDQUFDO0lBQ3JDLEtBQUssR0FBbUIsRUFBRSxDQUFDO0lBQzNCLFlBQVksQ0FBdUI7SUFDbkMsV0FBVyxHQUFXLENBQUMsQ0FBQztJQUV4QixZQUNxQyxHQUFzQixFQUMvQixRQUFrQixFQUNqQixRQUFtQixF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QUFXLEVBQUU7WUFDNUQsTUFBTSxHQUFHLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpDLElBQUksSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNqRDtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzt3R0FwSFUsaUJBQWlCLGtCQWtCbEIsaUJBQWlCLGFBQ2pCLFFBQVEsYUFDUixTQUFTLGFBQ1QsVUFBVTs0RkFyQlQsaUJBQWlCLGdJQUVkLG9CQUFvQixpS0NicEMsZ2dDQTBCTTs7NEZEZk8saUJBQWlCO2tCQU43QixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTTs7MEJBb0I1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxTQUFTOzswQkFDaEIsTUFBTTsyQkFBQyxVQUFVOzRDQXBCZSxPQUFPO3NCQUF6QyxTQUFTO3VCQUFDLHNCQUFzQjtnQkFDRyxhQUFhO3NCQUFoRCxZQUFZO3VCQUFDLG9CQUFvQjtnQkFDekIsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb250ZW50Q2hpbGQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJpenlHcmlkRm9yRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5R3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAVmlld0NoaWxkKCdncmlkU2Nyb2xsaW5nQ29udGVudCcpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPG9iamVjdD47XG4gIEBDb250ZW50Q2hpbGQoQml6eUdyaWRGb3JEaXJlY3RpdmUpIGdyaWREaXJlY3RpdmU6IEJpenlHcmlkRm9yRGlyZWN0aXZlO1xuICBASW5wdXQoKSByZXNpemVSZWY6IEVsZW1lbnRSZWYgfCBudWxsID0gbnVsbDtcblxuICAjcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI3ZpZXc6IFZpZXdDb250YWluZXJSZWY7XG4gIG5vdGlmaWVyJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIFxuICByb3dIZWlnaHQ6IG51bWJlciA9IDEwMDtcbiAgaXRlbVJvd3M6IEFycmF5PEFycmF5PHVua25vd24+PiA9IFtdO1xuICBpdGVtczogQXJyYXk8dW5rbm93bj4gPSBbXTtcbiAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx1bmtub3duPjtcbiAgaXRlbXNQZXJSb3c6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmdyaWREaXJlY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuZ3JpZERpcmVjdGl2ZS5pdGVtcyQuc3Vic2NyaWJlKGl0ZW1zID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy4jdXBkYXRlVmlldygpO1xuXG4gICAgICAgIGlmICghdGhpcy4jdmlldykge1xuICAgICAgICAgIHRoaXMuI3ZpZXcgPSB0aGlzLmdyaWREaXJlY3RpdmUudmlld0NvbnRhaW5lclJlZjtcbiAgICAgICAgICB0aGlzLiN2aWV3LmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHRoaXMuI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcblxuICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMubm90aWZpZXIkLm5leHQoKSk7XG4gICAgY29uc3QgcmVzaXplUmVmID0gdGhpcy5yZXNpemVSZWYgPyB0aGlzLnJlc2l6ZVJlZiA6IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgPyB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZXNpemVSZWYpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShkZWJvdW5jZVRpbWUoNTApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy4jdXBkYXRlVmlldygpO1xuICAgIH0pKTtcbiAgfVxuXG4gICN1cGRhdGVWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gdGhpcy5ncmlkRGlyZWN0aXZlLnRlbXBsYXRlUmVmO1xuICAgIGNvbnN0IHJvd1dpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgY29sdW1uV2lkdGggPSAxMDA7XG4gICAgY29uc3QgZm9udFNpemUgPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJykuc3BsaXQoJ3B4JylbMF0pO1xuXG4gICAgY29uc3Qgcm93SGVpZ2h0UGFyYW1ldGVyID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWdyaWQtcm93LWhlaWdodCcpO1xuICAgIGlmIChyb3dIZWlnaHRQYXJhbWV0ZXIgJiYgcm93SGVpZ2h0UGFyYW1ldGVyLmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgdGhpcy5yb3dIZWlnaHQgPSBmb250U2l6ZSAqIE51bWJlcihyb3dIZWlnaHRQYXJhbWV0ZXIuc3BsaXQoJ3JlbScpWzBdKTtcbiAgICB9IGVsc2UgaWYgKHJvd0hlaWdodFBhcmFtZXRlciAmJiByb3dIZWlnaHRQYXJhbWV0ZXIuaW5jbHVkZXMoJ3B4JykpIHtcbiAgICAgIHRoaXMucm93SGVpZ2h0ID0gTnVtYmVyKHJvd0hlaWdodFBhcmFtZXRlci5zcGxpdCgncHgnKVswXSk7XG4gICAgfVxuXG4gICAgbGV0IGdhcCA9IDEwO1xuICAgIGNvbnN0IGdhcFBhcmFtZXRlciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1ncmlkLWdhcCcpO1xuICAgIGlmIChnYXBQYXJhbWV0ZXIgJiYgZ2FwUGFyYW1ldGVyLmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgZ2FwID0gZm9udFNpemUgKiBOdW1iZXIoZ2FwUGFyYW1ldGVyLnNwbGl0KCdyZW0nKVswXSk7XG4gICAgfSBlbHNlIGlmIChnYXBQYXJhbWV0ZXIgJiYgZ2FwUGFyYW1ldGVyLmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICBnYXAgPSBOdW1iZXIoZ2FwUGFyYW1ldGVyLnNwbGl0KCdweCcpWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2x1bW5XaWR0aFBhcmFtZXRlciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tYml6eS1ncmlkLWNvbHVtbi13aWR0aCcpO1xuICAgIGlmIChjb2x1bW5XaWR0aFBhcmFtZXRlciAmJiBjb2x1bW5XaWR0aFBhcmFtZXRlci5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgIGNvbHVtbldpZHRoID0gZm9udFNpemUgKiBOdW1iZXIoY29sdW1uV2lkdGhQYXJhbWV0ZXIuc3BsaXQoJ3JlbScpWzBdKTtcbiAgICB9IGVsc2UgaWYgKGNvbHVtbldpZHRoUGFyYW1ldGVyICYmIGNvbHVtbldpZHRoUGFyYW1ldGVyLmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICBjb2x1bW5XaWR0aCA9IE51bWJlcihjb2x1bW5XaWR0aFBhcmFtZXRlci5zcGxpdCgncHgnKVswXSk7XG4gICAgfVxuXG4gICAgY29sdW1uV2lkdGggKz0gZ2FwO1xuXG4gICAgY29uc3QgY291bnQgPSBNYXRoLnRydW5jKHJvd1dpZHRoIC8gKGNvbHVtbldpZHRoKSk7XG4gICAgaWYgKE1hdGgucm91bmQoKGdhcCAqIChjb3VudCAtIDEpKSArIChjb2x1bW5XaWR0aCAqIGNvdW50KSkgPD0gKHJvd1dpZHRoKSkge1xuICAgICAgdGhpcy5pdGVtc1BlclJvdyA9IGNvdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zUGVyUm93ID0gY291bnQgLSAxO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1Sb3dzOiBBcnJheTxBcnJheTx1bmtub3duPj4gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpICs9IHRoaXMuaXRlbXNQZXJSb3cpIHtcbiAgICAgIGNvbnN0IHJvdzogQXJyYXk8dW5rbm93bj4gPSB0aGlzLml0ZW1zLnNsaWNlKGksIGkgKyB0aGlzLml0ZW1zUGVyUm93KTtcbiAgICAgIGl0ZW1Sb3dzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICB0aGlzLml0ZW1Sb3dzID0gaXRlbVJvd3M7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICBpZiAodGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYml6eS1ncmlkXCI+XG5cbiAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0XG4gICAgICAgIGNsYXNzPVwiYml6eS1ncmlkX19yb3dzXCJcbiAgICAgICAgKm5nSWY9XCJpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwXCJcbiAgICAgICAgW2l0ZW1TaXplXT1cInJvd0hlaWdodFwiXG4gICAgICAgIFttaW5CdWZmZXJQeF09XCJyb3dIZWlnaHQgKyAocm93SGVpZ2h0ICogMjApXCJcbiAgICAgICAgW21heEJ1ZmZlclB4XT1cInJvd0hlaWdodCArIChyb3dIZWlnaHQgKiA0MClcIj5cbiAgICAgICAgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI2dyaWRTY3JvbGxpbmdDb250ZW50PlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIGxldC1pdGVtIGNka1ZpcnR1YWxGb3IgW2Nka1ZpcnR1YWxGb3JPZl09XCJpdGVtUm93c1wiPlxuICAgICAgICAgICAgICAgIDxiaXp5LWdyaWQtcm93IFtyb3dIZWlnaHRdPVwicm93SGVpZ2h0XCIgW2l0ZW1zUGVyUm93XT1cIml0ZW1zUGVyUm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0IG9mIGl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0IH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2JpenktZ3JpZC1yb3c+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuXG4gICAgPHNwYW4gKm5nSWY9XCIhaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWVtcHR5XVwiPjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG5cbjwvZGl2PiJdfQ==