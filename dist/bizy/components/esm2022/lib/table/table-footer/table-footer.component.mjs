import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class BizyTableFooterComponent {
    ref;
    elementRef;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableFooterComponent, deps: [{ token: ChangeDetectorRef }, { token: ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableFooterComponent, selector: "bizy-table-footer", inputs: { id: "id", customClass: "customClass" }, ngImport: i0, template: "<div \n    [id]=\"id\"\n    class=\"bizy-table-footer {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n\n    <span \n        *ngIf=\"_selectable\"\n        class=\"bizy-table-footer__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            class=\"bizy-table-footer__checkbox\">\n        </bizy-checkbox>\n    </span>\n    \n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-footer{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-footer-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-footer-background-color)}.bizy-table-footer__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-footer__checkbox{visibility:hidden;pointer-events:none;opacity:0}.bizy-table-footer__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1mb290ZXIvdGFibGUtZm9vdGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVFqSCxNQUFNLE9BQU8sd0JBQXdCO0lBU0U7SUFDUjtJQVRwQixFQUFFLEdBQVcscUJBQXFCLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ2xELFdBQVcsR0FBVyxFQUFFLENBQUM7SUFFbEMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVoQixXQUFXLEdBQVksS0FBSyxDQUFDO0lBRTdCLFlBQ3FDLEdBQXNCLEVBQzlCLFVBQXNCO1FBRGQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUNoRCxDQUFDO0lBRUosS0FBSyxHQUFHLEdBQVcsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFBO0lBRUQsYUFBYSxHQUFHLENBQUMsVUFBbUIsRUFBUSxFQUFFO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQzt3R0F6QlUsd0JBQXdCLGtCQVN6QixpQkFBaUIsYUFDakIsVUFBVTs0RkFWVCx3QkFBd0IsMkdDUnJDLDhmQWtCTTs7NEZEVk8sd0JBQXdCO2tCQU5wQyxTQUFTOytCQUNFLG1CQUFtQixtQkFHWix1QkFBdUIsQ0FBQyxNQUFNOzswQkFXNUMsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUN4QixNQUFNOzJCQUFDLFVBQVU7NENBVFgsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlLWZvb3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1mb290ZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWZvb3Rlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eVRhYmxlRm9vdGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXRhYmxlLWZvb3Rlci0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gIG1hcmdpblJpZ2h0ID0gMDtcblxuICBfc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgc2V0U2VsZWN0YWJsZSA9IChzZWxlY3RhYmxlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZSA9IHNlbGVjdGFibGU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0TWFyZ2luUmlnaHQobWFyZ2luOiBudW1iZXIpIHtcbiAgICB0aGlzLm1hcmdpblJpZ2h0ID0gbWFyZ2luIC0gNTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn0iLCI8ZGl2IFxuICAgIFtpZF09XCJpZFwiXG4gICAgY2xhc3M9XCJiaXp5LXRhYmxlLWZvb3RlciB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktdGFibGUtY29sdW1uXCI+PC9uZy1jb250ZW50PlxuXG5cbiAgICA8c3BhbiBcbiAgICAgICAgKm5nSWY9XCJfc2VsZWN0YWJsZVwiXG4gICAgICAgIGNsYXNzPVwiYml6eS10YWJsZS1mb290ZXJfX2NoZWNrYm94LXdyYXBwZXJcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7cmlnaHQ6IG1hcmdpblJpZ2h0ICsgJ3B4J31cIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtZm9vdGVyX19jaGVja2JveC0tc2hhZG93JzogbWFyZ2luUmlnaHQgPiAwfVwiPlxuICAgICAgICBcbiAgICAgICAgPGJpenktY2hlY2tib3ggXG4gICAgICAgICAgICBjbGFzcz1cImJpenktdGFibGUtZm9vdGVyX19jaGVja2JveFwiPlxuICAgICAgICA8L2JpenktY2hlY2tib3g+XG4gICAgPC9zcGFuPlxuICAgIFxuPC9kaXY+Il19