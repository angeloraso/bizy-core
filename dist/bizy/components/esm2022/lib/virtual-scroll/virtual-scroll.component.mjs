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
    emptyText = 'Sin elementos para mostrar';
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyVirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"] }]
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
            }], emptyText: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBVSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRTNDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBT3JDLE1BQU0sT0FBTywwQkFBMEI7SUFvQlA7SUFDTztJQUNUO0lBckJtQixVQUFVLENBQWtDO0lBQ2xGLGFBQWEsQ0FBa0I7SUFDL0IsWUFBWSxDQUFrQjtJQUM5QixTQUFTLEdBQVcsNEJBQTRCLENBQUM7SUFDakQsY0FBYyxDQUFTLENBQUMscUJBQXFCO0lBRXRELGtCQUFrQixHQUFlLEVBQUUsQ0FBQztJQUNwQyxVQUFVLENBQVM7SUFDbkIsS0FBSyxDQUFhO0lBQ2xCLGNBQWMsQ0FBUztJQUN2QixzQkFBc0IsQ0FBUztJQUMvQixTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUNoQyxTQUFTLEdBQVcs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QUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxTQUFTLENBQUMsTUFBZTtRQUN2QixPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLFlBQVksTUFBTSxDQUFDO0lBQ2hFLENBQUM7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7d0dBbElVLDBCQUEwQixrQkFvQjNCLFVBQVUsYUFDVixpQkFBaUIsYUFDakIsUUFBUTs0RkF0QlAsMEJBQTBCLHVPQUN2QiwrQkFBK0IsZ0RDZC9DLDJyQkFpQk07OzRGREpPLDBCQUEwQjtrQkFOdEMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBR2QsdUJBQXVCLENBQUMsTUFBTTs7MEJBc0I1QyxNQUFNOzJCQUFDLFVBQVU7OzBCQUNqQixNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTs0Q0FyQjZCLFVBQVU7c0JBQXhELFlBQVk7dUJBQUMsK0JBQStCO2dCQUNwQyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLW5nLWZvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5jb25zdCBNSU5fVklSVFVBTF9TQ1JPTExfV0lEVEggPSAzMDA7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXZpcnR1YWwtc2Nyb2xsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpcnR1YWwtc2Nyb2xsLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aXJ0dWFsLXNjcm9sbC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVZpcnR1YWxTY3JvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkKEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUpIHZpcnR1YWxGb3I6IEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmU7XG4gIEBJbnB1dCgpIGl0ZW1NaW5IZWlnaHQ6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgaXRlbU1pbldpZHRoOiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGVtcHR5VGV4dDogc3RyaW5nID0gJ1NpbiBlbGVtZW50b3MgcGFyYSBtb3N0cmFyJztcbiAgQElucHV0KCkgdmlld3BvcnRIZWlnaHQ6IHN0cmluZzsgLy8gY3NzIGhlaWdodCB2YWx1ZSAgXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIGl0ZW1zQnlSb3c6IG51bWJlcjtcbiAgaXRlbXM6IEFycmF5PGFueT47XG4gIF9pdGVtTWluSGVpZ2h0OiBudW1iZXI7XG4gIGJpenlWaXJ0dWFsU2Nyb2xsV2lkdGg6IG51bWJlcjtcbiAgbm90aWZpZXIkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI2ZvbnRTaXplOiBudW1iZXIgPSAwO1xuXG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuI2lzU3RyaW5nKHRoaXMuaXRlbU1pbkhlaWdodCkgJiYgdGhpcy5pdGVtTWluSGVpZ2h0LmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgdGhpcy5faXRlbU1pbkhlaWdodCA9IE51bWJlcih0aGlzLml0ZW1NaW5IZWlnaHQuc3BsaXQoJ3JlbScpWzBdKSAqIDE0OyAvLyAxNCBmb250IHNpemUgYXByb3hcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXRlbU1pbkhlaWdodCA9IHRoaXMuaXRlbU1pbkhlaWdodCBhcyBudW1iZXI7XG4gICAgfVxuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQub2Zmc2V0V2lkdGg7XG4gICAgICBpZiAoIXZpcnR1YWxTY3JvbGxXaWR0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA9IHZpcnR1YWxTY3JvbGxXaWR0aDtcbiAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy52aXJ0dWFsRm9yLml0ZW1zLnN1YnNjcmliZShpdGVtcyA9PiB7XG4gICAgICAgIGlmICghaXRlbXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgICB0aGlzLiNmaWxsVmlydHVhbFNjcm9sbCgpO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5ub3RpZmllciQubmV4dCgpKTtcbiAgICAgICAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubm90aWZpZXIkLnBpcGUoc2tpcCgxKSwgZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudD8uZmlyc3RDaGlsZD8uZmlyc3RDaGlsZD8uY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLmZpcnN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy4jZmlsbFZpcnR1YWxTY3JvbGwoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZmllciQubmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcyA9IFtdO1xuICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG5cbiAgI2ZpbGxWaXJ0dWFsU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPCBNSU5fVklSVFVBTF9TQ1JPTExfV0lEVEgpIHtcbiAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy4jZm9udFNpemUpIHtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG4gICAgICAgIHRoaXMuI2ZvbnRTaXplID0gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGdyaWRHYXAgPSB0aGlzLiNmb250U2l6ZSB8fCAxNDtcbiAgICAgIGxldCBpdGVtTWluV2lkdGg6IG51bWJlciA9IDE7XG4gICAgICBpZiAodGhpcy4jaXNTdHJpbmcodGhpcy5pdGVtTWluV2lkdGgpKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ3JlbScpWzBdKSAqIGdyaWRHYXA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pdGVtTWluV2lkdGguaW5jbHVkZXMoJ2VtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ2VtJylbMF0pICogZ3JpZEdhcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbU1pbldpZHRoID0gdGhpcy5pdGVtTWluV2lkdGhcbiAgICAgIH1cblxuICAgICAgY29uc3QgY291bnQgPSBNYXRoLnRydW5jKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCAvIChpdGVtTWluV2lkdGgpKTtcbiAgICAgIGlmICgoKGdyaWRHYXAgKiAoY291bnQgLSAxKSkgKyAoaXRlbU1pbldpZHRoICogY291bnQpKSA8PSAodGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoKSkge1xuICAgICAgICB0aGlzLml0ZW1zQnlSb3cgPSBjb3VudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IGNvdW50IC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiNzZXRJdGVtcygpO1xuICB9XG5cbiAgI3NldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGFycmF5OiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3QgaXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXNMZW5ndGg7IGkrKykge1xuICAgICAgYXJyYXkucHVzaCh0aGlzLml0ZW1zLnNsaWNlKGksIGkgKyB0aGlzLml0ZW1zQnlSb3cpKTtcbiAgICAgIGkgKz0gdGhpcy5pdGVtc0J5Um93IC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcy5sZW5ndGggPSAwO1xuICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gYXJyYXk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2lzU3RyaW5nKHN0cmluZzogdW5rbm93bik6IHN0cmluZyBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyB8fCBzdHJpbmcgaW5zdGFuY2VvZiBTdHJpbmc7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXY+XG5cbiAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCBcbiAgICAqbmdJZj1cInZpcnR1YWxTY3JvbGxJdGVtcy5sZW5ndGggIT09IDBcIlxuICAgIGNsYXNzPVwiYml6eS12aXJ0dWFsLXNjcm9sbFwiXG4gICAgW2l0ZW1TaXplXT1cIl9pdGVtTWluSGVpZ2h0XCJcbiAgICBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHZpZXdwb3J0SGVpZ2h0fVwiXG4gICAgW21pbkJ1ZmZlclB4XT1cIl9pdGVtTWluSGVpZ2h0ICsgKF9pdGVtTWluSGVpZ2h0ICogOClcIlxuICAgIFttYXhCdWZmZXJQeF09XCJfaXRlbU1pbkhlaWdodCArIChfaXRlbU1pbkhlaWdodCAqIDEyKVwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8ZGl2ICpjZGtWaXJ0dWFsRm9yPVwibGV0IGl0ZW0gb2YgdmlydHVhbFNjcm9sbEl0ZW1zXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidmlydHVhbEZvci50ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgXG4gIDxzcGFuICpuZ0lmPVwidmlydHVhbFNjcm9sbEl0ZW1zLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwiYml6eS12aXJ0dWFsLXNjcm9sbC0tZW1wdHlcIj57e2VtcHR5VGV4dH19PC9zcGFuPlxuXG48L2Rpdj4iXX0=