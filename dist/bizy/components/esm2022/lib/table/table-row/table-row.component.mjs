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
        this.marginRight = margin > 5 ? margin : 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-row__checkbox\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 5}\"\n        [(selected)]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit(selected)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:var(--bizy-table-row-height, 2rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color, #2484C6)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color, #ffffff)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-row__checkbox\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-row__checkbox--hidden': selectable === false, 'bizy-table-row__checkbox--shadow': marginRight > 5}\"\n        [(selected)]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit(selected)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem;width:100%;display:flex;min-width:-moz-fit-content;min-width:fit-content}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:var(--bizy-table-row-height, 2rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-background-color, #2484C6)!important}::ng-deep .bizy-table-row--selected *{font-weight:700!important;color:var(--bizy-table-row-selected-color, #ffffff)!important}.bizy-table-row__checkbox{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-row__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-row__checkbox--hidden{visibility:hidden;pointer-events:none}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0gsTUFBTSxPQUFPLGlCQUFpQjtJQVdTO0lBVjVCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsVUFBVSxHQUFtQixJQUFJLENBQUM7SUFDakMsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFakQsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVoQixZQUNxQyxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosS0FBSyxHQUFHLEdBQVcsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFBO0lBRUQsV0FBVyxHQUFHLEdBQVksRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQyxDQUFBO0lBRUQsYUFBYSxHQUFHLENBQUMsVUFBbUIsRUFBUSxFQUFFO1FBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsQ0FBQyxRQUFpQixFQUFRLEVBQUU7UUFDeEMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELGNBQWMsQ0FBQyxNQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO3dHQTVDVSxpQkFBaUIsa0JBV2xCLGlCQUFpQjs0RkFYaEIsaUJBQWlCLGlOQ1I5QixvcUJBaUJNOzs0RkRUTyxpQkFBaUI7a0JBTjdCLFNBQVM7K0JBQ0UsZ0JBQWdCLG1CQUdULHVCQUF1QixDQUFDLE1BQU07OzBCQWE1QyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0FWbEIsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLXJvdy5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVSb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIG1hcmdpblJpZ2h0ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIGdldElkID0gKCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cblxuICBnZXRTZWxlY3RlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIHNldFNlbGVjdGFibGUgPSAoc2VsZWN0YWJsZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnNlbGVjdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RhYmxlID0gc2VsZWN0YWJsZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRTZWxlY3RlZCA9IChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnNlbGVjdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoc2VsZWN0ZWQpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldE1hcmdpblJpZ2h0KG1hcmdpbjogbnVtYmVyKSB7XG4gICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpbiA+IDUgPyBtYXJnaW4gOiA1O1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufSIsIjxkaXYgXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIGNsYXNzPVwiYml6eS10YWJsZS1yb3cge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtcm93LS1kaXNhYmxlZCc6IGRpc2FibGVkLCAnYml6eS10YWJsZS1yb3ctLXNlbGVjdGVkJzogc2VsZWN0ZWR9XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWNvbHVtblwiPjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICAqbmdJZj1cInNlbGVjdGFibGUgIT09IG51bGxcIlxuICAgICAgICBjbGFzcz1cImJpenktdGFibGUtcm93X19jaGVja2JveFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntyaWdodDogbWFyZ2luUmlnaHQgKyAncHgnfVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS10YWJsZS1yb3dfX2NoZWNrYm94LS1oaWRkZW4nOiBzZWxlY3RhYmxlID09PSBmYWxzZSwgJ2JpenktdGFibGUtcm93X19jaGVja2JveC0tc2hhZG93JzogbWFyZ2luUmlnaHQgPiA1fVwiXG4gICAgICAgIFsoc2VsZWN0ZWQpXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgKG9uU2VsZWN0KT1cIm9uU2VsZWN0LmVtaXQoc2VsZWN0ZWQpXCI+XG4gICAgPC9iaXp5LWNoZWNrYm94PlxuICAgIFxuPC9kaXY+Il19