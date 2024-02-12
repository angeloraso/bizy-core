import { Component, Input, ChangeDetectionStrategy, ContentChildren, ContentChild, Inject, ChangeDetectorRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export class TableComponent {
    ref;
    document;
    header;
    rows;
    footer;
    #rows = [];
    #mutationObserver;
    #subscription = new Subscription();
    set selectable(selectable) {
        if (!selectable) {
            return;
        }
        this.#mutationObserver = new MutationObserver(() => {
            if (!this.rows || (this.#rows.length === 0 && this.rows.length === 0)) {
                return;
            }
            if (this.#rowsAreEqual(this.#rows, this.rows.toArray())) {
                return;
            }
            this.#rows = this.rows.toArray();
            this.rows.forEach(_row => {
                _row.setSelectable(true);
            });
            if (this.header) {
                this.header.setSelectable(true);
                this.#subscription.add(this.header.onSelect.subscribe(selected => {
                    this.rows.forEach(_row => {
                        _row.setSelected(selected);
                    });
                }));
            }
            if (this.footer) {
                this.footer.setSelectable(true);
            }
            this.#mutationObserver.disconnect();
            this.ref.detectChanges();
        });
        this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
    ;
    constructor(ref, document) {
        this.ref = ref;
        this.document = document;
    }
    #rowsAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort((a, b) => a.id.localeCompare(b.id));
        arr2.sort((a, b) => a.id.localeCompare(b.id));
        for (let i = 0; i < arr1.length; i++) {
            for (let key in arr1[i]) {
                if (arr1[i][key] !== arr2[i][key]) {
                    return false;
                }
            }
        }
        return true;
    }
    ngOnDestroy() {
        this.#subscription.unsubscribe();
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, deps: [{ token: ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableComponent, selector: "bizy-table", inputs: { selectable: "selectable" }, queries: [{ propertyName: "header", first: true, predicate: TableHeaderComponent, descendants: true }, { propertyName: "footer", first: true, predicate: TableFooterComponent, descendants: true }, { propertyName: "rows", predicate: TableRowComponent }], ngImport: i0, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <span class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </span>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%}.bizy-table{width:100%;height:100%;display:flex;flex-direction:column;row-gap:.3rem}.bizy-table__rows{display:flex;flex-direction:column;overflow:scroll;height:100%;height:var(--bizy-table-height, 30rem);width:100%;min-width:var(--bizy-table-width, 20rem)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"bizy-table\">\n\n    <ng-content select=\"bizy-table-header\"></ng-content>\n\n    <span class=\"bizy-table__rows\">\n\n        <ng-content select=\"bizy-table-row\"></ng-content>\n\n    </span>\n\n    <ng-content select=\"bizy-table-footer\"></ng-content>\n\n</div>", styles: [":host{width:100%;height:100%}.bizy-table{width:100%;height:100%;display:flex;flex-direction:column;row-gap:.3rem}.bizy-table__rows{display:flex;flex-direction:column;overflow:scroll;height:100%;height:var(--bizy-table-height, 30rem);width:100%;min-width:var(--bizy-table-width, 20rem)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { header: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQVFwQyxNQUFNLE9BQU8sY0FBYztJQW1EWTtJQUNUO0lBbkRRLE1BQU0sQ0FBdUI7SUFDN0IsSUFBSSxDQUErQjtJQUNuQyxNQUFNLENBQXVCO0lBRWpFLEtBQUssR0FBNkIsRUFBRSxDQUFDO0lBQ3JDLGlCQUFpQixDQUFtQjtJQUNwQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuQyxJQUFhLFVBQVUsQ0FBQyxVQUFtQjtRQUN6QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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Q0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckM7SUFDSCxDQUFDO3dHQS9FVSxjQUFjLGtCQW1EZixpQkFBaUIsYUFDakIsUUFBUTs0RkFwRFAsY0FBYyw0SEFDWCxvQkFBb0IseUVBRXBCLG9CQUFvQiwwREFEakIsaUJBQWlCLDZCQ2ZwQyx5UkFZTTs7NEZEQ08sY0FBYztrQkFOMUIsU0FBUzsrQkFDRSxZQUFZLG1CQUdMLHVCQUF1QixDQUFDLE1BQU07OzBCQXFENUMsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFFBQVE7NENBbkRrQixNQUFNO3NCQUF6QyxZQUFZO3VCQUFDLG9CQUFvQjtnQkFDRSxJQUFJO3NCQUF2QyxlQUFlO3VCQUFDLGlCQUFpQjtnQkFDRSxNQUFNO3NCQUF6QyxZQUFZO3VCQUFDLG9CQUFvQjtnQkFNckIsVUFBVTtzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkLCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaGVhZGVyL3RhYmxlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWZvb3Rlci90YWJsZS1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlUm93Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZChUYWJsZUhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBUYWJsZUhlYWRlckNvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZHJlbihUYWJsZVJvd0NvbXBvbmVudCkgcm93czogUXVlcnlMaXN0PFRhYmxlUm93Q29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZChUYWJsZUZvb3RlckNvbXBvbmVudCkgZm9vdGVyOiBUYWJsZUZvb3RlckNvbXBvbmVudDtcblxuICAjcm93czogQXJyYXk8VGFibGVSb3dDb21wb25lbnQ+ID0gW107XG4gICNtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAjc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RhYmxlKHNlbGVjdGFibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJvd3MgfHwgKHRoaXMuI3Jvd3MubGVuZ3RoID09PSAwICYmIHRoaXMucm93cy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuI3Jvd3NBcmVFcXVhbCh0aGlzLiNyb3dzLCB0aGlzLnJvd3MudG9BcnJheSgpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuI3Jvd3MgPSB0aGlzLnJvd3MudG9BcnJheSgpO1xuXG4gICAgICB0aGlzLnJvd3MuZm9yRWFjaChfcm93ID0+IHtcbiAgICAgICAgICBfcm93LnNldFNlbGVjdGFibGUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLnNldFNlbGVjdGFibGUodHJ1ZSk7XG5cbiAgICAgICAgdGhpcy4jc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmhlYWRlci5vblNlbGVjdC5zdWJzY3JpYmUoc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKF9yb3cgPT4ge1xuICAgICAgICAgICAgX3Jvdy5zZXRTZWxlY3RlZChzZWxlY3RlZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgdGhpcy5mb290ZXIuc2V0U2VsZWN0YWJsZSh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy4jbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7ICAgICAgXG4gICAgfSk7XG5cbiAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5kb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcbiAgKSB7fVxuXG4gICNyb3dzQXJlRXF1YWwoYXJyMTogQXJyYXk8VGFibGVSb3dDb21wb25lbnQ+LCBhcnIyOiBBcnJheTxUYWJsZVJvd0NvbXBvbmVudD4pIHtcbiAgICBpZiAoYXJyMS5sZW5ndGggIT09IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhcnIxLnNvcnQoKGEsIGIpID0+IGEuaWQubG9jYWxlQ29tcGFyZShiLmlkKSk7XG4gICAgYXJyMi5zb3J0KChhLCBiKSA9PiBhLmlkLmxvY2FsZUNvbXBhcmUoYi5pZCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcnIxW2ldKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXVtrZXldICE9PSBhcnIyW2ldW2tleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLiNtdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLiNtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJiaXp5LXRhYmxlXCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS10YWJsZV9fcm93c1wiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtcm93XCI+PC9uZy1jb250ZW50PlxuXG4gICAgPC9zcGFuPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS10YWJsZS1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG5cbjwvZGl2PiJdfQ==