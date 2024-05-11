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
                        this.#resizeObserver.observe(this.elementRef.nativeElement);
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyVirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    [ngClass]=\"{'bizy-virtual-scroll--hidden': !virtualScrollItems || virtualScrollItems.length === 0}\"\n    class=\"bizy-virtual-scroll\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [itemSize]=\"_itemMinHeight\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    [ngClass]=\"{'bizy-virtual-scroll--hidden': !virtualScrollItems || virtualScrollItems.length === 0}\"\n    class=\"bizy-virtual-scroll\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [itemSize]=\"_itemMinHeight\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBVSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkksT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRTNDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBT3JDLE1BQU0sT0FBTywwQkFBMEI7SUFtQlA7SUFDTztJQUNUO0lBcEJtQixVQUFVLENBQWtDO0lBQ2xGLGFBQWEsQ0FBa0I7SUFDL0IsWUFBWSxDQUFrQjtJQUM5QixjQUFjLENBQVMsQ0FBQyxxQkFBcUI7SUFFdEQsa0JBQWtCLEdBQWUsRUFBRSxDQUFDO0lBQ3BDLFVBQVUsQ0FBUztJQUNuQixLQUFLLENBQWE7SUFDbEIsY0FBYyxDQUFTO0lBQ3ZCLHNCQUFzQixDQUFTO0lBQy9CLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBQ2hDLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFFdEIsZUFBZSxDQUFpQjtJ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QUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxTQUFTLENBQUMsTUFBZTtRQUN2QixPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLFlBQVksTUFBTSxDQUFDO0lBQ2hFLENBQUM7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7d0dBaklVLDBCQUEwQixrQkFtQjNCLFVBQVUsYUFDVixpQkFBaUIsYUFDakIsUUFBUTs0RkFyQlAsMEJBQTBCLCtNQUN2QiwrQkFBK0IsZ0RDZC9DLHdvQkFlTTs7NEZERk8sMEJBQTBCO2tCQU50QyxTQUFTOytCQUNFLHFCQUFxQixtQkFHZCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFxQjVDLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxRQUFROzRDQXBCNkIsVUFBVTtzQkFBeEQsWUFBWTt1QkFBQywrQkFBK0I7Z0JBQ3BDLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLW5nLWZvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5jb25zdCBNSU5fVklSVFVBTF9TQ1JPTExfV0lEVEggPSAzMDA7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXZpcnR1YWwtc2Nyb2xsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpcnR1YWwtc2Nyb2xsLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aXJ0dWFsLXNjcm9sbC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVZpcnR1YWxTY3JvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkKEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUpIHZpcnR1YWxGb3I6IEJpenlWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmU7XG4gIEBJbnB1dCgpIGl0ZW1NaW5IZWlnaHQ6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgaXRlbU1pbldpZHRoOiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHZpZXdwb3J0SGVpZ2h0OiBzdHJpbmc7IC8vIGNzcyBoZWlnaHQgdmFsdWUgIFxuXG4gIHZpcnR1YWxTY3JvbGxJdGVtczogQXJyYXk8YW55PiA9IFtdO1xuICBpdGVtc0J5Um93OiBudW1iZXI7XG4gIGl0ZW1zOiBBcnJheTxhbnk+O1xuICBfaXRlbU1pbkhlaWdodDogbnVtYmVyO1xuICBiaXp5VmlydHVhbFNjcm9sbFdpZHRoOiBudW1iZXI7XG4gIG5vdGlmaWVyJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNmb250U2l6ZTogbnVtYmVyID0gMDtcblxuICAjcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuICAjbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLiNpc1N0cmluZyh0aGlzLml0ZW1NaW5IZWlnaHQpICYmIHRoaXMuaXRlbU1pbkhlaWdodC5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgIHRoaXMuX2l0ZW1NaW5IZWlnaHQgPSBOdW1iZXIodGhpcy5pdGVtTWluSGVpZ2h0LnNwbGl0KCdyZW0nKVswXSkgKiAxNDsgLy8gMTQgZm9udCBzaXplIGFwcm94XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2l0ZW1NaW5IZWlnaHQgPSB0aGlzLml0ZW1NaW5IZWlnaHQgYXMgbnVtYmVyO1xuICAgIH1cblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsV2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xuICAgICAgaWYgKCF2aXJ0dWFsU2Nyb2xsV2lkdGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPSB2aXJ0dWFsU2Nyb2xsV2lkdGg7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMudmlydHVhbEZvci5pdGVtcy5zdWJzY3JpYmUoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgICAgdGhpcy4jZmlsbFZpcnR1YWxTY3JvbGwoKTtcblxuICAgICAgICAgIGlmICghdGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMubm90aWZpZXIkLm5leHQoKSk7XG4gICAgICAgICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Py5maXJzdENoaWxkPy5maXJzdENoaWxkPy5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLiNmaWxsVmlydHVhbFNjcm9sbCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWVyJC5uZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gW107XG4gICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICAjZmlsbFZpcnR1YWxTY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA8IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCkge1xuICAgICAgdGhpcy5pdGVtc0J5Um93ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLiNmb250U2l6ZSkge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgdGhpcy4jZm9udFNpemUgPSBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pO1xuICAgICAgfVxuICAgICAgY29uc3QgZ3JpZEdhcCA9IHRoaXMuI2ZvbnRTaXplIHx8IDE0O1xuICAgICAgbGV0IGl0ZW1NaW5XaWR0aDogbnVtYmVyID0gMTtcbiAgICAgIGlmICh0aGlzLiNpc1N0cmluZyh0aGlzLml0ZW1NaW5XaWR0aCkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbU1pbldpZHRoLmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgICAgIGl0ZW1NaW5XaWR0aCA9IE51bWJlcih0aGlzLml0ZW1NaW5XaWR0aC5zcGxpdCgncmVtJylbMF0pICogZ3JpZEdhcDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygnZW0nKSkge1xuICAgICAgICAgIGl0ZW1NaW5XaWR0aCA9IE51bWJlcih0aGlzLml0ZW1NaW5XaWR0aC5zcGxpdCgnZW0nKVswXSkgKiBncmlkR2FwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtTWluV2lkdGggPSB0aGlzLml0ZW1NaW5XaWR0aFxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3VudCA9IE1hdGgudHJ1bmModGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoIC8gKGl0ZW1NaW5XaWR0aCkpO1xuICAgICAgaWYgKCgoZ3JpZEdhcCAqIChjb3VudCAtIDEpKSArIChpdGVtTWluV2lkdGggKiBjb3VudCkpIDw9ICh0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGgpKSB7XG4gICAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IGNvdW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pdGVtc0J5Um93ID0gY291bnQgLSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuI3NldEl0ZW1zKCk7XG4gIH1cblxuICAjc2V0SXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgICBjb25zdCBpdGVtc0xlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIGxldCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtc0xlbmd0aDsgaSsrKSB7XG4gICAgICBhcnJheS5wdXNoKHRoaXMuaXRlbXMuc2xpY2UoaSwgaSArIHRoaXMuaXRlbXNCeVJvdykpO1xuICAgICAgaSArPSB0aGlzLml0ZW1zQnlSb3cgLSAxO1xuICAgIH1cblxuICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zLmxlbmd0aCA9IDA7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsSXRlbXMgPSBhcnJheTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAjaXNTdHJpbmcoc3RyaW5nOiB1bmtub3duKTogc3RyaW5nIGlzIHN0cmluZyB7XG4gICAgcmV0dXJuIHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnIHx8IHN0cmluZyBpbnN0YW5jZW9mIFN0cmluZztcbiAgfVxuXG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuI3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdj5cblxuICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0IFxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS12aXJ0dWFsLXNjcm9sbC0taGlkZGVuJzogIXZpcnR1YWxTY3JvbGxJdGVtcyB8fCB2aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoID09PSAwfVwiXG4gICAgY2xhc3M9XCJiaXp5LXZpcnR1YWwtc2Nyb2xsXCJcbiAgICBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHZpZXdwb3J0SGVpZ2h0fVwiXG4gICAgW2l0ZW1TaXplXT1cIl9pdGVtTWluSGVpZ2h0XCJcbiAgICBbbWluQnVmZmVyUHhdPVwiX2l0ZW1NaW5IZWlnaHQgKyAoX2l0ZW1NaW5IZWlnaHQgKiA4KVwiXG4gICAgW21heEJ1ZmZlclB4XT1cIl9pdGVtTWluSGVpZ2h0ICsgKF9pdGVtTWluSGVpZ2h0ICogMTIpXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiB2aXJ0dWFsU2Nyb2xsSXRlbXNcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ2aXJ0dWFsRm9yLnRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICBcbjwvZGl2PiJdfQ==