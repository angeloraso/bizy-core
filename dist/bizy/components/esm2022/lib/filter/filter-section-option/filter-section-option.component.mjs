import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../checkbox/checkbox.component";
export class FilterSectionOptionComponent {
    ref;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = true;
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.setSelect(!this.selected);
    }
    setSelect(selected) {
        this.selected = selected;
        this.onSelect.emit({ id: this.id, selected: this.selected });
        this.ref.detectChanges();
    }
    getSelected() {
        return this.selected;
    }
    getId() {
        return this.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionOptionComponent, selector: "bizy-filter-section-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        [selected]=\"selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}\n"], dependencies: [{ kind: "component", type: i1.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        [selected]=\"selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tb3B0aW9uL2ZpbHRlci1zZWN0aW9uLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUTNILE1BQU0sT0FBTyw0QkFBNEI7SUFRRjtJQVA1QixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksSUFBSSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBbUMsQ0FBQztJQUV6RSxZQUNxQyxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBaUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO3dHQS9CVSw0QkFBNEIsa0JBUTdCLGlCQUFpQjs0RkFSaEIsNEJBQTRCLG1NQ1J6QyxvVEFhTTs7NEZETE8sNEJBQTRCO2tCQU54QyxTQUFTOytCQUNFLDRCQUE0QixtQkFHckIsdUJBQXVCLENBQUMsTUFBTTs7MEJBVTVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVBsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWZpbHRlci1zZWN0aW9uLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItc2VjdGlvbi1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci1zZWN0aW9uLW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyU2VjdGlvbk9wdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHtpZDogc3RyaW5nLCBzZWxlY3RlZDogYm9vbGVhbn0+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBfb25TZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFNlbGVjdCghdGhpcy5zZWxlY3RlZClcbiAgfVxuXG4gIHNldFNlbGVjdChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoe2lkOiB0aGlzLmlkLCBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZH0pO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cbn0iLCI8ZGl2IFxuICAgIGNsYXNzPVwiYml6eS1maWx0ZXItc2VjdGlvbi1vcHRpb24ge3tjdXN0b21DbGFzc319XCJcbiAgICBpZD1cInt7aWR9fVwiXG4gICAgKGNsaWNrKT1cIl9vblNlbGVjdCgpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KClcIj5cblxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICAgIDxiaXp5LWNoZWNrYm94IFxuICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICA8L2JpenktY2hlY2tib3g+XG4gICAgXG48L2Rpdj4iXX0=