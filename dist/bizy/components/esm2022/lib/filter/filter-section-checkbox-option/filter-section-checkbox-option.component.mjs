import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../checkbox/checkbox.component";
export class BizyFilterSectionCheckboxOptionComponent {
    ref;
    id = `bizy-filter-section-checkbox-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onChange = new EventEmitter();
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        this._selected = selected;
        this.onSelect(selected);
    }
    _selected = true;
    constructor(ref) {
        this.ref = ref;
    }
    onSelect = (selected) => {
        if (this.disabled) {
            return;
        }
        this._selected = selected;
        this.onChange.emit(selected);
        this.ref.detectChanges();
    };
    getSelected = () => {
        return this._selected;
    };
    getId = () => {
        return this.id;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionCheckboxOptionComponent, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    [id]=\"id\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"], dependencies: [{ kind: "component", type: i1.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    [id]=\"id\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUTNILE1BQU0sT0FBTyx3Q0FBd0M7SUFrQmQ7SUFqQjVCLEVBQUUsR0FBVyx1Q0FBdUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDcEUsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRWpELElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDeEQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUyxHQUFZLElBQUksQ0FBQztJQUUxQixZQUNxQyxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosUUFBUSxHQUFHLENBQUMsUUFBaUIsRUFBRSxFQUFFO1FBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUMsQ0FBQTtJQUVELEtBQUssR0FBRyxHQUFHLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFBO3dHQXJDVSx3Q0FBd0Msa0JBa0J6QyxpQkFBaUI7NEZBbEJoQix3Q0FBd0MsNE1DUnJELCtZQWNNOzs0RkROTyx3Q0FBd0M7a0JBTnBELFNBQVM7K0JBQ0UscUNBQXFDLG1CQUc5Qix1QkFBdUIsQ0FBQyxNQUFNOzswQkFvQjVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQWpCbEIsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUVNLFFBQVE7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlGaWx0ZXJTZWN0aW9uQ2hlY2tib3hPcHRpb25Db21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYGJpenktZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBASW5wdXQoKSBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkID09PSAndW5kZWZpbmVkJyB8fCBzZWxlY3RlZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5vblNlbGVjdChzZWxlY3RlZCk7XG4gIH1cblxuICBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgb25TZWxlY3QgPSAoc2VsZWN0ZWQ6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBnZXRTZWxlY3RlZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBnZXRJZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxufSIsIjxkaXYgXG4gICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIFtpZF09XCJpZFwiXG4gICAgKGNsaWNrKT1cIm9uU2VsZWN0KCFfc2VsZWN0ZWQpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwib25TZWxlY3QoIV9zZWxlY3RlZClcIj5cblxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uX19jaGVja2JveFwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJfc2VsZWN0ZWRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICA8L2JpenktY2hlY2tib3g+XG4gICAgXG48L2Rpdj4iXX0=