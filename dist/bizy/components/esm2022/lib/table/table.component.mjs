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
    header;
    rows;
    footer;
    resizeRef = null;
    #selectableMutationObserver;
    #rowScrollingMutationObserver;
    #afterContentInitObserver;
    #resizeObserver;
    notifier$ = new Subject();
    #subscription = new Subscription();
    marginRight = 0;
    set selectable(selectable) {
        this.#selectableMutationObserver = new MutationObserver(() => {
            if (!this.rows || this.rows.length === 0) {
                return;
            }
            this.rows.forEach(_row => {
                _row.setSelectable(selectable);
                _row.setMarginRight(this.marginRight);
            });
            if (this.header) {
                this.header.setSelectable(selectable);
            }
            if (this.footer) {
                this.footer.setSelectable(selectable);
            }
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
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - (this.header ? this.header.elementRef.nativeElement.offsetHeight + gap : 0) - (this.footer ? this.footer.elementRef.nativeElement.offsetHeight + gap : 0)}px`);
            }
            this.viewport.attachView(this.virtualFor);
            this.#rowScrollingMutationObserver.disconnect();
            this.ref.detectChanges();
            this.#afterContentInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                this.rows.forEach(_row => {
                    _row.setMarginRight(this.marginRight);
                });
                if (this.header) {
                    this.header.setMarginRight(this.marginRight);
                }
                if (this.footer) {
                    this.footer.setMarginRight(this.marginRight);
                }
                this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).subscribe(() => {
                    this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
                    this.rows.forEach(_row => {
                        _row.setMarginRight(this.marginRight);
                    });
                    if (this.header) {
                        this.header.setMarginRight(this.marginRight);
                    }
                    if (this.footer) {
                        this.footer.setMarginRight(this.marginRight);
                    }
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
                this.renderer.setStyle(this.viewport.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.offsetHeight - (this.header ? this.header.elementRef.nativeElement.offsetHeight + gap : 0) - (this.footer ? this.footer.elementRef.nativeElement.offsetHeight + gap : 0)}px`);
            }
            this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
            this.rows.forEach(_row => {
                _row.setMarginRight(this.marginRight);
            });
            if (this.header) {
                this.header.setMarginRight(this.marginRight);
            }
            if (this.footer) {
                this.footer.setMarginRight(this.marginRight);
            }
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableComponent, selector: "bizy-table", inputs: { resizeRef: "resizeRef", selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyTableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: BizyTableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: BizyTableFooterComponent, descendants: true }, { propertyName: "rows", predicate: BizyTableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: BizyTableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{display:inline-block!important;min-height:var(--bizy-table-min-height);max-height:var(--bizy-table-max-height);height:var(--bizy-table-height);width:var(--bizy-table-width);flex:1;overflow-x:auto;overflow-y:hidden}.bizy-table{width:inherit;height:inherit;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{width:100%;display:flex;flex-direction:column;min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: i1.BizyTableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
            }], header: [{
                type: ContentChild,
                args: [BizyTableHeaderComponent]
            }], rows: [{
                type: ContentChildren,
                args: [BizyTableRowComponent]
            }], footer: [{
                type: ContentChild,
                args: [BizyTableFooterComponent]
            }], resizeRef: [{
                type: Input
            }], selectable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuTSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7OztBQVExRixNQUFNLE9BQU8sa0JBQWtCO0lBMENRO0lBQ1Q7SUFDQztJQUNDO0lBNUNVLFFBQVEsQ0FBOEI7SUFDbkMsVUFBVSxDQUE4QjtJQUMzQyxNQUFNLENBQTJCO0lBQ2pDLElBQUksQ0FBbUM7SUFDdkMsTUFBTSxDQUEyQjtJQUNoRSxTQUFTLEdBQWUsSUFBSSxDQUFDO0lBRXRDLDJCQUEyQixDQUFtQjtJQUM5Qyw2QkFB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LDJCQUEyQjtnQkFDRCxNQUFNO3NCQUE3QyxZQUFZO3VCQUFDLHdCQUF3QjtnQkFDRSxJQUFJO3NCQUEzQyxlQUFlO3VCQUFDLHFCQUFxQjtnQkFDRSxNQUFNO3NCQUE3QyxZQUFZO3VCQUFDLHdCQUF3QjtnQkFDN0IsU0FBUztzQkFBakIsS0FBSztnQkFVTyxVQUFVO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci90YWJsZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZUZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtZm9vdGVyL3RhYmxlLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlUm93Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSwgZnJvbUV2ZW50LCBza2lwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5VGFibGVTY3JvbGxpbmdDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXNjcm9sbGluZy90YWJsZS1zY3JvbGxpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nL3RhYmxlLXNjcm9sbGluZy5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoQml6eVRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50KSB2aWV3cG9ydDogQml6eVRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSkgdmlydHVhbEZvcjogQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKEJpenlUYWJsZUhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVRhYmxlUm93Q29tcG9uZW50KSByb3dzOiBRdWVyeUxpc3Q8Qml6eVRhYmxlUm93Q29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZChCaXp5VGFibGVGb290ZXJDb21wb25lbnQpIGZvb3RlcjogQml6eVRhYmxlRm9vdGVyQ29tcG9uZW50O1xuICBASW5wdXQoKSByZXNpemVSZWY6IEVsZW1lbnRSZWYgPSBudWxsO1xuXG4gICNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNhZnRlckNvbnRlbnRJbml0T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gIG5vdGlmaWVyJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIG1hcmdpblJpZ2h0OiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RhYmxlKHNlbGVjdGFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLiNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yb3dzIHx8IHRoaXMucm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJvd3MuZm9yRWFjaChfcm93ID0+IHtcbiAgICAgICAgX3Jvdy5zZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUpO1xuICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlci5zZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgdGhpcy5mb290ZXIuc2V0U2VsZWN0YWJsZShzZWxlY3RhYmxlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpOyAgICAgIFxuICAgIH0pO1xuXG4gICAgdGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy52aXJ0dWFsRm9yIHx8ICF0aGlzLnZpZXdwb3J0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9ICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgY29uc3QgZ2FwID0gTnVtYmVyKGZvbnRTaXplLnNwbGl0KCdweCcpWzBdKSAqIDAuMztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAtICh0aGlzLmhlYWRlciA/IHRoaXMuaGVhZGVyLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBnYXAgOiAwKSAtICh0aGlzLmZvb3RlciA/IHRoaXMuZm9vdGVyLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBnYXAgOiAwKX1weGApXG4gICAgICB9XG5cbiAgICAgIHRoaXMudmlld3BvcnQuYXR0YWNoVmlldyh0aGlzLnZpcnR1YWxGb3IpO1xuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIFxuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpOyAgICAgXG4gICAgICBcbiAgICAgIHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICBcbiAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID8gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA6IDA7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICAgICAgX3Jvdy5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgICB0aGlzLmZvb3Rlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJywgeyBjYXB0dXJlOiB0cnVlIH0pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID8gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA6IDA7XG4gICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICBcbiAgICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyLmRpc2Nvbm5lY3QoKTsgICBcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpOyAgIFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcblxuXG4gICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5ub3RpZmllciQubmV4dCgpKTtcbiAgICBjb25zdCByZXNpemVSZWYgPSB0aGlzLnJlc2l6ZVJlZiA/IHRoaXMucmVzaXplUmVmIDogdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSA/IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHJlc2l6ZVJlZik7XG4gICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLm5vdGlmaWVyJC5waXBlKHNraXAoMSksIGRlYm91bmNlVGltZSgyMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudmlld3BvcnQgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gIGdldENvbXB1dGVkU3R5bGUodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2ZvbnQtc2l6ZScpO1xuICAgICAgICBjb25zdCBnYXAgPSBOdW1iZXIoZm9udFNpemUuc3BsaXQoJ3B4JylbMF0pICogMC4zO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudmlld3BvcnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gKHRoaXMuaGVhZGVyID8gdGhpcy5oZWFkZXIuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArIGdhcCA6IDApIC0gKHRoaXMuZm9vdGVyID8gdGhpcy5mb290ZXIuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArIGdhcCA6IDApfXB4YClcbiAgICAgIH1cbiAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCA/ICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCAtIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSAtIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgOiAwO1xuICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgIF9yb3cuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgdGhpcy5mb290ZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIHRoaXMubm90aWZpZXIkLm5leHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNhZnRlckNvbnRlbnRJbml0T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImJpenktdGFibGVcIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPGJpenktdGFibGUtc2Nyb2xsaW5nIGNsYXNzPVwiYml6eS10YWJsZV9fcm93c1wiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtcm93XCI+PC9uZy1jb250ZW50PlxuXG4gICAgPC9iaXp5LXRhYmxlLXNjcm9sbGluZz5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuXG48L2Rpdj4iXX0=