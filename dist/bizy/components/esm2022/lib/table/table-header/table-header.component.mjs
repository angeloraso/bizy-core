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
    setMarginRight(margin) {
        this.marginRight = margin > 5 ? margin : 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableHeaderComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 5}\">\n        \n        <bizy-checkbox \n            [(selected)]=\"selected\"\n            (onSelect)=\"onSelect.emit(selected)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height, 2.4rem);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width, 100%);background-color:var(--bizy-table-header-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 5}\">\n        \n        <bizy-checkbox \n            [(selected)]=\"selected\"\n            (onSelect)=\"onSelect.emit(selected)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height, 2.4rem);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width, 100%);background-color:var(--bizy-table-header-background-color, #ffffff);border-bottom:.1rem solid var(--bizy-table-border-bottom-color, #eeeeee)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0gsTUFBTSxPQUFPLG9CQUFvQjtJQVVNO0lBVDVCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBbUIsSUFBSSxDQUFDO0lBQ2pDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRWpELFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFaEIsWUFDcUMsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFZLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTtJQUVELGFBQWEsR0FBRyxDQUFDLFVBQW1CLEVBQVEsRUFBRTtRQUM1QyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7d0dBakNVLG9CQUFvQixrQkFVckIsaUJBQWlCOzRGQVZoQixvQkFBb0IsOExDUmpDLG1vQkFtQk07OzRGRFhPLG9CQUFvQjtrQkFOaEMsU0FBUzsrQkFDRSxtQkFBbUIsbUJBR1osdUJBQXVCLENBQUMsTUFBTTs7MEJBWTVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVRsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWhlYWRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIG1hcmdpblJpZ2h0ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIGdldElkID0gKCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cblxuICBnZXRTZWxlY3RlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIHNldFNlbGVjdGFibGUgPSAoc2VsZWN0YWJsZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnNlbGVjdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RhYmxlID0gc2VsZWN0YWJsZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRNYXJnaW5SaWdodChtYXJnaW46IG51bWJlcikge1xuICAgIHRoaXMubWFyZ2luUmlnaHQgPSBtYXJnaW4gPiA1ID8gbWFyZ2luIDogNTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn0iLCI8ZGl2IFxuICAgIGlkPVwie3tpZH19XCJcbiAgICBjbGFzcz1cImJpenktdGFibGUtaGVhZGVyIHt7Y3VzdG9tQ2xhc3N9fVwiPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS10YWJsZS1jb2x1bW5cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8c3BhbiBcbiAgICAgICAgKm5nSWY9XCJzZWxlY3RhYmxlICE9PSBudWxsXCJcbiAgICAgICAgY2xhc3M9XCJiaXp5LXRhYmxlLWhlYWRlcl9fY2hlY2tib3gtd3JhcHBlclwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIntyaWdodDogbWFyZ2luUmlnaHQgKyAncHgnfVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS10YWJsZS1mb290ZXJfX2NoZWNrYm94LS1zaGFkb3cnOiBtYXJnaW5SaWdodCA+IDV9XCI+XG4gICAgICAgIFxuICAgICAgICA8Yml6eS1jaGVja2JveCBcbiAgICAgICAgICAgIFsoc2VsZWN0ZWQpXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJvblNlbGVjdC5lbWl0KHNlbGVjdGVkKVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktdGFibGUtaGVhZGVyX19jaGVja2JveC0taGlkZGVuJzogc2VsZWN0YWJsZSA9PT0gZmFsc2V9XCI+XG4gICAgICAgIDwvYml6eS1jaGVja2JveD5cbiAgICA8L3NwYW4+XG5cbjwvZGl2PiJdfQ==