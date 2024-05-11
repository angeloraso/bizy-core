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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionCheckboxOptionComponent, selector: "bizy-filter-section-checkbox-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"], dependencies: [{ kind: "component", type: i1.BizyCheckboxComponent, selector: "bizy-checkbox", inputs: ["id", "name", "selected", "disabled"], outputs: ["selectedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionCheckboxOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-checkbox-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-checkbox-option {{customClass}}\"\n    id=\"{{id}}\"\n    (click)=\"onSelect(!_selected)\"\n    (keyup.enter)=\"onSelect(!_selected)\">\n\n    <ng-content></ng-content>\n\n    <bizy-checkbox \n        class=\"bizy-filter-section-checkbox-option__checkbox\"\n        [selected]=\"_selected\"\n        [disabled]=\"disabled\">\n    </bizy-checkbox>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-checkbox-option{display:flex;align-items:center;column-gap:.3rem;justify-content:space-between;cursor:pointer}.bizy-filter-section-checkbox-option__checkbox{pointer-events:none}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi9maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUTNILE1BQU0sT0FBTyx3Q0FBd0M7SUFrQmQ7SUFqQjVCLEVBQUUsR0FBOEIsdUNBQXVDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ3ZGLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVqRCxJQUFhLFFBQVEsQ0FBQyxRQUFpQjtRQUNyQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3hELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQVMsR0FBWSxJQUFJLENBQUM7SUFFMUIsWUFDcUMsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLFFBQVEsR0FBRyxDQUFDLFFBQWlCLEVBQUUsRUFBRTtRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDLENBQUE7SUFFRCxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTt3R0FyQ1Usd0NBQXdDLGtCQWtCekMsaUJBQWlCOzRGQWxCaEIsd0NBQXdDLDRNQ1JyRCxpWkFjTTs7NEZETk8sd0NBQXdDO2tCQU5wRCxTQUFTOytCQUNFLHFDQUFxQyxtQkFHOUIsdUJBQXVCLENBQUMsTUFBTTs7MEJBb0I1QyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0FqQmxCLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFFTSxRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsdGVyU2VjdGlvbkNoZWNrYm94T3B0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gPSBgYml6eS1maWx0ZXItc2VjdGlvbi1jaGVja2JveC1vcHRpb24tJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlbGVjdGVkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uU2VsZWN0KHNlbGVjdGVkKTtcbiAgfVxuXG4gIF9zZWxlY3RlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBvblNlbGVjdCA9IChzZWxlY3RlZDogYm9vbGVhbikgPT4ge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIGdldElkID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG59IiwiPGRpdiBcbiAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tY2hlY2tib3gtb3B0aW9uIHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIChjbGljayk9XCJvblNlbGVjdCghX3NlbGVjdGVkKVwiXG4gICAgKGtleXVwLmVudGVyKT1cIm9uU2VsZWN0KCFfc2VsZWN0ZWQpXCI+XG5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICA8Yml6eS1jaGVja2JveCBcbiAgICAgICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLWNoZWNrYm94LW9wdGlvbl9fY2hlY2tib3hcIlxuICAgICAgICBbc2VsZWN0ZWRdPVwiX3NlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgPC9iaXp5LWNoZWNrYm94PlxuICAgIFxuPC9kaXY+Il19