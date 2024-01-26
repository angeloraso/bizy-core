import { debounceTime, skip, takeUntil } from 'rxjs/operators';
import { Subscription, Subject, interval } from 'rxjs';
import { Component, ContentChild, Input, Inject, ChangeDetectorRef, ElementRef } from '@angular/core';
import { VirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
const MIN_VIRTUAL_SCROLL_WIDTH = 300;
export class VirtualScrollComponent {
    elementRef;
    ref;
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
    _resizeObserver;
    _subscription = new Subscription();
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
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
                const virtualScrollWidth = this.elementRef.nativeElement.offsetWidth;
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
                                    this._resizeObserver.observe(this.elementRef.nativeElement.parentElement?.parentElement);
                                    this._subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                                        if (this.elementRef.nativeElement.offsetWidth) {
                                            this.bizyVirtualScrollWidth = this.elementRef.nativeElement.offsetWidth;
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
            const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
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
        this.virtualScrollItems.length = 0;
        this.virtualScrollItems = array;
        this.ref.detectChanges();
    };
    #isString(string) {
        return typeof string === 'string' || string instanceof String;
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: VirtualScrollComponent, selector: "bizy-virtual-scroll", inputs: { itemMinHeight: "itemMinHeight", itemMinWidth: "itemMinWidth", emptyText: "emptyText", viewportHeight: "viewportHeight" }, queries: [{ propertyName: "virtualFor", first: true, predicate: VirtualScrollNgForDirective, descendants: true }], ngImport: i0, template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: VirtualScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-virtual-scroll', template: "<div>\n\n  <cdk-virtual-scroll-viewport \n    *ngIf=\"virtualScrollItems.length !== 0\"\n    class=\"bizy-virtual-scroll\"\n    [itemSize]=\"_itemMinHeight\"\n    [ngStyle]=\"{'height': viewportHeight}\"\n    [minBufferPx]=\"_itemMinHeight + (_itemMinHeight * 8)\"\n    [maxBufferPx]=\"_itemMinHeight + (_itemMinHeight * 12)\">\n    <ng-content></ng-content>\n    <div *cdkVirtualFor=\"let item of virtualScrollItems\">\n      <ng-container *ngTemplateOutlet=\"virtualFor.template; context: { $implicit: item }\"></ng-container>\n    </div>\n  </cdk-virtual-scroll-viewport>\n  \n  <span *ngIf=\"virtualScrollItems.length === 0\" class=\"bizy-virtual-scroll--empty\">{{emptyText}}</span>\n\n</div>", styles: [":host{font-size:1rem}.bizy-virtual-scroll{width:100%;font-size:1em;height:var(--bizy-virtual-scroll-height)}.bizy-virtual-scroll--empty{min-height:6rem;font-size:1.4rem;display:grid;place-items:center;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { virtualFor: [{
                type: ContentChild,
                args: [VirtualScrollNgForDirective]
            }], itemMinHeight: [{
                type: Input
            }], itemMinWidth: [{
                type: Input
            }], emptyText: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWlCLE1BQU0sRUFBRSxpQkFBaUIsRUFBVSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0gsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFFaEYsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUM7QUFNckMsTUFBTSxPQUFPLHNCQUFzQjtJQWtCSDtJQUNPO0lBbEJNLFVBQVUsQ0FBOEI7SUFDMUUsYUFBYSxDQUFrQjtJQUMvQixZQUFZLENBQWtCO0lBQzlCLFNBQVMsR0FBVyw0QkFBNEIsQ0FBQztJQUNqRCxjQUFjLENBQVMsQ0FBQyxxQkFBcUI7SUFFdEQsa0JBQWtCLEdBQWUsRUFBRSxDQUFDO0lBQ3BDLFVBQVUsQ0FBUztJQUNuQixLQUFLLENBQWE7SUFDbEIsY0FBYyxDQUFTO0lBQ3ZCLHNCQUFzQixDQUFTO0lBQy9CLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRXhCLGVBQWUsQ0FBaUI7SUFDaEMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFF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TGxDLFNBQVM7K0JBQ0UscUJBQXFCOzswQkFzQjVCLE1BQU07MkJBQUMsVUFBVTs7MEJBQ2pCLE1BQU07MkJBQUMsaUJBQWlCOzRDQWxCZ0IsVUFBVTtzQkFBcEQsWUFBWTt1QkFBQywyQkFBMkI7Z0JBQ2hDLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHNraXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCwgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLW5nLWZvci5kaXJlY3RpdmUnO1xuXG5jb25zdCBNSU5fVklSVFVBTF9TQ1JPTExfV0lEVEggPSAzMDA7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXZpcnR1YWwtc2Nyb2xsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpcnR1YWwtc2Nyb2xsLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aXJ0dWFsLXNjcm9sbC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQENvbnRlbnRDaGlsZChWaXJ0dWFsU2Nyb2xsTmdGb3JEaXJlY3RpdmUpIHZpcnR1YWxGb3I6IFZpcnR1YWxTY3JvbGxOZ0ZvckRpcmVjdGl2ZTtcbiAgQElucHV0KCkgaXRlbU1pbkhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtTWluV2lkdGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgZW1wdHlUZXh0OiBzdHJpbmcgPSAnU2luIGVsZW1lbnRvcyBwYXJhIG1vc3RyYXInO1xuICBASW5wdXQoKSB2aWV3cG9ydEhlaWdodDogc3RyaW5nOyAvLyBjc3MgaGVpZ2h0IHZhbHVlICBcblxuICB2aXJ0dWFsU2Nyb2xsSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcbiAgaXRlbXNCeVJvdzogbnVtYmVyO1xuICBpdGVtczogQXJyYXk8YW55PjtcbiAgX2l0ZW1NaW5IZWlnaHQ6IG51bWJlcjtcbiAgYml6eVZpcnR1YWxTY3JvbGxXaWR0aDogbnVtYmVyO1xuICBub3RpZmllciQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy4jaXNTdHJpbmcodGhpcy5pdGVtTWluSGVpZ2h0KSAmJiB0aGlzLml0ZW1NaW5IZWlnaHQuaW5jbHVkZXMoJ3JlbScpKSB7XG4gICAgICB0aGlzLl9pdGVtTWluSGVpZ2h0ID0gTnVtYmVyKHRoaXMuaXRlbU1pbkhlaWdodC5zcGxpdCgncmVtJylbMF0pICogMTQ7IC8vIDE0IGZvbnQgc2l6ZSBhcHJveFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtTWluSGVpZ2h0ID0gdGhpcy5pdGVtTWluSGVpZ2h0IGFzIG51bWJlcjtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBmaW5pc2hJbnRlcnZhbCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgICAgaW50ZXJ2YWwoNTApLnBpcGUodGFrZVVudGlsKGZpbmlzaEludGVydmFsJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxXaWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBpZiAodmlydHVhbFNjcm9sbFdpZHRoKSB7XG4gICAgICAgICAgZmluaXNoSW50ZXJ2YWwkLm5leHQoKTtcbiAgICAgICAgICBmaW5pc2hJbnRlcnZhbCQuY29tcGxldGUoKTtcbiAgICAgICAgICB0aGlzLmJpenlWaXJ0dWFsU2Nyb2xsV2lkdGggPSB2aXJ0dWFsU2Nyb2xsV2lkdGg7XG4gICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnZpcnR1YWxGb3IuaXRlbXMuc3Vic2NyaWJlKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtcykge1xuICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGxWaXJ0dWFsU2Nyb2xsKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLm5vdGlmaWVyJC5uZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsVmlydHVhbFNjcm9sbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZmlsbFZpcnR1YWxTY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCA8IE1JTl9WSVJUVUFMX1NDUk9MTF9XSURUSCkge1xuICAgICAgdGhpcy5pdGVtc0J5Um93ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG4gICAgICBjb25zdCBncmlkR2FwID0gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKSB8fCAxNDtcbiAgICAgIGxldCBpdGVtTWluV2lkdGg6IG51bWJlciA9IDE7XG4gICAgICBpZiAodGhpcy4jaXNTdHJpbmcodGhpcy5pdGVtTWluV2lkdGgpKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1NaW5XaWR0aC5pbmNsdWRlcygncmVtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ3JlbScpWzBdKSAqIGdyaWRHYXA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pdGVtTWluV2lkdGguaW5jbHVkZXMoJ2VtJykpIHtcbiAgICAgICAgICBpdGVtTWluV2lkdGggPSBOdW1iZXIodGhpcy5pdGVtTWluV2lkdGguc3BsaXQoJ2VtJylbMF0pICogZ3JpZEdhcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbU1pbldpZHRoID0gdGhpcy5pdGVtTWluV2lkdGhcbiAgICAgIH1cblxuICAgICAgY29uc3QgY291bnQgPSBNYXRoLnRydW5jKHRoaXMuYml6eVZpcnR1YWxTY3JvbGxXaWR0aCAvIChpdGVtTWluV2lkdGgpKTtcbiAgICAgIGlmICgoKGdyaWRHYXAgKiAoY291bnQgLSAxKSkgKyAoaXRlbU1pbldpZHRoICogY291bnQpKSA8PSAodGhpcy5iaXp5VmlydHVhbFNjcm9sbFdpZHRoKSkge1xuICAgICAgICB0aGlzLml0ZW1zQnlSb3cgPSBjb3VudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlbXNCeVJvdyA9IGNvdW50IC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiNzZXRJdGVtcygpO1xuICB9XG5cbiAgI3NldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGFycmF5OiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3QgaXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXNMZW5ndGg7IGkrKykge1xuICAgICAgYXJyYXkucHVzaCh0aGlzLml0ZW1zLnNsaWNlKGksIGkgKyB0aGlzLml0ZW1zQnlSb3cpKTtcbiAgICAgIGkgKz0gdGhpcy5pdGVtc0J5Um93IC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnZpcnR1YWxTY3JvbGxJdGVtcy5sZW5ndGggPSAwO1xuICAgIHRoaXMudmlydHVhbFNjcm9sbEl0ZW1zID0gYXJyYXk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgI2lzU3RyaW5nKHN0cmluZzogdW5rbm93bik6IHN0cmluZyBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyB8fCBzdHJpbmcgaW5zdGFuY2VvZiBTdHJpbmc7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2PlxuXG4gIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQgXG4gICAgKm5nSWY9XCJ2aXJ0dWFsU2Nyb2xsSXRlbXMubGVuZ3RoICE9PSAwXCJcbiAgICBjbGFzcz1cImJpenktdmlydHVhbC1zY3JvbGxcIlxuICAgIFtpdGVtU2l6ZV09XCJfaXRlbU1pbkhlaWdodFwiXG4gICAgW25nU3R5bGVdPVwieydoZWlnaHQnOiB2aWV3cG9ydEhlaWdodH1cIlxuICAgIFttaW5CdWZmZXJQeF09XCJfaXRlbU1pbkhlaWdodCArIChfaXRlbU1pbkhlaWdodCAqIDgpXCJcbiAgICBbbWF4QnVmZmVyUHhdPVwiX2l0ZW1NaW5IZWlnaHQgKyAoX2l0ZW1NaW5IZWlnaHQgKiAxMilcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGRpdiAqY2RrVmlydHVhbEZvcj1cImxldCBpdGVtIG9mIHZpcnR1YWxTY3JvbGxJdGVtc1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInZpcnR1YWxGb3IudGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gIFxuICA8c3BhbiAqbmdJZj1cInZpcnR1YWxTY3JvbGxJdGVtcy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImJpenktdmlydHVhbC1zY3JvbGwtLWVtcHR5XCI+e3tlbXB0eVRleHR9fTwvc3Bhbj5cblxuPC9kaXY+Il19