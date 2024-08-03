import { debounceTime, skip } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { Component, ContentChild, Input, Inject, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, Renderer2, ViewChild } from '@angular/core';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { DOCUMENT } from '@angular/common';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
const MIN_VIRTUAL_SCROLL_WIDTH = 300; // px
const GRID_GAP = 10; // px
export class BizyVirtualScrollComponent {
    elementRef;
    renderer;
    ref;
    document;
    virtualFor;
    viewport;
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
    #columns = '1fr';
    #listeningScroll = false;
    #resizeObserver;
    #mutationObserver;
    #subscription = new Subscription();
    #scrollSubscription = new Subscription();
    constructor(elementRef, renderer, ref, document) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.ref = ref;
        this.document = document;
    }
    ngOnInit() {
        if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
            const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
            this.#fontSize = fontSize ? Number(fontSize.split('px')[0]) : 14; // 14 font size aprox;
            this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * this.#fontSize;
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
                    this.#listeningScroll = false;
                    this.#scrollSubscription.unsubscribe();
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
            const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
            this.#fontSize = fontSize ? Number(fontSize.split('px')[0]) : GRID_GAP;
            let itemMinWidth = 10 * this.#fontSize;
            if (this.#isString(this.itemMinWidth) && this.itemMinWidth.includes('rem')) {
                itemMinWidth = Number(this.itemMinWidth.split('rem')[0]) * this.#fontSize;
            }
            else if (!this.#isString(this.itemMinWidth)) {
                itemMinWidth = this.itemMinWidth;
            }
            const count = Math.trunc(this.bizyVirtualScrollWidth / (itemMinWidth));
            if (Math.round((GRID_GAP * (count - 1)) + (itemMinWidth * count)) <= (this.bizyVirtualScrollWidth)) {
                this.itemsByRow = count;
            }
            else {
                this.itemsByRow = count - 1;
            }
        }
        this.#columns = '1fr';
        for (let i = 1; i < this.itemsByRow; i++) {
            this.#columns += ' 1fr';
        }
        const array = [];
        const itemsLength = this.items.length;
        for (let i = 0; i < itemsLength; i++) {
            array.push(this.items.slice(i, i + this.itemsByRow));
            i += this.itemsByRow - 1;
        }
        this.virtualScrollItems.length = 0;
        this.virtualScrollItems = array;
        this.ref.detectChanges();
        this.#setGridStyles();
        if (this.viewport && !this.#listeningScroll) {
            this.#scrollSubscription = new Subscription();
            this.#scrollSubscription.add(this.viewport.elementScrolled().pipe(debounceTime(100)).subscribe(() => {
                this.#setGridStyles();
            }));
            this.#listeningScroll = true;
        }
    };
    #isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    #setGridStyles = () => {
        const gridElements = this.elementRef.nativeElement.querySelectorAll('[virtual-scroll-grid]');
        if (!gridElements || gridElements.length === 0) {
            return;
        }
        gridElements.forEach(_grid => {
            this.renderer.setStyle(_grid, 'display', 'grid');
            this.renderer.setStyle(_grid, 'gap', `${GRID_GAP}px`);
            this.renderer.setStyle(_grid, 'marginBottom', `${GRID_GAP}px`);
            this.renderer.setStyle(_grid, 'gridTemplateRows', `${this._itemMinHeight}px`);
            this.renderer.setStyle(_grid, 'gridTemplateColumns', this.#columns);
        });
    };
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        this.#scrollSubscription.unsubscribe();
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, deps: [{ token: ElementRef }, { token: Renderer2 }, { token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyVirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyVirtualScrollNgForDirective, descendants: true }], viewQueries: [{ propertyName: "viewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems && virtualScrollItems.length > 0\"\n    class=\"bizy-virtual-scroll\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [itemSize]=\"_itemMinHeight\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyVirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems && virtualScrollItems.length > 0\"\n    class=\"bizy-virtual-scroll\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [itemSize]=\"_itemMinHeight\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1rem;height:var(--bizy-virtual-scroll-height)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { virtualFor: [{
                type: ContentChild,
                args: [BizyVirtualScrollNgForDirective]
            }], viewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], itemMinHeight: [{
                type: Input
            }], itemMinWidth: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBVSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFbEUsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLO0FBQzNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUs7QUFPMUIsTUFBTSxPQUFPLDBCQUEwQjtJQXVCUDtJQUNEO0lBQ1E7SUFDVDtJQXpCbUIsVUFBVSxDQUFrQztJQUN0RCxRQUFRLENBQTJCO0lBQy9ELGFBQWEsQ0FBa0I7SUFDL0IsWUFBWSxDQUFrQjtJQUM5QixjQUFjLENBQVMsQ0FBQyxxQkFBcUI7SUFFdEQsa0JBQWtCLEdBQWUsRUFBRSxDQUFDO0lBQ3BDLFVB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QUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzt3R0E3SlUsMEJBQTBCLGtCQXVCM0IsVUFBVSxhQUNWLFNBQVMsYUFDVCxpQkFBaUIsYUFDakIsUUFBUTs0RkExQlAsMEJBQTBCLCtNQUN2QiwrQkFBK0IsMEZBQ2xDLHdCQUF3QixnRENqQnJDLGdtQkFlTTs7NEZEQU8sMEJBQTBCO2tCQU50QyxTQUFTOytCQUNFLHFCQUFxQixtQkFHZCx1QkFBdUIsQ0FBQyxNQUFNOzswQkF5QjVDLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsU0FBUzs7MEJBQ2hCLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDeEIsTUFBTTsyQkFBQyxRQUFROzRDQXpCNkIsVUFBVTtzQkFBeEQsWUFBWTt1QkFBQywrQkFBK0I7Z0JBQ1IsUUFBUTtzQkFBNUMsU0FBUzt1QkFBQyx3QkFBd0I7Z0JBQzFCLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5VmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1uZy1mb3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5jb25zdCBNSU5fVklSVFVBTF9TQ1JPTExfV0lEVEggPSAzMDA7IC8vIHB4XG5jb25zdCBHUklEX0dBUCA9IDEwOyAvLyBweFxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS12aXJ0dWFsLXNjcm9sbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi92aXJ0dWFsLXNjcm9sbC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlydHVhbC1zY3JvbGwuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChCaXp5VmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlKSB2aXJ0dWFsRm9yOiBCaXp5VmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkgdmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcbiAgQElucHV0KCkgaXRlbU1pbkhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtTWluV2lkdGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgdmlld3BvcnRIZWlnaHQ6IHN0cmluZzsgLy8gY3NzIGhlaWdodCB2YWx1ZSAgXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIGl0ZW1zQnlSb3c6IG51bWJlcjtcbiAgaXRlbXM6IEFycmF5PGFueT47XG4gIF9pdGVtTWluSGVpZ2h0OiBudW1iZXI7XG4gIGJpenlWaXJ0dWFsU2Nyb2xsV2lkdGg6IG51bWJlcjtcbiAgbm90aWZpZXIkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI2ZvbnRTaXplOiBudW1iZXIgPSAwO1xuICAjY29sdW1uczogc3RyaW5nID0gJzFmcic7XG4gICNsaXN0ZW5pbmdTY3JvbGwgPSBmYWxzZTtcblxuICAjcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuICAjbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgI3Njcm9sbFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuI2lzU3RyaW5nKHRoaXMuaXRlbU1pbkhlaWdodCkgJiYgdGhpcy5pdGVtTWluSGVpZ2h0LmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgY29uc3QgZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG4gICAgICB0aGlzLiNmb250U2l6ZSA9IGZvbnRTaXplID8gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKSA6IDE0OyAvLyAxNCBmb250IHNpemUgYXByb3g7XG4gICAgICB0aGlzLl9pdGVtTWluSGVpZ2h0ID0gTnVtYmVyKHRoaXMuaXRlbU1pbkhlaWdodC5zcGxpdCgncmVtJylbMF0pICogdGhpcy4jZm9udFNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2l0ZW1NaW5IZWlnaHQgPSB0aGlzLml0ZW1NaW5IZWlnaHQgYXMgbnVtYmVyO1xuICAgIH1cblxuICAgIHRoaXMuI211dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsV2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLm9mZnNldFdpZHRoO1xuICAgICAgaWYgKCF2aXJ0dWFsU2Nyb2xsV2lkdGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPSB2aXJ0dWFsU2Nyb2xsV2lkdGg7XG4gICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMudmlydHVhbEZvci5pdGVtcy5zdWJzY3JpYmUoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgICAgdGhpcy4jZmlsbFZpcnR1YWxTY3JvbGwoKTtcblxuICAgICAgICAgIGlmICghdGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMubm90aWZpZXIkLm5leHQoKSk7XG4gICAgICAgICAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLm5vdGlmaWVyJC5waXBlKHNraXAoMSksIGRlYm91bmNlVGltZSgxMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ/LmZpcnN0Q2hpbGQ/LmZpcnN0Q2hpbGQ/LmNsaWVudFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5maXJzdENoaWxkLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuI2ZpbGxWaXJ0dWFsU2Nyb2xsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZpZXIkLm5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4jbGlzdGVuaW5nU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy4jc2Nyb2xsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsSXRlbXMgPSBbXTtcbiAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfVxuXG4gICNmaWxsVmlydHVhbFNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoIDwgTUlOX1ZJUlRVQUxfU0NST0xMX1dJRFRIKSB7XG4gICAgICB0aGlzLml0ZW1zQnlSb3cgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgIHRoaXMuI2ZvbnRTaXplID0gZm9udFNpemUgPyBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pIDogR1JJRF9HQVA7XG4gICAgICBsZXQgaXRlbU1pbldpZHRoOiBudW1iZXIgPSAxMCAqIHRoaXMuI2ZvbnRTaXplO1xuICAgICAgaWYgKHRoaXMuI2lzU3RyaW5nKHRoaXMuaXRlbU1pbldpZHRoKSAmJiB0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgICAgaXRlbU1pbldpZHRoID0gTnVtYmVyKHRoaXMuaXRlbU1pbldpZHRoLnNwbGl0KCdyZW0nKVswXSkgKiB0aGlzLiNmb250U2l6ZTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuI2lzU3RyaW5nKHRoaXMuaXRlbU1pbldpZHRoKSkge1xuICAgICAgICBpdGVtTWluV2lkdGggPSB0aGlzLml0ZW1NaW5XaWR0aFxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb3VudCA9IE1hdGgudHJ1bmModGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoIC8gKGl0ZW1NaW5XaWR0aCkpO1xuICAgICAgaWYgKE1hdGgucm91bmQoKEdSSURfR0FQICogKGNvdW50IC0gMSkpICsgKGl0ZW1NaW5XaWR0aCAqIGNvdW50KSkgPD0gKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCkpIHtcbiAgICAgICAgdGhpcy5pdGVtc0J5Um93ID0gY291bnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLml0ZW1zQnlSb3cgPSBjb3VudCAtIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4jY29sdW1ucyA9ICcxZnInO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5pdGVtc0J5Um93OyBpKyspIHtcbiAgICAgIHRoaXMuI2NvbHVtbnMgKz0gJyAxZnInO1xuICAgIH1cblxuICAgIGNvbnN0IGFycmF5OiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3QgaXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycmF5LnB1c2godGhpcy5pdGVtcy5zbGljZShpLCBpICsgdGhpcy5pdGVtc0J5Um93KSk7XG4gICAgICBpICs9IHRoaXMuaXRlbXNCeVJvdyAtIDE7XG4gICAgfVxuXG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcyA9IGFycmF5O1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIHRoaXMuI3NldEdyaWRTdHlsZXMoKTtcblxuICAgIGlmICh0aGlzLnZpZXdwb3J0ICYmICF0aGlzLiNsaXN0ZW5pbmdTY3JvbGwpIHtcbiAgICAgIHRoaXMuI3Njcm9sbFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgIHRoaXMuI3Njcm9sbFN1YnNjcmlwdGlvbi5hZGQodGhpcy52aWV3cG9ydC5lbGVtZW50U2Nyb2xsZWQoKS5waXBlKGRlYm91bmNlVGltZSgxMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLiNzZXRHcmlkU3R5bGVzKCk7XG4gICAgICB9KSk7XG4gICAgICB0aGlzLiNsaXN0ZW5pbmdTY3JvbGwgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gICNpc1N0cmluZyhzdHJpbmc6IHVua25vd24pOiBzdHJpbmcgaXMgc3RyaW5nIHtcbiAgICByZXR1cm4gdHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgfHwgc3RyaW5nIGluc3RhbmNlb2YgU3RyaW5nO1xuICB9XG5cbiAgI3NldEdyaWRTdHlsZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZEVsZW1lbnRzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3ZpcnR1YWwtc2Nyb2xsLWdyaWRdJyk7XG4gICAgaWYgKCFncmlkRWxlbWVudHMgfHwgZ3JpZEVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdyaWRFbGVtZW50cy5mb3JFYWNoKF9ncmlkID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoX2dyaWQsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoX2dyaWQsICdnYXAnLCBgJHtHUklEX0dBUH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShfZ3JpZCwgJ21hcmdpbkJvdHRvbScsIGAke0dSSURfR0FQfXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKF9ncmlkLCAnZ3JpZFRlbXBsYXRlUm93cycsIGAke3RoaXMuX2l0ZW1NaW5IZWlnaHR9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoX2dyaWQsICdncmlkVGVtcGxhdGVDb2x1bW5zJywgdGhpcy4jY29sdW1ucyk7XG4gICAgfSk7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuI3Njcm9sbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXY+XG5cbiAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCBcbiAgICAqbmdJZj1cInZpcnR1YWxTY3JvbGxJdGVtcyAmJiB2aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoID4gMFwiXG4gICAgY2xhc3M9XCJiaXp5LXZpcnR1YWwtc2Nyb2xsXCJcbiAgICBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHZpZXdwb3J0SGVpZ2h0fVwiXG4gICAgW2l0ZW1TaXplXT1cIl9pdGVtTWluSGVpZ2h0XCJcbiAgICBbbWluQnVmZmVyUHhdPVwiX2l0ZW1NaW5IZWlnaHQgKyAoX2l0ZW1NaW5IZWlnaHQgKiA4KVwiXG4gICAgW21heEJ1ZmZlclB4XT1cIl9pdGVtTWluSGVpZ2h0ICsgKF9pdGVtTWluSGVpZ2h0ICogMTIpXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiB2aXJ0dWFsU2Nyb2xsSXRlbXNcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ2aXJ0dWFsRm9yLnRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICBcbjwvZGl2PiJdfQ==