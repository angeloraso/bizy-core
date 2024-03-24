import { Component, Input, ChangeDetectionStrategy, ContentChildren, ContentChild, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription, debounceTime, fromEvent, skip } from 'rxjs';
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
                this.#afterContentInitObserver.disconnect();
                this.ref.detectChanges();
            });
            this.#afterContentInitObserver.observe(this.document.body, { childList: true, subtree: true });
        });
        this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
        this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
        this.#resizeObserver.observe(this.elementRef.nativeElement);
        this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableComponent, selector: "bizy-table", inputs: { selectable: "selectable" }, queries: [{ propertyName: "virtualFor", first: true, predicate: TableScrollingDirective, descendants: true }, { propertyName: "header", first: true, predicate: TableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: TableFooterComponent, descendants: true }, { propertyName: "rows", predicate: TableRowComponent }], viewQueries: [{ propertyName: "viewport", first: true, predicate: TableScrollingComponent, descendants: true }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height, 30rem);width:var(--bizy-table-width, 100%);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: i1.TableScrollingComponent, selector: "bizy-table-scrolling" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <bizy-table-scrolling class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </bizy-table-scrolling>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%;overflow-x:scroll;overflow-y:hidden}.bizy-table{width:100%;min-width:-moz-fit-content;min-width:fit-content;height:100%;display:flex;flex-direction:column;row-gap:.3rem;overflow-x:clip}.bizy-table__rows{display:flex;flex-direction:column;height:var(--bizy-table-height, 30rem);width:var(--bizy-table-width, 100%);min-width:-moz-fit-content;min-width:fit-content;overflow-x:hidden}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hMLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0FBUXRGLE1BQU0sT0FBTyxjQUFjO0lBeUNZO0lBQ1Q7SUFDRTtJQTFDTSxRQUFRLENBQTBCO0lBQy9CLFVBQVUsQ0FBMEI7SUFDdkMsTUFBTSxDQUF1QjtJQUM3QixJQUFJLENBQStCO0lBQ25DLE1BQU0sQ0FBdUI7SUFFakUsMkJBQTJCLENBQW1CO0lBQzlDLDZCQUE2QixDQUFtQjtJQUNoRCx5QkFBeUIsQ0FBbUI7SUFDNUMsZUFBZSxDQUFp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Z0JBQ0UsTUFBTTtzQkFBekMsWUFBWTt1QkFBQyxvQkFBb0I7Z0JBVXJCLFVBQVU7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaGVhZGVyL3RhYmxlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWZvb3Rlci90YWJsZS1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlUm93Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSwgZnJvbUV2ZW50LCBza2lwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUYWJsZVNjcm9sbGluZ0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtc2Nyb2xsaW5nL3RhYmxlLXNjcm9sbGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVTY3JvbGxpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXNjcm9sbGluZy90YWJsZS1zY3JvbGxpbmcuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoVGFibGVTY3JvbGxpbmdDb21wb25lbnQpIHZpZXdwb3J0OiBUYWJsZVNjcm9sbGluZ0NvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZChUYWJsZVNjcm9sbGluZ0RpcmVjdGl2ZSkgdmlydHVhbEZvcjogVGFibGVTY3JvbGxpbmdEaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVGFibGVIZWFkZXJDb21wb25lbnQpIGhlYWRlcjogVGFibGVIZWFkZXJDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oVGFibGVSb3dDb21wb25lbnQpIHJvd3M6IFF1ZXJ5TGlzdDxUYWJsZVJvd0NvbXBvbmVudD47XG4gIEBDb250ZW50Q2hpbGQoVGFibGVGb290ZXJDb21wb25lbnQpIGZvb3RlcjogVGFibGVGb290ZXJDb21wb25lbnQ7XG5cbiAgI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI2FmdGVyQ29udGVudEluaXRPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgI3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgbm90aWZpZXIkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgbWFyZ2luUmlnaHQ6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KCkgc2V0IHNlbGVjdGFibGUoc2VsZWN0YWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuI3NlbGVjdGFibGVNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJvd3MgfHwgdGhpcy5yb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICBfcm93LnNldFNlbGVjdGFibGUoc2VsZWN0YWJsZSk7XG4gICAgICAgIF9yb3cuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLnNldFNlbGVjdGFibGUoc2VsZWN0YWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZvb3Rlcikge1xuICAgICAgICB0aGlzLmZvb3Rlci5zZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgXG4gICAgfSk7XG5cbiAgICB0aGlzLiNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy4jcm93U2Nyb2xsaW5nTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy52aXJ0dWFsRm9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy52aWV3cG9ydC5hdHRhY2hWaWV3KHRoaXMudmlydHVhbEZvcik7XG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICBcbiAgICAgIFxuICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gIFxuICAgICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgICAgICBfcm93LnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5oZWFkZXIpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvb3Rlcikge1xuICAgICAgICAgIHRoaXMuZm9vdGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZChmcm9tRXZlbnQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnLCB7IGNhcHR1cmU6IHRydWUgfSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIC0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChfcm93ID0+IHtcbiAgICAgICAgICAgIF9yb3cuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5zZXRNYXJnaW5SaWdodCh0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmICh0aGlzLmZvb3Rlcikge1xuICAgICAgICAgICAgdGhpcy5mb290ZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gIFxuICAgICAgICB0aGlzLiNhZnRlckNvbnRlbnRJbml0T2JzZXJ2ZXIuZGlzY29ubmVjdCgpOyAgIFxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgXG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuI3Jvd1Njcm9sbGluZ011dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuXG5cbiAgICB0aGlzLiNyZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLm5vdGlmaWVyJC5uZXh0KCkpO1xuICAgIHRoaXMuI3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5ub3RpZmllciQucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkgLSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgdGhpcy5yb3dzLmZvckVhY2goX3JvdyA9PiB7XG4gICAgICAgIF9yb3cuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLnNldE1hcmdpblJpZ2h0KHRoaXMubWFyZ2luUmlnaHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgdGhpcy5mb290ZXIuc2V0TWFyZ2luUmlnaHQodGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIHRoaXMubm90aWZpZXIkLm5leHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNzZWxlY3RhYmxlTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy4jc2VsZWN0YWJsZU11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNyb3dTY3JvbGxpbmdNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jYWZ0ZXJDb250ZW50SW5pdE9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNhZnRlckNvbnRlbnRJbml0T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiNyZXNpemVPYnNlcnZlcikge1xuICAgICAgdGhpcy4jcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImJpenktdGFibGVcIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPGJpenktdGFibGUtc2Nyb2xsaW5nIGNsYXNzPVwiYml6eS10YWJsZV9fcm93c1wiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtcm93XCI+PC9uZy1jb250ZW50PlxuXG4gICAgPC9iaXp5LXRhYmxlLXNjcm9sbGluZz5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuXG48L2Rpdj4iXX0=