import { Component, Input, ChangeDetectionStrategy, ContentChildren, ContentChild, Inject, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BizyTableHeaderComponent } from './table-header/table-header.component';
import { BizyTableFooterComponent } from './table-footer/table-footer.component';
import { BizyTableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription, debounceTime, fromEvent, skip } from 'rxjs';
import { BizyTableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { BizyTableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import * as i0 from "@angular/core";
import * as i1 from "./table-scrolling/table-scrolling.component";
export class BizyTableComponent {
    ref;
    document;
    renderer;
    elementRef;
    viewport;
    virtualFor;
    rows;
    headers;
    footers;
    resizeRef = null;
    #selectableMutationObserver;
    #rowScrollingMutationObserver;
    #afterContentInitObserver;
    #resizeObserver;
    notifier$ = new Subject();
    #subscription = new Subscription();
    marginRight = 0;
    marginLeft = 0;
    set selectable(selectable) {
        this.#selectableMutationObserver = new MutationObserver(() => {
            if (!this.rows || this.rows.length === 0) {
                return;
            }
            this.rows.forEach(_row => {
                _row.setSelectable(selectable);
                _row.setMarginRight(this.marginRight);
                _row.setMarginLeft(this.marginLeft);
            });
            this.headers.forEach(_header => {
                _header.setSelectable(selectable);
            });
            this.footers.forEach(_footer => {
                _footer.setSelectable(selectable);
            });
            this.ref.detectChanges();
        });
        this.#selectableMutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    ;
    constructor(ref, document, renderer, elementRef) {
        this.ref = ref;
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.virtualFor || !this.viewport) {
                return;
            }
            if (this.elementRef.nativeElement.offsetHeight) {
                const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
                const gap = Number(fontSize.split('px')[0]) * 0.3;
                let headersHeight = 0;
                this.headers.forEach(_header => {
                    headersHeight += _header.elementRef.nativeElement.offsetHeight + gap;
                });
                let footersHeight = 0;
                this.footers.forEach(_footer => {
                    footersHeight += _footer.elementRef.nativeElement.offsetHeight + gap;
                });
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - headersHeight - footersHeight}px`);
            }
            this.viewport.attachView(this.virtualFor);
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
            this.#afterContentInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                this.marginLeft = this.elementRef.nativeElement.scrollLeft;
                this.rows.forEach(_row => {
                    _row.setMarginRight(this.marginRight);
                    _row.setMarginLeft(this.marginLeft);
                });
                this.headers.forEach(_header => {
                    _header.setMarginRight(this.marginRight);
                    _header.setMarginLeft(this.marginLeft);
                });
                this.footers.forEach(_footer => {
                    _footer.setMarginRight(this.marginRight);
                    _footer.setMarginLeft(this.marginLeft);
                });
                this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).subscribe(() => {
                    this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                    this.marginLeft = this.elementRef.nativeElement.scrollLeft;
                    this.rows.forEach(_row => {
                        _row.setMarginRight(this.marginRight);
                        _row.setMarginLeft(this.marginLeft);
                    });
                    this.headers.forEach(_header => {
                        _header.setMarginRight(this.marginRight);
                        _header.setMarginLeft(this.marginLeft);
                    });
                    this.footers.forEach(_footer => {
                        _footer.setMarginRight(this.marginRight);
                        _footer.setMarginLeft(this.marginLeft);
                    });
                }));
                this.#afterContentInitObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#afterContentInitObserver.observe(this.document.body, { childList: true, subtree: true });
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        const resizeRef = this.resizeRef ? this.resizeRef : this.renderer.parentNode(this.elementRef.nativeElement) ? this.renderer.parentNode(this.elementRef.nativeElement) : this.elementRef.nativeElement;
        this.#resizeObserver.observe(resizeRef);
        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(200)).subscribe(() => {
            if (this.viewport && this.elementRef.nativeElement.offsetHeight) {
                const fontSize = getComputedStyle(this.document.documentElement).getPropertyValue('font-size');
                const gap = Number(fontSize.split('px')[0]) * 0.3;
                let headersHeight = 0;
                this.headers.forEach(_header => {
                    headersHeight += _header.elementRef.nativeElement.offsetHeight + gap;
                });
                let footersHeight = 0;
                this.footers.forEach(_footer => {
                    footersHeight += _footer.elementRef.nativeElement.offsetHeight + gap;
                });
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - headersHeight - footersHeight}px`);
            }
            this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
            this.marginLeft = this.elementRef.nativeElement.scrollLeft;
            this.rows.forEach(_row => {
                _row.setMarginRight(this.marginRight);
                _row.setMarginLeft(this.marginLeft);
            });
            this.headers.forEach(_header => {
                _header.setMarginRight(this.marginRight);
                _header.setMarginLeft(this.marginLeft);
            });
            this.footers.forEach(_footer => {
                _footer.setMarginRight(this.marginRight);
                _footer.setMarginLeft(this.marginLeft);
            });
        }));
        this.notifier$.next();
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#selectableMutationObserver) {
            this.#selectableMutationObserver.disconnect();
        }
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#afterContentInitObserver) {
            this.#afterContentInitObserver.disconnect();
        }
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: Renderer2 }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableComponent, selector: "bizy-table", inputs: { resizeRef: "resizeRef", selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyTableScrollingDirective, descendants: true }, { propertyName: "rows", predicate: BizyTableRowComponent }, { propertyName: "headers", predicate: BizyTableHeaderComponent }, { propertyName: "footers", predicate: BizyTableFooterComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: BizyTableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: i1.BizyTableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
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
                }] }]; }, propDecorators: { viewport: [{
                type: ViewChild,
                args: [BizyTableScrollingComponent]
            }], virtualFor: [{
                type: ContentChild,
                args: [BizyTableScrollingDirective]
            }], rows: [{
                type: ContentChildren,
                args: [BizyTableRowComponent]
            }], headers: [{
                type: ContentChildren,
                args: [BizyTableHeaderComponent]
            }], footers: [{
                type: ContentChildren,
                args: [BizyTableFooterComponent]
            }], resizeRef: [{
                type: Input
            }], selectable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuTSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7OztBQVExRixNQUFNLE9BQU8sa0JBQWtCO0lBNENRO0lBQ1Q7SUFDQztJQUNDO0lBOUNVLFFBQVEsQ0FBOEI7SUFDbkMsVUFBVSxDQUE4QjtJQUMzQyxJQUFJLENBQW1DO0lBQ3BDLE9BQU8sQ0FBc0M7SUFDN0MsT0FBTyxDQUFzQztJQUMvRSxTQUFTLEdBQWUsSUFBSSxDQUFDO0lBRXRDLDJCQUEyQixDQUFtQjtJQUM5Qyw2QkFB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LDJCQUEyQiwwREFDeEIscUJBQXFCLDBDQUNyQix3QkFBd0IsMENBQ3hCLHdCQUF3Qix1RUFKOUIsMkJBQTJCLGdEQ2hCeEMseVRBWU07OzRGREdPLGtCQUFrQjtrQkFOOUIsU0FBUzsrQkFDRSxZQUFZLG1CQUdMLHVCQUF1QixDQUFDLE1BQU07OzBCQThDNUMsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsU0FBUzs7MEJBQ2hCLE1BQU07MkJBQUMsVUFBVTs0Q0E5Q29CLFFBQVE7c0JBQS9DLFNBQVM7dUJBQUMsMkJBQTJCO2dCQUNLLFVBQVU7c0JBQXBELFlBQVk7dUJBQUMsMkJBQTJCO2dCQUNELElBQUk7c0JBQTNDLGVBQWU7dUJBQUMscUJBQXFCO2dCQUNLLE9BQU87c0JBQWpELGVBQWU7dUJBQUMsd0JBQXdCO2dCQUNFLE9BQU87c0JBQWpELGVBQWU7dUJBQUMsd0JBQXdCO2dCQUNoQyxTQUFTO3NCQUFqQixLQUFLO2dCQVdPLFVBQVU7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpenlUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaGVhZGVyL3RhYmxlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCaXp5VGFibGVSb3dDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXJvdy90YWJsZS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZGVib3VuY2VUaW1lLCBmcm9tRXZlbnQsIHNraXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJpenlUYWJsZVNjcm9sbGluZ0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nL3RhYmxlLXNjcm9sbGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQFZpZXdDaGlsZChCaXp5VGFibGVTY3JvbGxpbmdDb21wb25lbnQpIHZpZXdwb3J0OiBCaXp5VGFibGVTY3JvbGxpbmdDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGQoQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlKSB2aXJ0dWFsRm9yOiBCaXp5VGFibGVTY3JvbGxpbmdEaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVRhYmxlUm93Q29tcG9uZW50KSByb3dzOiBRdWVyeUxpc3Q8Qml6eVRhYmxlUm93Q29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5VGFibGVIZWFkZXJDb21wb25lbnQpIGhlYWRlcnM6IFF1ZXJ5TGlzdDxCaXp5VGFibGVIZWFkZXJDb21wb25lbnQ+O1xuICBAQ29udGVudENoaWxkcmVuKEJpenlUYWJsZUZvb3RlckNvbXBvbmVudCkgZm9vdGVyczogUXVlcnlMaXN0PEJpenlUYWJsZUZvb3RlckNvbXBvbmVudD47XG4gIEBJbnB1dCgpIHJlc2l6ZVJlZjogRWxlbWVudFJlZiA9IG51bGw7XG5cbiAgI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI2FmdGVyQ29udGVudEluaXRPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgbm90aWZpZXIkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgbWFyZ2luUmlnaHQ6IG51bWJlciA9IDA7XG4gIG1hcmdpbkxlZnQ6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KCkgc2V0IHNlbGVjdGFibGUoc2VsZWN0YWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJvd3MgfHwgdGhpcy5yb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICBfcm93LnNldFNlbGVjdGFibGUoc2VsZWN0YWJsZSk7XG4gICAgICAgIF9yb3cuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgIF9yb3cuc2V0TWFyZ2luTGVmdCh0aGlzLm1hcmdpbkxlZnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaGVhZGVycy5mb3JFYWNoKF9oZWFkZXIgPT4ge1xuICAgICAgICBfaGVhZGVyLnNldFNlbGVjdGFibGUoc2VsZWN0YWJsZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5mb290ZXJzLmZvckVhY2goX2Zvb3RlciA9PiB7XG4gICAgICAgIF9mb290ZXIuc2V0U2VsZWN0YWJsZShzZWxlY3RhYmxlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgXG4gICAgfSk7XG5cbiAgICB0aGlzLiNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnZpcnR1YWxGb3IgfHwgIXRoaXMudmlld3BvcnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gIGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpO1xuICAgICAgICBjb25zdCBnYXAgPSBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pICogMC4zO1xuICAgICAgICBsZXQgaGVhZGVyc0hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuaGVhZGVycy5mb3JFYWNoKF9oZWFkZXIgPT4ge1xuICAgICAgICAgIGhlYWRlcnNIZWlnaHQgKz0gX2hlYWRlci5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgZ2FwO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgZm9vdGVyc0hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuZm9vdGVycy5mb3JFYWNoKF9mb290ZXIgPT4ge1xuICAgICAgICAgIGZvb3RlcnNIZWlnaHQgKz0gX2Zvb3Rlci5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgZ2FwO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAtIGhlYWRlcnNIZWlnaHQgLSBmb290ZXJzSGVpZ2h0fXB4YClcbiAgICAgIH1cblxuICAgICAgdGhpcy52aWV3cG9ydC5hdHRhY2hWaWV3KHRoaXMudmlydHVhbEZvcik7XG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICBcbiAgICAgIFxuICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gIFxuICAgICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPyAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkgLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IDogMDtcbiAgICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgICAgX3Jvdy5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICBfcm93LnNldE1hcmdpbkxlZnQodGhpcy5tYXJnaW5MZWZ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXJzLmZvckVhY2goX2hlYWRlciA9PiB7XG4gICAgICAgICAgX2hlYWRlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICBfaGVhZGVyLnNldE1hcmdpbkxlZnQodGhpcy5tYXJnaW5MZWZ0KTtcbiAgICAgICAgfSk7XG4gIFxuICAgICAgICB0aGlzLmZvb3RlcnMuZm9yRWFjaChfZm9vdGVyID0+IHtcbiAgICAgICAgICBfZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgIF9mb290ZXIuc2V0TWFyZ2luTGVmdCh0aGlzLm1hcmdpbkxlZnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKGZyb21FdmVudCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsIHsgY2FwdHVyZTogdHJ1ZSB9KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCA/ICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCAtIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSAtIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgOiAwO1xuICAgICAgICAgIHRoaXMubWFyZ2luTGVmdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgICAgX3Jvdy5zZXRNYXJnaW5MZWZ0KHRoaXMubWFyZ2luTGVmdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgdGhpcy5oZWFkZXJzLmZvckVhY2goX2hlYWRlciA9PiB7XG4gICAgICAgICAgICBfaGVhZGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgICAgX2hlYWRlci5zZXRNYXJnaW5MZWZ0KHRoaXMubWFyZ2luTGVmdCk7XG4gICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgdGhpcy5mb290ZXJzLmZvckVhY2goX2Zvb3RlciA9PiB7XG4gICAgICAgICAgICBfZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgICAgX2Zvb3Rlci5zZXRNYXJnaW5MZWZ0KHRoaXMubWFyZ2luTGVmdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgXG4gICAgICAgIHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlci5kaXNjb25uZWN0KCk7ICAgXG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTsgICBcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiNhZnRlckNvbnRlbnRJbml0T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG5cblxuICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMubm90aWZpZXIkLm5leHQoKSk7XG4gICAgY29uc3QgcmVzaXplUmVmID0gdGhpcy5yZXNpemVSZWYgPyB0aGlzLnJlc2l6ZVJlZiA6IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgPyB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShyZXNpemVSZWYpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMjAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnZpZXdwb3J0ICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9ICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgY29uc3QgZ2FwID0gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKSAqIDAuMztcbiAgICAgICAgbGV0IGhlYWRlcnNIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmhlYWRlcnMuZm9yRWFjaChfaGVhZGVyID0+IHtcbiAgICAgICAgICBoZWFkZXJzSGVpZ2h0ICs9IF9oZWFkZXIuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArIGdhcDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGZvb3RlcnNIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmZvb3RlcnMuZm9yRWFjaChfZm9vdGVyID0+IHtcbiAgICAgICAgICBmb290ZXJzSGVpZ2h0ICs9IF9mb290ZXIuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArIGdhcDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgLSBoZWFkZXJzSGVpZ2h0IC0gZm9vdGVyc0hlaWdodH1weGApXG4gICAgICB9XG4gICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPyAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkgLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IDogMDtcbiAgICAgIHRoaXMubWFyZ2luTGVmdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICB0aGlzLnJvd3MuZm9yRWFjaChfcm93ID0+IHtcbiAgICAgICAgX3Jvdy5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgX3Jvdy5zZXRNYXJnaW5MZWZ0KHRoaXMubWFyZ2luTGVmdCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgdGhpcy5oZWFkZXJzLmZvckVhY2goX2hlYWRlciA9PiB7XG4gICAgICAgIF9oZWFkZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgIF9oZWFkZXIuc2V0TWFyZ2luTGVmdCh0aGlzLm1hcmdpbkxlZnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZm9vdGVycy5mb3JFYWNoKF9mb290ZXIgPT4ge1xuICAgICAgICBfZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICBfZm9vdGVyLnNldE1hcmdpbkxlZnQodGhpcy5tYXJnaW5MZWZ0KTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICB0aGlzLm5vdGlmaWVyJC5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlcikge1xuICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LXRhYmxlXCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LXRhYmxlLXNjcm9sbGluZyBjbGFzcz1cImJpenktdGFibGVfX3Jvd3NcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLXJvd1wiPjwvbmctY29udGVudD5cblxuICAgIDwvYml6eS10YWJsZS1zY3JvbGxpbmc+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWZvb3RlclwiPjwvbmctY29udGVudD5cblxuPC9kaXY+Il19