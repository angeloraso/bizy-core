import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyInputOptionComponent {
    ref;
    id = `bizy-input-${Math.random()}`;
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyInputOptionComponent, selector: "bizy-input-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-input-option--selected': selected, 'bizy-input-option--disabled': disabled}\"\n    class=\"bizy-input-option {{customClass}}\">\n\n    <span class=\"bizy-input-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-input-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-input-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-input-color);cursor:pointer}.bizy-input-option:hover{background-color:var(--bizy-input-option-hover-background-color)}.bizy-input-option--selected{background-color:var(--bizy-input-option-selected-background-color)!important}.bizy-input-option--selected ::ng-deep .bizy-input-option__content *{color:var(--bizy-input-option-selected-color)}.bizy-input-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyInputOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-input-option--selected': selected, 'bizy-input-option--disabled': disabled}\"\n    class=\"bizy-input-option {{customClass}}\">\n\n    <span class=\"bizy-input-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-input-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-input-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-input-color);cursor:pointer}.bizy-input-option:hover{background-color:var(--bizy-input-option-hover-background-color)}.bizy-input-option--selected{background-color:var(--bizy-input-option-selected-background-color)!important}.bizy-input-option--selected ::ng-deep .bizy-input-option__content *{color:var(--bizy-input-option-selected-color)}.bizy-input-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-input-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC1vcHRpb24vaW5wdXQtb3B0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC1vcHRpb24vaW5wdXQtb3B0aW9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWMsTUFBTSxlQUFlLENBQUM7OztBQVF2SSxNQUFNLE9BQU8sd0JBQXdCO0lBUUU7SUFQNUIsRUFBRSxHQUFXLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDM0MsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDekIsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBRXRELFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixTQUFTLENBQUMsS0FBbUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFZLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTt3R0ExQlUsd0JBQXdCLGtCQVF6QixpQkFBaUI7NEZBUmhCLHdCQUF3QiwwTENSckMsd1lBWVM7OzRGREpJLHdCQUF3QjtrQkFOcEMsU0FBUzsrQkFDRSxtQkFBbUIsbUJBR1osdUJBQXVCLENBQUMsTUFBTTs7MEJBVTVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVBsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWlucHV0LW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lucHV0LW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUlucHV0T3B0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWlucHV0LSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgX29uU2VsZWN0KGV2ZW50OiBQb2ludGVyRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIChjbGljayk9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgKGtleXVwLmVudGVyKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktaW5wdXQtb3B0aW9uLS1zZWxlY3RlZCc6IHNlbGVjdGVkLCAnYml6eS1pbnB1dC1vcHRpb24tLWRpc2FibGVkJzogZGlzYWJsZWR9XCJcbiAgICBjbGFzcz1cImJpenktaW5wdXQtb3B0aW9uIHt7Y3VzdG9tQ2xhc3N9fVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0LW9wdGlvbl9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIFxuPC9idXR0b24+Il19