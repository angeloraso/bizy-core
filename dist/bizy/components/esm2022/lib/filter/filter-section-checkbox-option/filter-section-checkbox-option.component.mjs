import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../checkbox/checkbox.component";
export class FilterSectionCheckboxOptionComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionCheckboxOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionCheckboxOptionComponent, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        [selected]=\"selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}\n"], dependencies: [{ kind: "component", type: i1.CheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        [selected]=\"selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUTNILE1BQU0sT0FBTyxvQ0FBb0M7SUFRVjtJQVA1QixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksSUFBSSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBbUMsQ0FBQztJQUV6RSxZQUNxQyxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBaUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO3dHQS9CVSxvQ0FBb0Msa0JBUXJDLGlCQUFpQjs0RkFSaEIsb0NBQW9DLDRNQ1JqRCw2VEFhTTs7NEZETE8sb0NBQW9DO2tCQU5oRCxTQUFTOytCQUNFLHFDQUFxQyxtQkFHOUIsdUJBQXVCLENBQUMsTUFBTTs7MEJBVTVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVBsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyU2VjdGlvbkNoZWNrYm94T3B0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8e2lkOiBzdHJpbmcsIHNlbGVjdGVkOiBib29sZWFufT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIF9vblNlbGVjdCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U2VsZWN0KCF0aGlzLnNlbGVjdGVkKVxuICB9XG5cbiAgc2V0U2VsZWN0KHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh7aWQ6IHRoaXMuaWQsIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkfSk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxufSIsIjxkaXYgXG4gICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIGlkPVwie3tpZH19XCJcbiAgICAoY2xpY2spPVwiX29uU2VsZWN0KClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJfb25TZWxlY3QoKVwiPlxuXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gICAgPGJpenktY2hlY2tib3ggXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgIDwvYml6eS1jaGVja2JveD5cbiAgICBcbjwvZGl2PiJdfQ==