import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class TableFooterComponent {
    ref;
    id = String(Math.random());
    customClass = '';
    _selectable = null;
    constructor(ref) {
        this.ref = ref;
    }
    getId = () => {
        return this.id;
    };
    setSelectable = (selectable) => {
        this._selectable = selectable;
        this.ref.detectChanges();
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableFooterComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableFooterComponent, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <bizy-checkbox \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-table-footer{font-size:1rem;width:100%;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height, 2.4rem);background-color:var(--bizy-table-header-background-color, #ffffff);border-top:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <bizy-checkbox \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-table-footer{font-size:1rem;width:100%;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height, 2.4rem);background-color:var(--bizy-table-header-background-color, #ffffff);border-top:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUXJHLE1BQU0sT0FBTyxvQkFBb0I7SUFPTTtJQU41QixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFFbEMsV0FBVyxHQUFtQixJQUFJLENBQUM7SUFFbkMsWUFDcUMsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELGFBQWEsR0FBRyxDQUFDLFVBQW1CLEVBQVEsRUFBRTtRQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTt3R0FqQlUsb0JBQW9CLGtCQU9yQixpQkFBaUI7NEZBUGhCLG9CQUFvQiwyR0NSakMsc1JBWU07OzRGREpPLG9CQUFvQjtrQkFOaEMsU0FBUzsrQkFDRSxtQkFBbUIsbUJBR1osdUJBQXVCLENBQUMsTUFBTTs7MEJBUzVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQU5sQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFibGUtZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWZvb3Rlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtZm9vdGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUZvb3RlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgXG4gIF9zZWxlY3RhYmxlOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgc2V0U2VsZWN0YWJsZSA9IChzZWxlY3RhYmxlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZSA9IHNlbGVjdGFibGU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59IiwiPGRpdiBcbiAgICBpZD1cInt7aWR9fVwiXG4gICAgY2xhc3M9XCJiaXp5LXRhYmxlLWZvb3RlciB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtY29sdW1uXCI+PC9uZy1jb250ZW50PlxuXG5cbiAgICA8Yml6eS1jaGVja2JveCBcbiAgICAgICAgKm5nSWY9XCJfc2VsZWN0YWJsZVwiXG4gICAgICAgIGNsYXNzPVwiYml6eS10YWJsZS1mb290ZXJfX2NoZWNrYm94XCI+XG4gICAgPC9iaXp5LWNoZWNrYm94PlxuICAgIFxuPC9kaXY+Il19