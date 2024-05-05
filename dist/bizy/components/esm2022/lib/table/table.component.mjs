import { Component, Input, ChangeDetectionStrategy, ContentChildren, ContentChild, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
    elementRef;
    viewport;
    virtualFor;
    header;
    rows;
    footer;
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
    constructor(ref, document, elementRef) {
        this.ref = ref;
        this.document = document;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        this.#rowScrollingMutationObserver = new MutationObserver(() => {
            if (!this.virtualFor) {
                return;
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
        this.#resizeObserver.observe(this.elementRef.nativeElement);
        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableComponent, selector: "bizy-table", inputs: { selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: BizyTableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: BizyTableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: BizyTableFooterComponent, descendants: true }, { propertyName: "rows", predicate: BizyTableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: BizyTableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height);width:var(--bizy-table-width);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: i1.BizyTableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip;background-color:var(--bizy-table-background-color)}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height);width:var(--bizy-table-width);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
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
            }], selectable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hMLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0FBUTFGLE1BQU0sT0FBTyxrQkFBa0I7SUF5Q1E7SUFDVDtJQUNFO0lBMUNVLFFBQVEsQ0FBaUM7SUFDdEMsVUFBVSxDQUFpQztJQUM5QyxNQUFNLENBQTJCO0lBQ2pDLElBQUksQ0FBbUM7SUFDdkMsTUFBTSxDQUEyQjtJQUV6RSwyQkFBMkIsQ0FBbUI7SUFDOUMsNkJBQTZCLENBQW1CO0lBQ2hELHlCQUF5QixDQUFtQjtJQUM1QyxlQUFlLENB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MEJBMkM1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxVQUFVOzRDQTFDb0IsUUFBUTtzQkFBL0MsU0FBUzt1QkFBQywyQkFBMkI7Z0JBQ0ssVUFBVTtzQkFBcEQsWUFBWTt1QkFBQywyQkFBMkI7Z0JBQ0QsTUFBTTtzQkFBN0MsWUFBWTt1QkFBQyx3QkFBd0I7Z0JBQ0UsSUFBSTtzQkFBM0MsZUFBZTt1QkFBQyxxQkFBcUI7Z0JBQ0UsTUFBTTtzQkFBN0MsWUFBWTt1QkFBQyx3QkFBd0I7Z0JBVXpCLFVBQVU7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci90YWJsZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZUZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtZm9vdGVyL3RhYmxlLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQml6eVRhYmxlUm93Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSwgZnJvbUV2ZW50LCBza2lwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCaXp5VGFibGVTY3JvbGxpbmdDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXNjcm9sbGluZy90YWJsZS1zY3JvbGxpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nL3RhYmxlLXNjcm9sbGluZy5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRhYmxlQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoQml6eVRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50KSB2aWV3cG9ydDogQml6eVRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50PFQ+O1xuICBAQ29udGVudENoaWxkKEJpenlUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSkgdmlydHVhbEZvcjogQml6eVRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlPFQ+O1xuICBAQ29udGVudENoaWxkKEJpenlUYWJsZUhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVRhYmxlUm93Q29tcG9uZW50KSByb3dzOiBRdWVyeUxpc3Q8Qml6eVRhYmxlUm93Q29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZChCaXp5VGFibGVGb290ZXJDb21wb25lbnQpIGZvb3RlcjogQml6eVRhYmxlRm9vdGVyQ29tcG9uZW50O1xuXG4gICNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNhZnRlckNvbnRlbnRJbml0T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gIG5vdGlmaWVyJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIG1hcmdpblJpZ2h0OiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RhYmxlKHNlbGVjdGFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLiNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5yb3dzIHx8IHRoaXMucm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJvd3MuZm9yRWFjaChfcm93ID0+IHtcbiAgICAgICAgX3Jvdy5zZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUpO1xuICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlci5zZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgdGhpcy5mb290ZXIuc2V0U2VsZWN0YWJsZShzZWxlY3RhYmxlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpOyAgICAgIFxuICAgIH0pO1xuXG4gICAgdGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMudmlydHVhbEZvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMudmlld3BvcnQuYXR0YWNoVmlldyh0aGlzLnZpcnR1YWxGb3IpO1xuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIFxuICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpOyAgICAgXG4gICAgICBcbiAgICAgIHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICBcbiAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID8gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA6IDA7XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICAgICAgX3Jvdy5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgICB0aGlzLmZvb3Rlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQoZnJvbUV2ZW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJywgeyBjYXB0dXJlOiB0cnVlIH0pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID8gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA6IDA7XG4gICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICBcbiAgICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyLmRpc2Nvbm5lY3QoKTsgICBcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpOyAgIFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcblxuXG4gICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5ub3RpZmllciQubmV4dCgpKTtcbiAgICB0aGlzLiNyZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubm90aWZpZXIkLnBpcGUoc2tpcCgxKSwgZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPyAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkgLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IDogMDtcbiAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm9vdGVyKSB7XG4gICAgICAgIHRoaXMuZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgICB0aGlzLm5vdGlmaWVyJC5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2FmdGVyQ29udGVudEluaXRPYnNlcnZlcikge1xuICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LXRhYmxlXCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LXRhYmxlLXNjcm9sbGluZyBjbGFzcz1cImJpenktdGFibGVfX3Jvd3NcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLXJvd1wiPjwvbmctY29udGVudD5cblxuICAgIDwvYml6eS10YWJsZS1zY3JvbGxpbmc+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWZvb3RlclwiPjwvbmctY29udGVudD5cblxuPC9kaXY+Il19