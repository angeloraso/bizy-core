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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyVirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<cdk-virtual-scroll-viewport \n  class=\"bizy-virtual-scroll\"\n  [ngClass]=\"{'bizy-virtual-scroll--hidden': !virtualScrollItems || virtualScrollItems.length === 0}\"\n  [itemSize]=\"_itemMinHeight\"\n  [ngStyle]=\"{'height': viewportHeight}\"\n  [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n  [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n  <ng-content></ng-content>\n  <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n    <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n  </div>\n</cdk-virtual-scroll-viewport>\n  ", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cdk-virtual-scroll-viewport \n  class=\"bizy-virtual-scroll\"\n  [ngClass]=\"{'bizy-virtual-scroll--hidden': !virtualScrollItems || virtualScrollItems.length === 0}\"\n  [itemSize]=\"_itemMinHeight\"\n  [ngStyle]=\"{'height': viewportHeight}\"\n  [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n  [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n  <ng-content></ng-content>\n  <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n    <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n  </div>\n</cdk-virtual-scroll-viewport>\n  ", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBVSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRTNDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBT3JDLE1BQU0sT0FBTywwQkFBMEI7SUFvQlA7SUFDTztJQUNUO0lBckJtQixVQUFVLENBQWtDO0lBQ2xGLGFBQWEsQ0FBa0I7SUFDL0IsWUFBWSxDQUFrQjtJQUM5QixTQUFTLEdBQVcsNEJBQTRCLENBQUM7SUFDakQsY0FBYyxDQUFTLENBQUMscUJBQXFCO0lBRXRELGtCQUFrQixHQUFlLEVBQUUsQ0FBQztJQUNwQyxVQUFVLENBQVM7SUFDbkIsS0FBSyxDQUFhO0lBQ2xCLGNBQWMsQ0FBUztJQUN2QixzQkFBc0IsQ0FBUztJQUMvQixTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUNoQyxTQUFTLEdBQVcs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QUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxTQUFTLENBQUMsTUFBZTtRQUN2QixPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLFlBQVksTUFBTSxDQUFDO0lBQ2hFLENBQUM7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7d0dBbElVLDBCQUEwQixrQkFvQjNCLFVBQVUsYUFDVixpQkFBaUIsYUFDakIsUUFBUTs0RkF0QlAsMEJBQTBCLHVPQUN2QiwrQkFBK0IsZ0RDZC9DLCtsQkFZRTs7NEZEQ1csMEJBQTBCO2tCQU50QyxTQUFTOytCQUNFLHFCQUFxQixtQkFHZCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFzQjVDLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxRQUFROzRDQXJCNkIsVUFBVTtzQkFBeEQsWUFBWTt1QkFBQywrQkFBK0I7Z0JBQ3BDLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtbmctZm9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmNvbnN0IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCA9IDMwMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdmlydHVhbC1zY3JvbGwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlydHVhbC1zY3JvbGwuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpcnR1YWwtc2Nyb2xsLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VmlydHVhbFNjcm9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGQoQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSkgdmlydHVhbEZvcjogQml6eVZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZTtcbiAgQElucHV0KCkgaXRlbU1pbkhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtTWluV2lkdGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgZW1wdHlUZXh0OiBzdHJpbmcgPSAnU2luIGVsZW1lbnRvcyBwYXJhIG1vc3RyYXInO1xuICBASW5wdXQoKSB2aWV3cG9ydEhlaWdodDogc3RyaW5nOyAvLyBjc3MgaGVpZ2h0IHZhbHVlICBcblxuICB2aXJ0dWFsU2Nyb2xsSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcbiAgaXRlbXNCeVJvdzogbnVtYmVyO1xuICBpdGVtczogQXJyYXk8YW55PjtcbiAgX2l0ZW1NaW5IZWlnaHQ6IG51bWJlcjtcbiAgYml6eVZpcnR1YWxTY3JvbGxXaWR0aDogbnVtYmVyO1xuICBub3RpZmllciQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAjZm9udFNpemU6IG51bWJlciA9IDA7XG5cbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgI211dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy4jaXNTdHJpbmcodGhpcy5pdGVtTWluSGVpZ2h0KSAmJiB0aGlzLml0ZW1NaW5IZWlnaHQuaW5jbHVkZXMoJ3JlbScpKSB7XG4gICAgICB0aGlzLl9pdGVtTWluSGVpZ2h0ID0gTnVtYmVyKHRoaXMuaXRlbU1pbkhlaWdodC5zcGxpdCgncmVtJylbMF0pICogMTQ7IC8vIDE0IGZvbnQgc2l6ZSBhcHJveFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtTWluSGVpZ2h0ID0gdGhpcy5pdGVtTWluSGVpZ2h0IGFzIG51bWJlcjtcbiAgICB9XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgY29uc3QgdmlydHVhbFNjcm9sbFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5vZmZzZXRXaWR0aDtcbiAgICAgIGlmICghdmlydHVhbFNjcm9sbFdpZHRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoID0gdmlydHVhbFNjcm9sbFdpZHRoO1xuICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnZpcnR1YWxGb3IuaXRlbXMuc3Vic2NyaWJlKGl0ZW1zID0+IHtcbiAgICAgICAgaWYgKCFpdGVtcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICAgIHRoaXMuI2ZpbGxWaXJ0dWFsU2Nyb2xsKCk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLiNyZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLm5vdGlmaWVyJC5uZXh0KCkpO1xuICAgICAgICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Py5maXJzdENoaWxkPy5maXJzdENoaWxkPy5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLiNmaWxsVmlydHVhbFNjcm9sbCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyJC5uZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gW107XG4gICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICAjZmlsbFZpcnR1YWxTY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA8IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCkge1xuICAgICAgdGhpcy5pdGVtc0J5Um93ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLiNmb250U2l6ZSkge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgdGhpcy4jZm9udFNpemUgPSBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pO1xuICAgICAgfVxuICAgICAgY29uc3QgZ3JpZEdhcCA9IHRoaXMuI2ZvbnRTaXplIHx8IDE0O1xuICAgICAgbGV0IGl0ZW1NaW5XaWR0aDogbnVtYmVyID0gMTtcbiAgICAgIGlmICh0aGlzLiNpc1N0cmluZyh0aGlzLml0ZW1NaW5XaWR0aCkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbU1pbldpZHRoLmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgICAgIGl0ZW1NaW5XaWR0aCA9IE51bWJlcih0aGlzLml0ZW1NaW5XaWR0aC5zcGxpdCgncmVtJylbMF0pICogZ3JpZEdhcDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygnZW0nKSkge1xuICAgICAgICAgIGl0ZW1NaW5XaWR0aCA9IE51bWJlcih0aGlzLml0ZW1NaW5XaWR0aC5zcGxpdCgnZW0nKVswXSkgKiBncmlkR2FwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtTWluV2lkdGggPSB0aGlzLml0ZW1NaW5XaWR0aFxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3VudCA9IE1hdGgudHJ1bmModGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoIC8gKGl0ZW1NaW5XaWR0aCkpO1xuICAgICAgaWYgKCgoZ3JpZEdhcCAqIChjb3VudCAtIDEpKSArIChpdGVtTWluV2lkdGggKiBjb3VudCkpIDw9ICh0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGgpKSB7XG4gICAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IGNvdW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pdGVtc0J5Um93ID0gY291bnQgLSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuI3NldEl0ZW1zKCk7XG4gIH1cblxuICAjc2V0SXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgICBjb25zdCBpdGVtc0xlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIGxldCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtc0xlbmd0aDsgaSsrKSB7XG4gICAgICBhcnJheS5wdXNoKHRoaXMuaXRlbXMuc2xpY2UoaSwgaSArIHRoaXMuaXRlbXNCeVJvdykpO1xuICAgICAgaSArPSB0aGlzLml0ZW1zQnlSb3cgLSAxO1xuICAgIH1cblxuICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zLmxlbmd0aCA9IDA7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsSXRlbXMgPSBhcnJheTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjaXNTdHJpbmcoc3RyaW5nOiB1bmtub3duKTogc3RyaW5nIGlzIHN0cmluZyB7XG4gICAgcmV0dXJuIHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnIHx8IHN0cmluZyBpbnN0YW5jZW9mIFN0cmluZztcbiAgfVxuXG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCBcbiAgY2xhc3M9XCJiaXp5LXZpcnR1YWwtc2Nyb2xsXCJcbiAgW25nQ2xhc3NdPVwieydiaXp5LXZpcnR1YWwtc2Nyb2xsLS1oaWRkZW4nOiAhdmlydHVhbFNjcm9sbEl0ZW1zIHx8IHZpcnR1YWxTY3JvbGxJdGVtcy5sZW5ndGggPT09IDB9XCJcbiAgW2l0ZW1TaXplXT1cIl9pdGVtTWluSGVpZ2h0XCJcbiAgW25nU3R5bGVdPVwieydoZWlnaHQnOiB2aWV3cG9ydEhlaWdodH1cIlxuICBbbWluQnVmZmVyUHhdPVwiX2l0ZW1NaW5IZWlnaHQgKyAoX2l0ZW1NaW5IZWlnaHQgKiA4KVwiXG4gIFttYXhCdWZmZXJQeF09XCJfaXRlbU1pbkhlaWdodCArIChfaXRlbU1pbkhlaWdodCAqIDEyKVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxkaXYgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiB2aXJ0dWFsU2Nyb2xsSXRlbXNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidmlydHVhbEZvci50ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAiXX0=