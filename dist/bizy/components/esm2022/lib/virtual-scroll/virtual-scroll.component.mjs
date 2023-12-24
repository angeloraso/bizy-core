import { debounceTime, skip, takeUntil } from 'rxjs/operators';
import { Subscription, Subject, interval } from 'rxjs';
import { Component, ContentChild, Input, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { VirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
const MIN_VIRTUAL_SCROLL_WIDTH = 300;
export class VirtualScrollComponent {
    ref;
    virtualFor;
    virtualScroll;
    itemMinHeight;
    itemMinWidth;
    emptyText = 'Sin elementos para mostrar';
    viewportHeight; // css height value  
    virtualScrollItems;
    itemsByRow;
    items;
    _itemMinHeight;
    bizyVirtualScrollWidth;
    notifier$ = new Subject();
    _resizeObserver;
    _subscription = new Subscription();
    constructor(ref) {
        this.ref = ref;
    }
    ngOnInit() {
        if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
            this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
        }
        else {
            this._itemMinHeight = this.itemMinHeight;
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const finishInterval$ = new Subject();
            interval(50).pipe(takeUntil(finishInterval$)).subscribe(() => {
                const virtualScrollWidth = this.virtualScroll?.elementRef.nativeElement.offsetWidth;
                if (virtualScrollWidth) {
                    finishInterval$.next();
                    finishInterval$.complete();
                    this.bizyVirtualScrollWidth = virtualScrollWidth;
                    this._subscription.add(this.virtualFor.items.subscribe(items => {
                        if (items) {
                            if (items.length > 0) {
                                this.items = items;
                                this.fillVirtualScroll();
                                if (!this._resizeObserver) {
                                    this._resizeObserver = new ResizeObserver(() => this.notifier$.next());
                                    this._resizeObserver.observe(this.virtualScroll?.elementRef?.nativeElement?.parentElement?.parentElement);
                                    this._subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                                        if (this.virtualScroll?.elementRef.nativeElement.offsetWidth) {
                                            this.bizyVirtualScrollWidth = this.virtualScroll?.elementRef.nativeElement.offsetWidth;
                                            this.fillVirtualScroll();
                                        }
                                    }));
                                }
                            }
                            else {
                                this.virtualScrollItems = [];
                            }
                        }
                    }));
                }
            });
        }, 1);
    }
    fillVirtualScroll = () => {
        if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
            this.itemsByRow = 1;
        }
        else {
            const fontSize = window.getComputedStyle(this.virtualScroll?.elementRef.nativeElement).getPropertyValue('font-size');
            const gridGap = Number(fontSize.split('px')[0]) || 14;
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
        this.virtualScrollItems = [...array];
        this.ref.detectChanges();
    };
    #isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: VirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: VirtualScrollNgForDirective, descendants: true }], viewQueries: [{ propertyName: "virtualScroll", first: true, predicate: ["bizyVirtualScroll"], descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    #bizyVirtualScroll \n    class=\"bizy-virtual-scroll\"\n    [hidden]=\"virtualScrollItems && virtualScrollItems.length === 0\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngClass]=\"{'bizy-virtual-scroll--hidden': virtualScrollItems && virtualScrollItems.length === 0}\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems && virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    #bizyVirtualScroll \n    class=\"bizy-virtual-scroll\"\n    [hidden]=\"virtualScrollItems && virtualScrollItems.length === 0\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngClass]=\"{'bizy-virtual-scroll--hidden': virtualScrollItems && virtualScrollItems.length === 0}\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems && virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--hidden{height:0!important}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { virtualFor: [{
                type: ContentChild,
                args: [VirtualScrollNgForDirective]
            }], virtualScroll: [{
                type: ViewChild,
                args: ['bizyVirtualScroll']
            }], itemMinHeight: [{
                type: Input
            }], itemMinWidth: [{
                type: Input
            }], emptyText: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWlCLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFNUgsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFFaEYsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUM7QUFNckMsTUFBTSxPQUFPLHNCQUFzQjtJQWtCYztJQWpCSixVQUFVLENBQThCO0lBQ25ELGFBQWEsQ0FBMkI7SUFDL0QsYUFBYSxDQUFrQjtJQUMvQixZQUFZLENBQWtCO0lBQzlCLFNBQVMsR0FBVyw0QkFBNEIsQ0FBQztJQUNqRCxjQUFjLENBQVMsQ0FBQyxxQkFBcUI7SUFFdEQsa0JBQWtCLENBQWE7SUFDL0IsVUFBVSxDQUFTO0lBQ25CLEtBQUssQ0FBYTtJQUNsQixjQUFjLENBQVM7SUFDdkIsc0JBQXNCLENBQVM7SUFDL0IsU0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFFeEIsZUFBZSxDQUFpQjtJQUNoQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJ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bEIsTUFBTTsyQkFBQyxpQkFBaUI7NENBakJNLFVBQVU7c0JBQXBELFlBQVk7dUJBQUMsMkJBQTJCO2dCQUNULGFBQWE7c0JBQTVDLFNBQVM7dUJBQUMsbUJBQW1CO2dCQUNyQixhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBza2lwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YmplY3QsIGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIEluamVjdCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtbmctZm9yLmRpcmVjdGl2ZSc7XG5cbmNvbnN0IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCA9IDMwMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdmlydHVhbC1zY3JvbGwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlydHVhbC1zY3JvbGwuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpcnR1YWwtc2Nyb2xsLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAQ29udGVudENoaWxkKFZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZSkgdmlydHVhbEZvcjogVmlydHVhbFNjcm9sbE5nRm9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdiaXp5VmlydHVhbFNjcm9sbCcpIHZpcnR1YWxTY3JvbGw6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcbiAgQElucHV0KCkgaXRlbU1pbkhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtTWluV2lkdGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgZW1wdHlUZXh0OiBzdHJpbmcgPSAnU2luIGVsZW1lbnRvcyBwYXJhIG1vc3RyYXInO1xuICBASW5wdXQoKSB2aWV3cG9ydEhlaWdodDogc3RyaW5nOyAvLyBjc3MgaGVpZ2h0IHZhbHVlICBcblxuICB2aXJ0dWFsU2Nyb2xsSXRlbXM6IEFycmF5PGFueT47XG4gIGl0ZW1zQnlSb3c6IG51bWJlcjtcbiAgaXRlbXM6IEFycmF5PGFueT47XG4gIF9pdGVtTWluSGVpZ2h0OiBudW1iZXI7XG4gIGJpenlWaXJ0dWFsU2Nyb2xsV2lkdGg6IG51bWJlcjtcbiAgbm90aWZpZXIkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9yZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuI2lzU3RyaW5nKHRoaXMuaXRlbU1pbkhlaWdodCkgJiYgdGhpcy5pdGVtTWluSGVpZ2h0LmluY2x1ZGVzKCdyZW0nKSkge1xuICAgICAgdGhpcy5faXRlbU1pbkhlaWdodCA9IE51bWJlcih0aGlzLml0ZW1NaW5IZWlnaHQuc3BsaXQoJ3JlbScpWzBdKSAqIDE0OyAvLyAxNCBmb250IHNpemUgYXByb3hcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXRlbU1pbkhlaWdodCA9IHRoaXMuaXRlbU1pbkhlaWdodCBhcyBudW1iZXI7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZmluaXNoSW50ZXJ2YWwkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICAgIGludGVydmFsKDUwKS5waXBlKHRha2VVbnRpbChmaW5pc2hJbnRlcnZhbCQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsV2lkdGggPSB0aGlzLnZpcnR1YWxTY3JvbGw/LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgaWYgKHZpcnR1YWxTY3JvbGxXaWR0aCkge1xuICAgICAgICAgIGZpbmlzaEludGVydmFsJC5uZXh0KCk7XG4gICAgICAgICAgZmluaXNoSW50ZXJ2YWwkLmNvbXBsZXRlKCk7XG4gICAgICAgICAgdGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoID0gdmlydHVhbFNjcm9sbFdpZHRoO1xuICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQodGhpcy52aXJ0dWFsRm9yLml0ZW1zLnN1YnNjcmliZShpdGVtcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsVmlydHVhbFNjcm9sbCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9yZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5ub3RpZmllciQubmV4dCgpKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy52aXJ0dWFsU2Nyb2xsPy5lbGVtZW50UmVmPy5uYXRpdmVFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbD8uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoID0gdGhpcy52aXJ0dWFsU2Nyb2xsPy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsVmlydHVhbFNjcm9sbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZmlsbFZpcnR1YWxTY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA8IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCkge1xuICAgICAgdGhpcy5pdGVtc0J5Um93ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZpcnR1YWxTY3JvbGw/LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG4gICAgICBjb25zdCBncmlkR2FwID0gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKSB8fCAxNDtcbiAgICAgIGxldCBpdGVtTWluV2lkdGg6IG51bWJlciA9IDE7XG4gICAgICBpZiAodGhpcy4jaXNTdHJpbmcodGhpcy5pdGVtTWluV2lkdGgpKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ3JlbScpWzBdKSAqIGdyaWRHYXA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pdGVtTWluV2lkdGguaW5jbHVkZXMoJ2VtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ2VtJylbMF0pICogZ3JpZEdhcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbU1pbldpZHRoID0gdGhpcy5pdGVtTWluV2lkdGhcbiAgICAgIH1cblxuICAgICAgY29uc3QgY291bnQgPSBNYXRoLnRydW5jKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCAvIChpdGVtTWluV2lkdGgpKTtcbiAgICAgIGlmICgoKGdyaWRHYXAgKiAoY291bnQgLSAxKSkgKyAoaXRlbU1pbldpZHRoICogY291bnQpKSA8PSAodGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoKSkge1xuICAgICAgICB0aGlzLml0ZW1zQnlSb3cgPSBjb3VudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IGNvdW50IC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiNzZXRJdGVtcygpO1xuICB9XG5cbiAgI3NldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGFycmF5OiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3QgaXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXNMZW5ndGg7IGkrKykge1xuICAgICAgYXJyYXkucHVzaCh0aGlzLml0ZW1zLnNsaWNlKGksIGkgKyB0aGlzLml0ZW1zQnlSb3cpKTtcbiAgICAgIGkgKz0gdGhpcy5pdGVtc0J5Um93IC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcyA9IFsuLi5hcnJheV07XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2lzU3RyaW5nKHN0cmluZzogdW5rbm93bik6IHN0cmluZyBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyB8fCBzdHJpbmcgaW5zdGFuY2VvZiBTdHJpbmc7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2PlxuXG4gIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQgXG4gICAgI2JpenlWaXJ0dWFsU2Nyb2xsIFxuICAgIGNsYXNzPVwiYml6eS12aXJ0dWFsLXNjcm9sbFwiXG4gICAgW2hpZGRlbl09XCJ2aXJ0dWFsU2Nyb2xsSXRlbXMgJiYgdmlydHVhbFNjcm9sbEl0ZW1zLmxlbmd0aCA9PT0gMFwiXG4gICAgW2l0ZW1TaXplXT1cIl9pdGVtTWluSGVpZ2h0XCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktdmlydHVhbC1zY3JvbGwtLWhpZGRlbic6IHZpcnR1YWxTY3JvbGxJdGVtcyAmJiB2aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoID09PSAwfVwiXG4gICAgW25nU3R5bGVdPVwieydoZWlnaHQnOiB2aWV3cG9ydEhlaWdodH1cIlxuICAgIFttaW5CdWZmZXJQeF09XCJfaXRlbU1pbkhlaWdodCArIChfaXRlbU1pbkhlaWdodCAqIDgpXCJcbiAgICBbbWF4QnVmZmVyUHhdPVwiX2l0ZW1NaW5IZWlnaHQgKyAoX2l0ZW1NaW5IZWlnaHQgKiAxMilcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGRpdiAqY2RrVmlydHVhbEZvcj1cImxldCBpdGVtIG9mIHZpcnR1YWxTY3JvbGxJdGVtc1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInZpcnR1YWxGb3IudGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gIFxuICA8c3BhbiAqbmdJZj1cInZpcnR1YWxTY3JvbGxJdGVtcyAmJiB2aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJiaXp5LXZpcnR1YWwtc2Nyb2xsLS1lbXB0eVwiPnt7ZW1wdHlUZXh0fX08L3NwYW4+XG5cbjwvZGl2PiJdfQ==