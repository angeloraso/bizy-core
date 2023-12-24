import { takeUntil, skip, debounceTime } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { ElementRef, Renderer2, Directive, Inject, TemplateRef, Input, ChangeDetectorRef, Component, ContentChild, ViewChild, NgModule } from '@angular/core';
import { Subject, interval, BehaviorSubject, Subscription } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';

class VirtualScrollGridDirective {
    elRef;
    renderer;
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
        this.renderer.setStyle(this.elRef.nativeElement, 'gap', '1em');
        this.renderer.setStyle(this.elRef.nativeElement, 'marginBottom', '1em');
        const notifier = new Subject();
        const check = interval(100);
        check.pipe(takeUntil(notifier)).subscribe(() => {
            if (this.elRef.nativeElement.offsetParent) {
                notifier.next();
                notifier.complete();
                const bizyVirtualScrollComponent = this.elRef.nativeElement.offsetParent.offsetParent.parentElement.parentElement;
                let itemMinHeight = bizyVirtualScrollComponent.getAttribute('itemminheight');
                if (!itemMinHeight.includes('em') && !itemMinHeight.includes('rem') && !itemMinHeight.includes('px')) {
                    itemMinHeight = `${itemMinHeight}px`;
                }
                let itemMinWidth = bizyVirtualScrollComponent.getAttribute('itemminwidth');
                if (!itemMinWidth.includes('em') && !itemMinWidth.includes('rem') && !itemMinWidth.includes('px')) {
                    itemMinWidth = `${itemMinWidth}px`;
                }
                if (itemMinWidth.includes('rem')) {
                    const fontSize = window.getComputedStyle(this.elRef.nativeElement, null).getPropertyValue('font-size');
                    if (fontSize) {
                        itemMinWidth = `${Number(itemMinWidth.split('rem')[0])}em`;
                    }
                }
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateColumns', `repeat(auto-fill, minmax(${itemMinWidth}, 1fr))`);
                this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateRows', itemMinHeight);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollGridDirective, deps: [{ token: ElementRef }, { token: Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: VirtualScrollGridDirective, selector: "[virtualScrollGrid]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualScrollGrid]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.Renderer2, decorators: [{
                    type: Inject,
                    args: [Renderer2]
                }] }]; } });

class VirtualScrollNgForDirective {
    template;
    _items = new BehaviorSubject([]);
    get items() {
        return this._items.asObservable();
    }
    set virtualNgForIn(items) {
        this._items.next(items);
    }
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollNgForDirective, deps: [{ token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.11", type: VirtualScrollNgForDirective, selector: "[virtualNgFor]", inputs: { virtualNgForIn: "virtualNgForIn" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollNgForDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[virtualNgFor]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { virtualNgForIn: [{
                type: Input
            }] } });

const MIN_VIRTUAL_SCROLL_WIDTH = 300;
class VirtualScrollComponent {
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

class VirtualScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollModule, declarations: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective], imports: [CommonModule, ScrollingModule], exports: [VirtualScrollComponent,
            VirtualScrollGridDirective,
            VirtualScrollNgForDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollModule, imports: [CommonModule, ScrollingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: VirtualScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    declarations: [
                        VirtualScrollComponent,
                        VirtualScrollGridDirective,
                        VirtualScrollNgForDirective,
                    ],
                    exports: [
                        VirtualScrollComponent,
                        VirtualScrollGridDirective,
                        VirtualScrollNgForDirective,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScrollComponent, VirtualScrollGridDirective, VirtualScrollModule, VirtualScrollNgForDirective };
//# sourceMappingURL=bizy-components.mjs.map
