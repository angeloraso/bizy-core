import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class TableRowComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    disabled = false;
    selected = false;
    selectable = null;
    onSelect = new EventEmitter();
    marginRight = 0;
    constructor(ref) {
        this.ref = ref;
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
    setSelected = (selected) => {
        if (this.selectable === false) {
            return;
        }
        this.selected = selected;
        this.onSelect.emit(selected);
        this.ref.detectChanges();
    };
    setMarginRight(margin) {
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-row__checkbox\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit($event)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;min-height:var(--bizy-table-row-height, 2rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color, #2484C6)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color, #ffffff)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height, 2rem);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-row__checkbox\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 0}\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit($event)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:-moz-fit-content;height:fit-content;min-height:var(--bizy-table-row-height, 2rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color, #2484C6)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color, #ffffff)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;min-height:var(--bizy-table-row-height, 2rem);height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0gsTUFBTSxPQUFPLGlCQUFpQjtJQVdTO0lBVjVCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsVUFBVSxHQUFtQixJQUFJLENBQUM7SUFDakMsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFakQsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVoQixZQUNxQyxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosS0FBSyxHQUFHLEdBQVcsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFBO0lBRUQsV0FBVyxHQUFHLEdBQVksRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQyxDQUFBO0lBRUQsYUFBYSxHQUFHLENBQUMsVUFBbUIsRUFBUSxFQUFFO1FBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsQ0FBQyxRQUFpQixFQUFRLEVBQUU7UUFDeEMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELGNBQWMsQ0FBQyxNQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7d0dBNUNVLGlCQUFpQixrQkFXbEIsaUJBQWlCOzRGQVhoQixpQkFBaUIsaU5DUjlCLGdxQkFpQk07OzRGRFRPLGlCQUFpQjtrQkFON0IsU0FBUzsrQkFDRSxnQkFBZ0IsbUJBR1QsdUJBQXVCLENBQUMsTUFBTTs7MEJBYTVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVZsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFibGUtcm93JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXJvdy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtcm93LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVJvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0YWJsZTogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgbWFyZ2luUmlnaHQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgc2V0U2VsZWN0YWJsZSA9IChzZWxlY3RhYmxlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkID0gKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChzZWxlY3RlZCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0TWFyZ2luUmlnaHQobWFyZ2luOiBudW1iZXIpIHtcbiAgICB0aGlzLm1hcmdpblJpZ2h0ID0gbWFyZ2luIC0gNTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn0iLCI8ZGl2IFxuICAgIGlkPVwie3tpZH19XCJcbiAgICBjbGFzcz1cImJpenktdGFibGUtcm93IHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LXRhYmxlLXJvdy0tZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ2JpenktdGFibGUtcm93LS1zZWxlY3RlZCc6IHNlbGVjdGVkfVwiPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS10YWJsZS1jb2x1bW5cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8Yml6eS1jaGVja2JveCBcbiAgICAgICAgKm5nSWY9XCJzZWxlY3RhYmxlICE9PSBudWxsXCJcbiAgICAgICAgY2xhc3M9XCJiaXp5LXRhYmxlLXJvd19fY2hlY2tib3hcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7cmlnaHQ6IG1hcmdpblJpZ2h0ICsgJ3B4J31cIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtcm93X19jaGVja2JveC0taGlkZGVuJzogc2VsZWN0YWJsZSA9PT0gZmFsc2UsICdiaXp5LXRhYmxlLXJvd19fY2hlY2tib3gtLXNoYWRvdyc6IG1hcmdpblJpZ2h0ID4gMH1cIlxuICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAob25TZWxlY3QpPVwib25TZWxlY3QuZW1pdCgkZXZlbnQpXCI+XG4gICAgPC9iaXp5LWNoZWNrYm94PlxuICAgIFxuPC9kaXY+Il19