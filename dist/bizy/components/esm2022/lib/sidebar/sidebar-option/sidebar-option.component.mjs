import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, Inject, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../accordion/accordion.component";
export class BizySidebarOptionComponent {
    ref;
    options;
    id = `bizy-sidebar-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    selectedChange = new EventEmitter();
    onSelect = new EventEmitter();
    _turnOn$ = new BehaviorSubject(false);
    _selected = false;
    set selected(selected) {
        if (typeof selected === 'undefined' || selected === null) {
            return;
        }
        const turnOn = selected && selected !== this._selected;
        this._turnOn$.next(turnOn);
        this._selected = selected;
        this.ref.detectChanges();
    }
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.selectedChange.emit(!this._selected);
        this.onSelect.emit(event);
    }
    _setSelected(selected) {
        this._selected = selected;
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this._selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarOptionComponent, selector: "bizy-sidebar-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--disabled{cursor:default!important;pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--disabled{cursor:default!important;pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [BizySidebarOptionComponent]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], selected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBYSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQVF2QyxNQUFNLE9BQU8sMEJBQTBCO0lBdUJBO0lBdEJRLE9BQU8sQ0FBd0M7SUFDbkYsRUFBRSxHQUFXLHVCQUF1QixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNwRCxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDeEIsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFDN0MsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO0lBRXRELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMvQyxTQUFTLEdBQVksS0FBSyxDQUFDO0lBRTNCLElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDeEQsT0FBTztTQUNSO1FBRUQsTUFBTSxNQUFNLEdBQUcsUUFBUSxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixTQUFTLENBQUMsS0FBbUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssR0FBRyxHQUFZLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFhLEVBQUU7UUFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUMsQ0FBQTt3R0E3Q1UsMEJBQTBCLGtCQXVCM0IsaUJBQWlCOzRGQXZCaEIsMEJBQTBCLHNQQUNwQiwwQkFBMEIsNkJDVjdDLHdoQkFhaUI7OzRGREpKLDBCQUEwQjtrQkFOdEMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBR2QsdUJBQXVCLENBQUMsTUFBTTs7MEJBeUI1QyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0F0QmtCLE9BQU87c0JBQW5ELGVBQWU7dUJBQUMsMEJBQTBCO2dCQUNsQyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFLTSxRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jpenktc2lkZWJhci1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZWJhci1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZGViYXItb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1zaWRlYmFyLW9wdGlvbi0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIF90dXJuT24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlbGVjdGVkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdHVybk9uID0gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkO1xuICAgIHRoaXMuX3R1cm5PbiQubmV4dCh0dXJuT24pO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBfb25TZWxlY3QoZXZlbnQ6IFBvaW50ZXJFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KCF0aGlzLl9zZWxlY3RlZCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9zZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gIH1cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gID0+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbn0iLCI8Yml6eS1hY2NvcmRpb25cbiAgICBjbGFzcz1cInt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgW2lkXT1cImlkXCJcbiAgICBjdXN0b21DbGFzcz1cImJpenktc2lkZWJhci1vcHRpb24ge3tfc2VsZWN0ZWQgJiYgKCFvcHRpb25zIHx8IG9wdGlvbnMubGVuZ3RoID09PSAwKSA/ICdiaXp5LXNpZGViYXItb3B0aW9uLS1zZWxlY3RlZCcgOiAnJ319IHt7ZGlzYWJsZWQgPyAnYml6eS1zaWRlYmFyLW9wdGlvbi0tZGlzYWJsZWQnIDogJyd9fVwiXG4gICAgW29wZW5lZF09XCJfc2VsZWN0ZWRcIlxuICAgIChvblNlbGVjdCk9XCJfb25TZWxlY3QoJGV2ZW50KVwiPlxuXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gICAgPG5nLWNvbnRhaW5lciBhY2NvcmRpb24tb3B0aW9uICpuZ0lmPVwib3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1zaWRlYmFyLW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuPC9iaXp5LWFjY29yZGlvbj4iXX0=