import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../checkbox/checkbox.component";
export class BizyTableHeaderComponent {
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
        this.marginRight = margin - 5;
        this.ref.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTableHeaderComponent, selector: "bizy-table-header", inputs: { id: "id", customClass: "customClass", selected: "selected", selectable: "selectable" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    id=\"{{id}}\"\n    class=\"bizy-table-header {{customClass}}\">\n\n    <ng-content select=\"bizy-table-column\"></ng-content>\n\n    <span \n        *ngIf=\"selectable !== null\"\n        class=\"bizy-table-header__checkbox-wrapper\"\n        [ngStyle]=\"{right: marginRight + 'px'}\"\n        [ngClass]=\"{'bizy-table-footer__checkbox--shadow': marginRight > 0}\">\n        \n        <bizy-checkbox \n            [selected]=\"selected\"\n            (onSelect)=\"onSelect.emit($event)\"\n            [ngClass]=\"{'bizy-table-header__checkbox--hidden': selectable === false}\">\n        </bizy-checkbox>\n    </span>\n\n</div>", styles: [":host{font-size:1rem;width:-moz-fit-content;width:fit-content;min-width:100%}.bizy-table-header{font-size:1rem;padding:0 .3rem;display:flex;align-items:center;height:var(--bizy-table-header-height);width:-moz-fit-content;width:fit-content;min-width:var(--bizy-table-width);background-color:var(--bizy-table-header-background-color)}.bizy-table-header__checkbox-wrapper{z-index:1;background-color:inherit;padding:0 10px;display:grid;place-items:center;position:relative;height:100%}.bizy-table-header__checkbox--shadow{box-shadow:-19px 0 28px -9px #00000080}.bizy-table-header__checkbox--hidden{pointer-events:none;visibility:hidden;opacity:0}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJsZS90YWJsZS1oZWFkZXIvdGFibGUtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0gsTUFBTSxPQUFPLHdCQUF3QjtJQVVFO0lBVDVCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBbUIsSUFBSSxDQUFDO0lBQ2pDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRWpELFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFaEIsWUFDcUMsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFZLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTtJQUVELGFBQWEsR0FBRyxDQUFDLFVBQW1CLEVBQVEsRUFBRTtRQUM1QyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQzt3R0FqQ1Usd0JBQXdCLGtCQVV6QixpQkFBaUI7NEZBVmhCLHdCQUF3Qiw4TENSckMsK25CQW1CTTs7NEZEWE8sd0JBQXdCO2tCQU5wQyxTQUFTOytCQUNFLG1CQUFtQixtQkFHWix1QkFBdUIsQ0FBQyxNQUFNOzswQkFZNUMsTUFBTTsyQkFBQyxpQkFBaUI7NENBVGxCLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktdGFibGUtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWhlYWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtaGVhZGVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5VGFibGVIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIG1hcmdpblJpZ2h0ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIGdldElkID0gKCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cblxuICBnZXRTZWxlY3RlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIHNldFNlbGVjdGFibGUgPSAoc2VsZWN0YWJsZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnNlbGVjdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RhYmxlID0gc2VsZWN0YWJsZTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRNYXJnaW5SaWdodChtYXJnaW46IG51bWJlcikge1xuICAgIHRoaXMubWFyZ2luUmlnaHQgPSBtYXJnaW4gLSA1O1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufSIsIjxkaXYgXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIGNsYXNzPVwiYml6eS10YWJsZS1oZWFkZXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXRhYmxlLWNvbHVtblwiPjwvbmctY29udGVudD5cblxuICAgIDxzcGFuIFxuICAgICAgICAqbmdJZj1cInNlbGVjdGFibGUgIT09IG51bGxcIlxuICAgICAgICBjbGFzcz1cImJpenktdGFibGUtaGVhZGVyX19jaGVja2JveC13cmFwcGVyXCJcbiAgICAgICAgW25nU3R5bGVdPVwie3JpZ2h0OiBtYXJnaW5SaWdodCArICdweCd9XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LXRhYmxlLWZvb3Rlcl9fY2hlY2tib3gtLXNoYWRvdyc6IG1hcmdpblJpZ2h0ID4gMH1cIj5cbiAgICAgICAgXG4gICAgICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LXRhYmxlLWhlYWRlcl9fY2hlY2tib3gtLWhpZGRlbic6IHNlbGVjdGFibGUgPT09IGZhbHNlfVwiPlxuICAgICAgICA8L2JpenktY2hlY2tib3g+XG4gICAgPC9zcGFuPlxuXG48L2Rpdj4iXX0=