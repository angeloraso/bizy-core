import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef, ContentChildren } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class BizyTableHeaderComponent {
    ref;
    elementRef;
    columns;
    id = `bizy-table-header-${Math.random()}`;
    customClass = '';
    selected = false;
    selectable = null;
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref, elementRef) {
        this.ref = ref;
        this.elementRef = elementRef;
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    setSelectable = (selectable) => {
        if (this.selectable === false) {
            return;
        }
        this.selectable = selectable;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "columns", predicate: BizyTableColumnComponent }], ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
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
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuSyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7OztBQVFsRixNQUFNLE9BQU8sd0JBQXdCO0lBWUU7SUFDUjtJQVpjLE9BQU8sQ0FBc0M7SUFDL0UsRUFBRSxHQUFXLHFCQUFxQixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNsRCxXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsVUFBVSxHQUFtQixJQUFJLENBQUM7SUFDakMsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBRXRELFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFaEIsWUFDcUMsR0FBc0IsRUFDOUIsVUFBc0I7UUFEZCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ2hELENBQUM7SUFFSixLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsR0FBWSxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDLENBQUE7SUFFRCxhQUFhLEdBQUcsQ0FBQyxVQUFtQixFQUFRLEVBQUU7UUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELGNBQWMsQ0FBQyxNQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBYztRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO3dHQS9DVSx3QkFBd0Isa0JBWXpCLGlCQUFpQixhQUNqQixVQUFVOzRGQWJULHdCQUF3Qix3UEFDbEIsd0JBQXdCLDZCQ1YzQywyckJBb0JNOzs0RkRYTyx3QkFBd0I7a0JBTnBDLFNBQVM7K0JBQ0UsbUJBQW1CLG1CQUdaLHVCQUF1QixDQUFDLE1BQU07OzBCQWM1QyxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3hCLE1BQU07MkJBQUMsVUFBVTs0Q0FadUIsT0FBTztzQkFBakQsZUFBZTt1QkFBQyx3QkFBd0I7Z0JBQ2hDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDSSxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaXp5VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLi90YWJsZS1jb2x1bW4vdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFibGUtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWhlYWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtaGVhZGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQge1xuICBAQ29udGVudENoaWxkcmVuKEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PEJpenlUYWJsZUNvbHVtbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS10YWJsZS1oZWFkZXItJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0YWJsZTogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIG1hcmdpblJpZ2h0ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChFbGVtZW50UmVmKSBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgc2V0U2VsZWN0YWJsZSA9IChzZWxlY3RhYmxlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldE1hcmdpblJpZ2h0KG1hcmdpbjogbnVtYmVyKSB7XG4gICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpbiAtIDU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0TWFyZ2luTGVmdChtYXJnaW46IG51bWJlcikge1xuICAgIGlmICh0aGlzLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goX2NvbHVtbiA9PiB7XG4gICAgICBfY29sdW1uLnNldE1hcmdpbkxlZnQobWFyZ2luKTtcbiAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KVxuICB9XG59IiwiPGRpdiBcbiAgICBbaWRdPVwiaWRcIlxuICAgIGNsYXNzPVwiYml6eS10YWJsZS1oZWFkZXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWNvbHVtblwiPjwvbmctY29udGVudD5cblxuICAgIDxzcGFuIFxuICAgICAgICAqbmdJZj1cInNlbGVjdGFibGUgIT09IG51bGxcIlxuICAgICAgICBjbGFzcz1cImJpenktdGFibGUtaGVhZGVyX19jaGVja2JveC13cmFwcGVyXCJcbiAgICAgICAgW25nU3R5bGVdPVwie3JpZ2h0OiBtYXJnaW5SaWdodCArICdweCd9XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LXRhYmxlLWZvb3Rlcl9fY2hlY2tib3gtLXNoYWRvdyc6IG1hcmdpblJpZ2h0ID4gMH1cIj5cbiAgICAgICAgXG4gICAgICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJzZWxlY3RlZENoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uU2VsZWN0LmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtaGVhZGVyX19jaGVja2JveC0taGlkZGVuJzogc2VsZWN0YWJsZSA9PT0gZmFsc2V9XCI+XG4gICAgICAgIDwvYml6eS1jaGVja2JveD5cbiAgICA8L3NwYW4+XG5cbjwvZGl2PiJdfQ==