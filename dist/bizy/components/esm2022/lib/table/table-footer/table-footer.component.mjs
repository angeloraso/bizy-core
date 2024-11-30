import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, Input } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class BizyTableFooterComponent {
    ref;
    elementRef;
    columns;
    id = `bizy-table-footer-${Math.random()}`;
    customClass = '';
    marginRight = 0;
    _selectable = false;
    constructor(ref, elementRef) {
        this.ref = ref;
        this.elementRef = elementRef;
    }
    getId = () => {
        return this.id;
    };
    setSelectable = (selectable) => {
        this._selectable = selectable;
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    setMarginLeft(margin) {
        if (this.columns.length === 0) {
            return;
        }
        this.columns.forEach(_column => {
            _column.setMarginLeft(margin);
            this.ref.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableFooterComponent, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, queries: [{ propertyName: "columns", predicate: BizyTableColumnComponent }], ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }, { type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }]; }, propDecorators: { columns: [{
                type: ContentChildren,
                args: [BizyTableColumnComponent]
            }], id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7QUFRbEYsTUFBTSxPQUFPLHdCQUF3QjtJQVVFO0lBQ1I7SUFWYyxPQUFPLENBQXNDO0lBQy9FLEVBQUUsR0FBVyxxQkFBcUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDbEQsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUVsQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLFdBQVcsR0FBWSxLQUFLLENBQUM7SUFFN0IsWUFDcUMsR0FBc0IsRUFDOUIsVUFBc0I7UUFEZCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ2hELENBQUM7SUFFSixLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxhQUFhLEdBQUcsQ0FBQyxVQUFtQixFQUFRLEVBQUU7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxjQUFjLENBQUMsTUFBYztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzt3R0FyQ1Usd0JBQXdCLGtCQVV6QixpQkFBaUIsYUFDakIsVUFBVTs0RkFYVCx3QkFBd0IsbUlBQ2xCLHdCQUF3Qiw2QkNWM0MsOGZBa0JNOzs0RkRUTyx3QkFBd0I7a0JBTnBDLFNBQVM7K0JBQ0UsbUJBQW1CLG1CQUdaLHVCQUF1QixDQUFDLE1BQU07OzBCQVk1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsVUFBVTs0Q0FWdUIsT0FBTztzQkFBakQsZUFBZTt1QkFBQyx3QkFBd0I7Z0JBQ2hDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLi90YWJsZS1jb2x1bW4vdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFibGUtZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWZvb3Rlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtZm9vdGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VGFibGVGb290ZXJDb21wb25lbnQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS10YWJsZS1mb290ZXItJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICBtYXJnaW5SaWdodCA9IDA7XG5cbiAgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIHNldFNlbGVjdGFibGUgPSAoc2VsZWN0YWJsZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX3NlbGVjdGFibGUgPSBzZWxlY3RhYmxlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldE1hcmdpblJpZ2h0KG1hcmdpbjogbnVtYmVyKSB7XG4gICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpbiAtIDU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0TWFyZ2luTGVmdChtYXJnaW46IG51bWJlcikge1xuICAgIGlmICh0aGlzLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goX2NvbHVtbiA9PiB7XG4gICAgICBfY29sdW1uLnNldE1hcmdpbkxlZnQobWFyZ2luKTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KVxuICB9XG59IiwiPGRpdiBcbiAgICBbaWRdPVwiaWRcIlxuICAgIGNsYXNzPVwiYml6eS10YWJsZS1mb290ZXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWNvbHVtblwiPjwvbmctY29udGVudD5cblxuXG4gICAgPHNwYW4gXG4gICAgICAgICpuZ0lmPVwiX3NlbGVjdGFibGVcIlxuICAgICAgICBjbGFzcz1cImJpenktdGFibGUtZm9vdGVyX19jaGVja2JveC13cmFwcGVyXCJcbiAgICAgICAgW25nU3R5bGVdPVwie3JpZ2h0OiBtYXJnaW5SaWdodCArICdweCd9XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LXRhYmxlLWZvb3Rlcl9fY2hlY2tib3gtLXNoYWRvdyc6IG1hcmdpblJpZ2h0ID4gMH1cIj5cbiAgICAgICAgXG4gICAgICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LXRhYmxlLWZvb3Rlcl9fY2hlY2tib3hcIj5cbiAgICAgICAgPC9iaXp5LWNoZWNrYm94PlxuICAgIDwvc3Bhbj5cbiAgICBcbjwvZGl2PiJdfQ==