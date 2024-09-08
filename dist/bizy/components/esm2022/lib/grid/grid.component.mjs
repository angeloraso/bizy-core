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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZ3JpZC9ncmlkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9ncmlkL2dyaWQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLFNBQVMsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDdE0sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFReEQsTUFBTSxPQUFPLGlCQUFpQjtJQWtCUztJQUNUO0lBQ0M7SUFDQztJQXBCSyxPQUFPLENBQXNCO0lBQzVCLGFBQWEsQ0FBdUI7SUFDL0QsU0FBUyxHQUFzQixJQUFJLENBQUM7SUFFN0MsNkJBQTZCLENBQW1CO0lBQ2hELGVBQWUsQ0FBaUI7SUFDaEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkMsS0FBSyxDQUFtQjtJQUN4QixTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVoQyxTQUFTLEdBQVcsR0FBRyxDQUFDO0lBQ3hCLFFBQVEsR0FBMEIsRUFBRSxDQUFDO0lBQ3JDLEtBQUssR0FBbUIsRUFBRSxDQUFDO0lBQzNCLFlBQVksQ0FBdUI7SUFDbkMsV0FBVyxHQUFXLENBQUMsQ0FBQztJQUV4QixZQUNxQyxHQUFzQixFQUMvQixRQUFrQixFQUNqQixRQUFtQixF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QyxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpDLElBQUksSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNqRDtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzt3R0FoSFUsaUJBQWlCLGtCQWtCbEIsaUJBQWlCLGFBQ2pCLFFBQVEsYUFDUixTQUFTLGFBQ1QsVUFBVTs0RkFyQlQsaUJBQWlCLGdJQUVkLG9CQUFvQixpS0NicEMsZ2dDQTBCTTs7NEZEZk8saUJBQWlCO2tCQU43QixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTTs7MEJBb0I1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxTQUFTOzswQkFDaEIsTUFBTTsyQkFBQyxVQUFVOzRDQXBCZSxPQUFPO3NCQUF6QyxTQUFTO3VCQUFDLHNCQUFzQjtnQkFDRyxhQUFhO3NCQUFoRCxZQUFZO3VCQUFDLG9CQUFvQjtnQkFDekIsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb250ZW50Q2hpbGQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJpenlHcmlkRm9yRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5R3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAVmlld0NoaWxkKCdncmlkU2Nyb2xsaW5nQ29udGVudCcpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPG9iamVjdD47XG4gIEBDb250ZW50Q2hpbGQoQml6eUdyaWRGb3JEaXJlY3RpdmUpIGdyaWREaXJlY3RpdmU6IEJpenlHcmlkRm9yRGlyZWN0aXZlO1xuICBASW5wdXQoKSByZXNpemVSZWY6IEVsZW1lbnRSZWYgfCBudWxsID0gbnVsbDtcblxuICAjcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI3ZpZXc6IFZpZXdDb250YWluZXJSZWY7XG4gIG5vdGlmaWVyJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIFxuICByb3dIZWlnaHQ6IG51bWJlciA9IDEwMDtcbiAgaXRlbVJvd3M6IEFycmF5PEFycmF5PHVua25vd24+PiA9IFtdO1xuICBpdGVtczogQXJyYXk8dW5rbm93bj4gPSBbXTtcbiAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx1bmtub3duPjtcbiAgaXRlbXNQZXJSb3c6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmdyaWREaXJlY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMuZ3JpZERpcmVjdGl2ZS5pdGVtcyQuc3Vic2NyaWJlKGl0ZW1zID0+IHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLiN1cGRhdGVWaWV3KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLiN2aWV3KSB7XG4gICAgICAgICAgdGhpcy4jdmlldyA9IHRoaXMuZ3JpZERpcmVjdGl2ZS52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICAgIHRoaXMuI3ZpZXcuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuXG4gICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5ub3RpZmllciQubmV4dCgpKTtcbiAgICBjb25zdCByZXNpemVSZWYgPSB0aGlzLnJlc2l6ZVJlZiA/IHRoaXMucmVzaXplUmVmIDogdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA/IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHJlc2l6ZVJlZik7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLm5vdGlmaWVyJC5waXBlKGRlYm91bmNlVGltZSg1MCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLiN1cGRhdGVWaWV3KCk7XG4gICAgfSkpO1xuICB9XG5cbiAgI3VwZGF0ZVZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5pdGVtVGVtcGxhdGUgPSB0aGlzLmdyaWREaXJlY3RpdmUudGVtcGxhdGVSZWY7XG4gICAgY29uc3Qgcm93V2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xuICAgIGxldCBjb2x1bW5XaWR0aCA9IDEwMDtcbiAgICBjb25zdCBmb250U2l6ZSA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKS5zcGxpdCgncHgnKVswXSk7XG5cbiAgICBjb25zdCByb3dIZWlnaHRQYXJhbWV0ZXIgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJpenktZ3JpZC1yb3ctaGVpZ2h0Jyk7XG4gICAgaWYgKHJvd0hlaWdodFBhcmFtZXRlciAmJiByb3dIZWlnaHRQYXJhbWV0ZXIuaW5jbHVkZXMoJ3JlbScpKSB7XG4gICAgICB0aGlzLnJvd0hlaWdodCA9IGZvbnRTaXplICogTnVtYmVyKHJvd0hlaWdodFBhcmFtZXRlci5zcGxpdCgncmVtJylbMF0pO1xuICAgIH0gZWxzZSBpZiAocm93SGVpZ2h0UGFyYW1ldGVyICYmIHJvd0hlaWdodFBhcmFtZXRlci5pbmNsdWRlcygncHgnKSkge1xuICAgICAgdGhpcy5yb3dIZWlnaHQgPSBOdW1iZXIocm93SGVpZ2h0UGFyYW1ldGVyLnNwbGl0KCdweCcpWzBdKTtcbiAgICB9XG5cbiAgICBsZXQgZ2FwID0gMTA7XG4gICAgY29uc3QgZ2FwUGFyYW1ldGVyID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWdyaWQtZ2FwJyk7XG4gICAgaWYgKGdhcFBhcmFtZXRlciAmJiBnYXBQYXJhbWV0ZXIuaW5jbHVkZXMoJ3JlbScpKSB7XG4gICAgICBnYXAgPSBmb250U2l6ZSAqIE51bWJlcihnYXBQYXJhbWV0ZXIuc3BsaXQoJ3JlbScpWzBdKTtcbiAgICB9IGVsc2UgaWYgKGdhcFBhcmFtZXRlciAmJiBnYXBQYXJhbWV0ZXIuaW5jbHVkZXMoJ3B4JykpIHtcbiAgICAgIGdhcCA9IE51bWJlcihnYXBQYXJhbWV0ZXIuc3BsaXQoJ3B4JylbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbHVtbldpZHRoUGFyYW1ldGVyID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1iaXp5LWdyaWQtY29sdW1uLXdpZHRoJyk7XG4gICAgaWYgKGNvbHVtbldpZHRoUGFyYW1ldGVyICYmIGNvbHVtbldpZHRoUGFyYW1ldGVyLmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgY29sdW1uV2lkdGggPSBmb250U2l6ZSAqIE51bWJlcihjb2x1bW5XaWR0aFBhcmFtZXRlci5zcGxpdCgncmVtJylbMF0pO1xuICAgIH0gZWxzZSBpZiAoY29sdW1uV2lkdGhQYXJhbWV0ZXIgJiYgY29sdW1uV2lkdGhQYXJhbWV0ZXIuaW5jbHVkZXMoJ3B4JykpIHtcbiAgICAgIGNvbHVtbldpZHRoID0gTnVtYmVyKGNvbHVtbldpZHRoUGFyYW1ldGVyLnNwbGl0KCdweCcpWzBdKTtcbiAgICB9XG5cbiAgICBjb2x1bW5XaWR0aCArPSBnYXA7XG5cbiAgICBjb25zdCBjb3VudCA9IE1hdGgudHJ1bmMocm93V2lkdGggLyAoY29sdW1uV2lkdGgpKTtcbiAgICBpZiAoTWF0aC5yb3VuZCgoZ2FwICogKGNvdW50IC0gMSkpICsgKGNvbHVtbldpZHRoICogY291bnQpKSA8PSAocm93V2lkdGgpKSB7XG4gICAgICB0aGlzLml0ZW1zUGVyUm93ID0gY291bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXNQZXJSb3cgPSBjb3VudCAtIDE7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbVJvd3M6IEFycmF5PEFycmF5PHVua25vd24+PiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkgKz0gdGhpcy5pdGVtc1BlclJvdykge1xuICAgICAgY29uc3Qgcm93OiBBcnJheTx1bmtub3duPiA9IHRoaXMuaXRlbXMuc2xpY2UoaSwgaSArIHRoaXMuaXRlbXNQZXJSb3cpO1xuICAgICAgaXRlbVJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHRoaXMuaXRlbVJvd3MgPSBpdGVtUm93cztcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIGlmICh0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LWdyaWRcIj5cblxuICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRcbiAgICAgICAgY2xhc3M9XCJiaXp5LWdyaWRfX3Jvd3NcIlxuICAgICAgICAqbmdJZj1cIml0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDBcIlxuICAgICAgICBbaXRlbVNpemVdPVwicm93SGVpZ2h0XCJcbiAgICAgICAgW21pbkJ1ZmZlclB4XT1cInJvd0hlaWdodCArIChyb3dIZWlnaHQgKiAyMClcIlxuICAgICAgICBbbWF4QnVmZmVyUHhdPVwicm93SGVpZ2h0ICsgKHJvd0hlaWdodCAqIDQwKVwiPlxuICAgICAgICBcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JpZFNjcm9sbGluZ0NvbnRlbnQ+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gY2RrVmlydHVhbEZvciBbY2RrVmlydHVhbEZvck9mXT1cIml0ZW1Sb3dzXCI+XG4gICAgICAgICAgICAgICAgPGJpenktZ3JpZC1yb3cgW3Jvd0hlaWdodF09XCJyb3dIZWlnaHRcIiBbaXRlbXNQZXJSb3ddPVwiaXRlbXNQZXJSb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXQgb2YgaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvYml6eS1ncmlkLXJvdz5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG5cbiAgICA8c3BhbiAqbmdJZj1cIiFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9ZW1wdHldXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cblxuPC9kaXY+Il19