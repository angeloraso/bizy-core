import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class TableHeaderComponent {
    ref;
    id = String(Math.random());
    customClass = '';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableHeaderComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable\"\n        [(selected)]=\"selected\"\n        (onSelect)=\"onSelect.emit(selected)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-table-header{font-size:1rem;width:100%;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height, 2.4rem);background-color:var(--bizy-table-header-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <bizy-checkbox \n        *ngIf=\"selectable\"\n        [(selected)]=\"selected\"\n        (onSelect)=\"onSelect.emit(selected)\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-table-header{font-size:1rem;width:100%;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height, 2.4rem);background-color:var(--bizy-table-header-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectable: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0gsTUFBTSxPQUFPLG9CQUFvQjtJQVFNO0lBUDVCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBbUIsSUFBSSxDQUFDO0lBQ2pDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRWpELFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsR0FBWSxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDLENBQUE7SUFFRCxhQUFhLEdBQUcsQ0FBQyxVQUFtQixFQUFRLEVBQUU7UUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTt3R0ExQlUsb0JBQW9CLGtCQVFyQixpQkFBaUI7NEZBUmhCLG9CQUFvQiw4TENSakMsdVRBWU07OzRGREpPLG9CQUFvQjtrQkFOaEMsU0FBUzsrQkFDRSxtQkFBbUIsbUJBR1osdUJBQXVCLENBQUMsTUFBTTs7MEJBVTVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVBsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWhlYWRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgc2V0U2VsZWN0YWJsZSA9IChzZWxlY3RhYmxlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufSIsIjxkaXYgXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIGNsYXNzPVwiYml6eS10YWJsZS1oZWFkZXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWNvbHVtblwiPjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICAqbmdJZj1cInNlbGVjdGFibGVcIlxuICAgICAgICBbKHNlbGVjdGVkKV09XCJzZWxlY3RlZFwiXG4gICAgICAgIChvblNlbGVjdCk9XCJvblNlbGVjdC5lbWl0KHNlbGVjdGVkKVwiPlxuICAgIDwvYml6eS1jaGVja2JveD5cbiAgICBcbjwvZGl2PiJdfQ==