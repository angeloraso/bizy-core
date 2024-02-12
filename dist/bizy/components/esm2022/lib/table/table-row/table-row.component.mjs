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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableRowComponent, selector: "bizy-table-row", inputs: { id: "id", customClass: "customClass", disabled: "disabled", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable\"\n        class=\"bizy-table-row__checkbox\"\n        [(selected)]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit(selected)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:var(--bizy-table-row-height, 2.8rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-color, #e2eefa)}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-row', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-row {{customClass}}\"\n    [ngClass]=\"{'bizy-table-row--disabled': disabled, 'bizy-table-row--selected': selected}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable\"\n        class=\"bizy-table-row__checkbox\"\n        [(selected)]=\"selected\"\n        [disabled]=\"disabled\"\n        (onSelect)=\"onSelect.emit(selected)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-table-row{font-size:1rem;width:100%;display:flex;align-items:center;padding:0 .3rem;height:var(--bizy-table-row-height, 2.8rem);background-color:var(--bizy-table-row-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-row--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-table-row--selected{background-color:var(--bizy-table-row-selected-color, #e2eefa)}::ng-deep .bizy-table-row:first-child{padding-left:.3rem}::ng-deep .bizy-table-row:last-child{padding-right:.3rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1yb3cvdGFibGUtcm93Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0gsTUFBTSxPQUFPLGlCQUFpQjtJQVNTO0lBUjVCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsVUFBVSxHQUFtQixJQUFJLENBQUM7SUFDakMsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFakQsWUFDcUMsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFZLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTtJQUVELGFBQWEsR0FBRyxDQUFDLFVBQW1CLEVBQVEsRUFBRTtRQUM1QyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsV0FBVyxHQUFHLENBQUMsUUFBaUIsRUFBUSxFQUFFO1FBQ3hDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7d0dBckNVLGlCQUFpQixrQkFTbEIsaUJBQWlCOzRGQVRoQixpQkFBaUIsaU5DUjlCLGllQWVNOzs0RkRQTyxpQkFBaUI7a0JBTjdCLFNBQVM7K0JBQ0UsZ0JBQWdCLG1CQUdULHVCQUF1QixDQUFDLE1BQU07OzBCQVc1QyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0FSbEIsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLXJvdy5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVSb3dDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgc2V0U2VsZWN0YWJsZSA9IChzZWxlY3RhYmxlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkID0gKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChzZWxlY3RlZCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59IiwiPGRpdiBcbiAgICBpZD1cInt7aWR9fVwiXG4gICAgY2xhc3M9XCJiaXp5LXRhYmxlLXJvdyB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS10YWJsZS1yb3ctLWRpc2FibGVkJzogZGlzYWJsZWQsICdiaXp5LXRhYmxlLXJvdy0tc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtY29sdW1uXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPGJpenktY2hlY2tib3ggXG4gICAgICAgICpuZ0lmPVwic2VsZWN0YWJsZVwiXG4gICAgICAgIGNsYXNzPVwiYml6eS10YWJsZS1yb3dfX2NoZWNrYm94XCJcbiAgICAgICAgWyhzZWxlY3RlZCldPVwic2VsZWN0ZWRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAob25TZWxlY3QpPVwib25TZWxlY3QuZW1pdChzZWxlY3RlZClcIj5cbiAgICA8L2JpenktY2hlY2tib3g+XG4gICAgXG48L2Rpdj4iXX0=