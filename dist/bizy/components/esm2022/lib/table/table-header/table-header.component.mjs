import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class BizyTableHeaderComponent {
    ref;
    elementRef;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (selectedChange)=\"selectedChange.emit($event)\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
                }] }]; }, propDecorators: { id: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUXZJLE1BQU0sT0FBTyx3QkFBd0I7SUFXRTtJQUNSO0lBWHBCLEVBQUUsR0FBVyxxQkFBcUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDbEQsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBbUIsSUFBSSxDQUFDO0lBQ2pDLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzdDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLFlBQ3FDLEdBQXNCLEVBQzlCLFVBQXNCO1FBRGQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUNoRCxDQUFDO0lBRUosS0FBSyxHQUFHLEdBQVcsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFBO0lBRUQsV0FBVyxHQUFHLEdBQVksRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQyxDQUFBO0lBRUQsYUFBYSxHQUFHLENBQUMsVUFBbUIsRUFBUSxFQUFFO1FBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxjQUFjLENBQUMsTUFBYztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO3dHQW5DVSx3QkFBd0Isa0JBV3pCLGlCQUFpQixhQUNqQixVQUFVOzRGQVpULHdCQUF3QixnT0NSckMsMnJCQW9CTTs7NEZEWk8sd0JBQXdCO2tCQU5wQyxTQUFTOytCQUNFLG1CQUFtQixtQkFHWix1QkFBdUIsQ0FBQyxNQUFNOzswQkFhNUMsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFVBQVU7NENBWFgsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWhlYWRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRhYmxlSGVhZGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXRhYmxlLWhlYWRlci0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWxlY3RhYmxlOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgbWFyZ2luUmlnaHQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXRTZWxlY3RhYmxlID0gKHNlbGVjdGFibGU6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0TWFyZ2luUmlnaHQobWFyZ2luOiBudW1iZXIpIHtcbiAgICB0aGlzLm1hcmdpblJpZ2h0ID0gbWFyZ2luIC0gNTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn0iLCI8ZGl2IFxuICAgIFtpZF09XCJpZFwiXG4gICAgY2xhc3M9XCJiaXp5LXRhYmxlLWhlYWRlciB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtY29sdW1uXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPHNwYW4gXG4gICAgICAgICpuZ0lmPVwic2VsZWN0YWJsZSAhPT0gbnVsbFwiXG4gICAgICAgIGNsYXNzPVwiYml6eS10YWJsZS1oZWFkZXJfX2NoZWNrYm94LXdyYXBwZXJcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7cmlnaHQ6IG1hcmdpblJpZ2h0ICsgJ3B4J31cIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtZm9vdGVyX19jaGVja2JveC0tc2hhZG93JzogbWFyZ2luUmlnaHQgPiAwfVwiPlxuICAgICAgICBcbiAgICAgICAgPGJpenktY2hlY2tib3ggXG4gICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cInNlbGVjdGVkQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAob25TZWxlY3QpPVwib25TZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS10YWJsZS1oZWFkZXJfX2NoZWNrYm94LS1oaWRkZW4nOiBzZWxlY3RhYmxlID09PSBmYWxzZX1cIj5cbiAgICAgICAgPC9iaXp5LWNoZWNrYm94PlxuICAgIDwvc3Bhbj5cblxuPC9kaXY+Il19