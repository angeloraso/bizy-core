import { Component, Input, ChangeDetectionStrategy, ContentChildren, ContentChild, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { TableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { TableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import * as i0 from "@angular/core";
import * as i1 from "./table-scrolling/table-scrolling.component";
export class TableComponent {
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
    #afterViewInitObserver;
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
            this.#afterViewInitObserver = new MutationObserver(() => {
                if (!this.elementRef.nativeElement.offsetWidth) {
                    return;
                }
                this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
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
                    this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
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
                this.#afterViewInitObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#afterViewInitObserver.observe(this.document.body, { childList: true, subtree: true });
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#selectableMutationObserver) {
            this.#selectableMutationObserver.disconnect();
        }
        if (this.#rowScrollingMutationObserver) {
            this.#rowScrollingMutationObserver.disconnect();
        }
        if (this.#afterViewInitObserver) {
            this.#afterViewInitObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableComponent, selector: "bizy-table", inputs: { selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: TableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: TableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: TableFooterComponent, descendants: true }, { propertyName: "rows", predicate: TableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: TableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:scroll}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height, 30rem);width:var(--bizy-table-width, 100%);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: i1.TableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:scroll}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height, 30rem);width:var(--bizy-table-width, 100%);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
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
                args: [TableScrollingComponent]
            }], virtualFor: [{
                type: ContentChild,
                args: [TableScrollingDirective]
            }], header: [{
                type: ContentChild,
                args: [TableHeaderComponent]
            }], rows: [{
                type: ContentChildren,
                args: [TableRowComponent]
            }], footer: [{
                type: ContentChild,
                args: [TableFooterComponent]
            }], selectable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hMLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0FBUXRGLE1BQU0sT0FBTyxjQUFjO0lBdUNZO0lBQ1Q7SUFDRTtJQXhDTSxRQUFRLENBQTBCO0lBQy9CLFVBQVUsQ0FBMEI7SUFDdkMsTUFBTSxDQUF1QjtJQUM3QixJQUFJLENBQStCO0lBQ25DLE1BQU0sQ0FBdUI7SUFFakUsMkJBQTJCLENBQW1CO0lBQzlDLDZCQUE2QixDQUFtQjtJQUNoRCxzQkFBc0IsQ0FBbUI7SUFDekMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDbkMsV0FB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Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWhlYWRlci90YWJsZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVJvd0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcm93L3RhYmxlLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1zY3JvbGxpbmcvdGFibGUtc2Nyb2xsaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nL3RhYmxlLXNjcm9sbGluZy5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQFZpZXdDaGlsZChUYWJsZVNjcm9sbGluZ0NvbXBvbmVudCkgdmlld3BvcnQ6IFRhYmxlU2Nyb2xsaW5nQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKFRhYmxlU2Nyb2xsaW5nRGlyZWN0aXZlKSB2aXJ0dWFsRm9yOiBUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChUYWJsZUhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBUYWJsZUhlYWRlckNvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZHJlbihUYWJsZVJvd0NvbXBvbmVudCkgcm93czogUXVlcnlMaXN0PFRhYmxlUm93Q29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZChUYWJsZUZvb3RlckNvbXBvbmVudCkgZm9vdGVyOiBUYWJsZUZvb3RlckNvbXBvbmVudDtcblxuICAjc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjYWZ0ZXJWaWV3SW5pdE9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBtYXJnaW5SaWdodDogbnVtYmVyID0gMDtcblxuICBASW5wdXQoKSBzZXQgc2VsZWN0YWJsZShzZWxlY3RhYmxlOiBib29sZWFuKSB7XG4gICAgdGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucm93cyB8fCB0aGlzLnJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgIF9yb3cuc2V0U2VsZWN0YWJsZShzZWxlY3RhYmxlKTtcbiAgICAgICAgX3Jvdy5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5oZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIuc2V0U2VsZWN0YWJsZShzZWxlY3RhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm9vdGVyKSB7XG4gICAgICAgIHRoaXMuZm9vdGVyLnNldFNlbGVjdGFibGUoc2VsZWN0YWJsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTsgICAgICBcbiAgICB9KTtcblxuICAgIHRoaXMuI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnZpcnR1YWxGb3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnZpZXdwb3J0LmF0dGFjaFZpZXcodGhpcy52aXJ0dWFsRm9yKTtcbiAgICAgIHRoaXMuI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICBcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTsgICAgIFxuICAgICAgXG4gICAgICB0aGlzLiNhZnRlclZpZXdJbml0T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkgLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChfcm93ID0+IHtcbiAgICAgICAgICAgIF9yb3cuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgIHRoaXMuaGVhZGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9vdGVyKSB7XG4gICAgICAgICAgdGhpcy5mb290ZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKGZyb21FdmVudCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsIHsgY2FwdHVyZTogdHJ1ZSB9KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkgLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICAgICAgX3Jvdy5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHRoaXMuZm9vdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZvb3Rlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgXG4gICAgICAgIHRoaXMuI2FmdGVyVmlld0luaXRPYnNlcnZlci5kaXNjb25uZWN0KCk7ICAgXG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTsgICBcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiNhZnRlclZpZXdJbml0T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2FmdGVyVmlld0luaXRPYnNlcnZlcikge1xuICAgICAgdGhpcy4jYWZ0ZXJWaWV3SW5pdE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LXRhYmxlXCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LXRhYmxlLXNjcm9sbGluZyBjbGFzcz1cImJpenktdGFibGVfX3Jvd3NcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLXJvd1wiPjwvbmctY29udGVudD5cblxuICAgIDwvYml6eS10YWJsZS1zY3JvbGxpbmc+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWZvb3RlclwiPjwvbmctY29udGVudD5cblxuPC9kaXY+Il19