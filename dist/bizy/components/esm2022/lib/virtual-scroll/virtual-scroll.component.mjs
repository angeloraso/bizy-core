import { debounceTime, skip } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { Component, ContentChild, Input, Inject, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
const MIN_VIRTUAL_SCROLL_WIDTH = 300;
export class BizyVirtualScrollComponent {
    elementRef;
    ref;
    document;
    virtualFor;
    itemMinHeight;
    itemMinWidth;
    viewportHeight; // css height value  
    virtualScrollItems = [];
    itemsByRow;
    items;
    _itemMinHeight;
    bizyVirtualScrollWidth;
    notifier$ = new Subject();
    #fontSize = 0;
    #resizeObserver;
    #mutationObserver;
    #subscription = new Subscription();
    constructor(elementRef, ref, document) {
        this.elementRef = elementRef;
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
            this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
        }
        else {
            this._itemMinHeight = this.itemMinHeight;
        }
        this.#mutationObserver = new MutationObserver(() => {
            const virtualScrollWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
            if (!virtualScrollWidth) {
                return;
            }
            this.bizyVirtualScrollWidth = virtualScrollWidth;
            this.#subscription.add(this.virtualFor.items.subscribe(items => {
                if (!items) {
                    return;
                }
                if (items.length > 0) {
                    this.items = items;
                    this.#fillVirtualScroll();
                    if (!this.#resizeObserver) {
                        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
                        this.#resizeObserver.observe(this.elementRef.nativeElement.parentElement?.parentElement);
                        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                            if (this.elementRef.nativeElement?.firstChild?.firstChild?.clientWidth) {
                                this.bizyVirtualScrollWidth = this.elementRef.nativeElement.firstChild.firstChild.clientWidth;
                                this.#fillVirtualScroll();
                            }
                        }));
                        this.notifier$.next();
                    }
                }
                else {
                    this.virtualScrollItems = [];
                    this.ref.detectChanges();
                }
            }));
            this.#mutationObserver.disconnect();
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    #fillVirtualScroll = () => {
        if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
            this.itemsByRow = 1;
        }
        else {
            if (!this.#fontSize) {
                const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
                this.#fontSize = Number(fontSize.split('px')[0]);
            }
            const gridGap = this.#fontSize || 14;
            let itemMinWidth = 1;
            if (this.#isString(this.itemMinWidth)) {
                if (this.itemMinWidth.includes('rem')) {
                    itemMinWidth = Number(this.itemMinWidth.split('rem')[0]) * gridGap;
                }
                else if (this.itemMinWidth.includes('em')) {
                    itemMinWidth = Number(this.itemMinWidth.split('em')[0]) * gridGap;
                }
            }
            else {
                itemMinWidth = this.itemMinWidth;
            }
            const count = Math.trunc(this.bizyVirtualScrollWidth / (itemMinWidth));
            if (((gridGap * (count - 1)) + (itemMinWidth * count)) <= (this.bizyVirtualScrollWidth)) {
                this.itemsByRow = count;
            }
            else {
                this.itemsByRow = count - 1;
            }
        }
        this.#setItems();
    };
    #setItems = () => {
        const array = [];
        const itemsLength = this.items.length;
        let i;
        for (i = 0; i < itemsLength; i++) {
            array.push(this.items.slice(i, i + this.itemsByRow));
            i += this.itemsByRow - 1;
        }
        this.virtualScrollItems.length = 0;
        this.virtualScrollItems = array;
        this.ref.detectChanges();
    };
    #isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyVirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems && virtualScrollItems.length > 0\"\n    class=\"bizy-virtual-scroll\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [itemSize]=\"_itemMinHeight\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems && virtualScrollItems.length > 0\"\n    class=\"bizy-virtual-scroll\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [itemSize]=\"_itemMinHeight\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { virtualFor: [{
                type: ContentChild,
                args: [BizyVirtualScrollNgForDirective]
            }], itemMinHeight: [{
                type: Input
            }], itemMinWidth: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBVSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRTNDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBT3JDLE1BQU0sT0FBTywwQkFBMEI7SUFtQlA7SUFDTztJQUNUO0lBcEJtQixVQUFVLENBQWtDO0lBQ2xGLGFBQWEsQ0FBa0I7SUFDL0IsWUFBWSxDQUFrQjtJQUM5QixjQUFjLENBQVMsQ0FBQyxxQkFBcUI7SUFFdEQsa0JBQWtCLEdBQWUsRUFBRSxDQUFDO0lBQ3BDLFVBQVUsQ0FBUztJQUNuQixLQUFLLENBQWE7SUFDbEIsY0FBYyxDQUFTO0lBQ3ZCLHNCQUFzQixDQUFTO0lBQy9CLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBQ2hDLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFFdEIsZUFBZSxDQUFpQjtJQUNoQyxpQkFBaUIsQ0FBbUI7SUFDcEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsWUFDOEIsVUFBc0IsRUFDZixHQUFzQixFQUMvQixRQUFrQjtRQUZoQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2YsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUMzQyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7U0FDN0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQXVCLENBQUM7U0FDcEQ7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDakQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUM3SCxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztZQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsT0FBTztpQkFDUjtnQkFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO3dCQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDdkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLGFBQTRCLENBQUMsQ0FBQzt3QkFDeEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7NEJBQ3BGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7Z0NBQ3RFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztnQ0FDOUYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7NkJBQzNCO3dCQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDdkI7aUJBQ0Y7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRUosSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGtCQUFrQixHQUFHLEdBQUcsRUFBRTtRQUN4QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsR0FBRyx3QkFBd0IsRUFBRTtZQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN0RyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7WUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDckMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDckMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFDcEU7cUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDM0MsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFDbkU7YUFDRjtpQkFBTTtnQkFDTCxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTthQUNqQztZQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQ3ZGLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUM3QjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQTtJQUVELFNBQVMsR0FBRyxHQUFHLEVBQUU7UUFDZixNQUFNLEtBQUssR0FBZSxFQUFFLENBQUM7UUFDN0IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUM7UUFDTixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDckQsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELFNBQVMsQ0FBQyxNQUFlO1FBQ3ZCLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxNQUFNLENBQUM7SUFDaEUsQ0FBQztJQUdELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzt3R0FqSVUsMEJBQTBCLGtCQW1CM0IsVUFBVSxhQUNWLGlCQUFpQixhQUNqQixRQUFROzRGQXJCUCwwQkFBMEIsK01BQ3ZCLCtCQUErQixnRENkL0MsZ21CQWVNOzs0RkRGTywwQkFBMEI7a0JBTnRDLFNBQVM7K0JBQ0UscUJBQXFCLG1CQUdkLHVCQUF1QixDQUFDLE1BQU07OzBCQXFCNUMsTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFFBQVE7NENBcEI2QixVQUFVO3NCQUF4RCxZQUFZO3VCQUFDLCtCQUErQjtnQkFDcEMsYUFBYTtzQkFBckIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtbmctZm9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmNvbnN0IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCA9IDMwMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdmlydHVhbC1zY3JvbGwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlydHVhbC1zY3JvbGwuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpcnR1YWwtc2Nyb2xsLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VmlydHVhbFNjcm9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGQoQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSkgdmlydHVhbEZvcjogQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZTtcbiAgQElucHV0KCkgaXRlbU1pbkhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtTWluV2lkdGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgdmlld3BvcnRIZWlnaHQ6IHN0cmluZzsgLy8gY3NzIGhlaWdodCB2YWx1ZSAgXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIGl0ZW1zQnlSb3c6IG51bWJlcjtcbiAgaXRlbXM6IEFycmF5PGFueT47XG4gIF9pdGVtTWluSGVpZ2h0OiBudW1iZXI7XG4gIGJpenlWaXJ0dWFsU2Nyb2xsV2lkdGg6IG51bWJlcjtcbiAgbm90aWZpZXIkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI2ZvbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuI2lzU3RyaW5nKHRoaXMuaXRlbU1pbkhlaWdodCkgJiYgdGhpcy5pdGVtTWluSGVpZ2h0LmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgdGhpcy5faXRlbU1pbkhlaWdodCA9IE51bWJlcih0aGlzLml0ZW1NaW5IZWlnaHQuc3BsaXQoJ3JlbScpWzBdKSAqIDE0OyAvLyAxNCBmb250IHNpemUgYXByb3hcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXRlbU1pbkhlaWdodCA9IHRoaXMuaXRlbU1pbkhlaWdodCBhcyBudW1iZXI7XG4gICAgfVxuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XG4gICAgICBpZiAoIXZpcnR1YWxTY3JvbGxXaWR0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA9IHZpcnR1YWxTY3JvbGxXaWR0aDtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy52aXJ0dWFsRm9yLml0ZW1zLnN1YnNjcmliZShpdGVtcyA9PiB7XG4gICAgICAgIGlmICghaXRlbXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgICB0aGlzLiNmaWxsVmlydHVhbFNjcm9sbCgpO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5ub3RpZmllciQubmV4dCgpKTtcbiAgICAgICAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubm90aWZpZXIkLnBpcGUoc2tpcCgxKSwgZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudD8uZmlyc3RDaGlsZD8uZmlyc3RDaGlsZD8uY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLmZpcnN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy4jZmlsbFZpcnR1YWxTY3JvbGwoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZmllciQubmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcyA9IFtdO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG5cbiAgI2ZpbGxWaXJ0dWFsU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPCBNSU5fVklSVFVBTF9TQ1JPTExfV0lEVEgpIHtcbiAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy4jZm9udFNpemUpIHtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG4gICAgICAgIHRoaXMuI2ZvbnRTaXplID0gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGdyaWRHYXAgPSB0aGlzLiNmb250U2l6ZSB8fCAxNDtcbiAgICAgIGxldCBpdGVtTWluV2lkdGg6IG51bWJlciA9IDE7XG4gICAgICBpZiAodGhpcy4jaXNTdHJpbmcodGhpcy5pdGVtTWluV2lkdGgpKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ3JlbScpWzBdKSAqIGdyaWRHYXA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pdGVtTWluV2lkdGguaW5jbHVkZXMoJ2VtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ2VtJylbMF0pICogZ3JpZEdhcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbU1pbldpZHRoID0gdGhpcy5pdGVtTWluV2lkdGhcbiAgICAgIH1cblxuICAgICAgY29uc3QgY291bnQgPSBNYXRoLnRydW5jKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCAvIChpdGVtTWluV2lkdGgpKTtcbiAgICAgIGlmICgoKGdyaWRHYXAgKiAoY291bnQgLSAxKSkgKyAoaXRlbU1pbldpZHRoICogY291bnQpKSA8PSAodGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoKSkge1xuICAgICAgICB0aGlzLml0ZW1zQnlSb3cgPSBjb3VudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IGNvdW50IC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiNzZXRJdGVtcygpO1xuICB9XG5cbiAgI3NldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGFycmF5OiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3QgaXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXNMZW5ndGg7IGkrKykge1xuICAgICAgYXJyYXkucHVzaCh0aGlzLml0ZW1zLnNsaWNlKGksIGkgKyB0aGlzLml0ZW1zQnlSb3cpKTtcbiAgICAgIGkgKz0gdGhpcy5pdGVtc0J5Um93IC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcy5sZW5ndGggPSAwO1xuICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gYXJyYXk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2lzU3RyaW5nKHN0cmluZzogdW5rbm93bik6IHN0cmluZyBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyB8fCBzdHJpbmcgaW5zdGFuY2VvZiBTdHJpbmc7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXY+XG5cbiAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCBcbiAgICAqbmdJZj1cInZpcnR1YWxTY3JvbGxJdGVtcyAmJiB2aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoID4gMFwiXG4gICAgY2xhc3M9XCJiaXp5LXZpcnR1YWwtc2Nyb2xsXCJcbiAgICBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHZpZXdwb3J0SGVpZ2h0fVwiXG4gICAgW2l0ZW1TaXplXT1cIl9pdGVtTWluSGVpZ2h0XCJcbiAgICBbbWluQnVmZmVyUHhdPVwiX2l0ZW1NaW5IZWlnaHQgKyAoX2l0ZW1NaW5IZWlnaHQgKiA4KVwiXG4gICAgW21heEJ1ZmZlclB4XT1cIl9pdGVtTWluSGVpZ2h0ICsgKF9pdGVtTWluSGVpZ2h0ICogMTIpXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiB2aXJ0dWFsU2Nyb2xsSXRlbXNcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ2aXJ0dWFsRm9yLnRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICBcbjwvZGl2PiJdfQ==