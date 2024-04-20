import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, Inject, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../accordion/accordion.component";
export class BizySidebarOptionComponent {
    ref;
    options;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    constructor(ref) {
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit();
    }
    setSelected = (selected) => {
        this.selected = selected;
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarOptionComponent, selector: "bizy-sidebar-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    customClass=\"bizy-sidebar-option {{selected ? 'bizy-sidebar-option--selected' : ''}}\"\n    [opened]=\"selected\"\n    (onOpen)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <span accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </span>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.BizyAccordionComponent, selector: "bizy-accordion", inputs: ["customClass", "opened"], outputs: ["onOpen"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    customClass=\"bizy-sidebar-option {{selected ? 'bizy-sidebar-option--selected' : ''}}\"\n    [opened]=\"selected\"\n    (onOpen)=\"_onSelect()\">\n\n    <ng-content></ng-content>\n\n    <span accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </span>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}\n"] }]
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
            }], selected: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBYSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRdkosTUFBTSxPQUFPLDBCQUEwQjtJQVNBO0lBUlEsT0FBTyxDQUF3QztJQUNuRixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ3pCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRTlDLFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVcsR0FBRyxDQUFDLFFBQWlCLEVBQVEsRUFBRTtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELEtBQUssR0FBRyxHQUFZLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFhLEVBQUU7UUFDM0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTt3R0EvQlUsMEJBQTBCLGtCQVMzQixpQkFBaUI7NEZBVGhCLDBCQUEwQixvTkFDcEIsMEJBQTBCLDZCQ1Q3QyxtWkFZaUI7OzRGREpKLDBCQUEwQjtrQkFOdEMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBR2QsdUJBQXVCLENBQUMsTUFBTTs7MEJBVzVDLE1BQU07MkJBQUMsaUJBQWlCOzRDQVJrQixPQUFPO3NCQUFuRCxlQUFlO3VCQUFDLDBCQUEwQjtnQkFDbEMsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jpenktc2lkZWJhci1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZWJhci1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZGViYXItb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQml6eVNpZGViYXJPcHRpb25Db21wb25lbnQpIG9wdGlvbnM6IFF1ZXJ5TGlzdDxCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgX29uU2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KCk7XG4gIH1cblxuICBzZXRTZWxlY3RlZCA9IChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gID0+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxufSIsIjxiaXp5LWFjY29yZGlvblxuICAgIGNsYXNzPVwie3tjdXN0b21DbGFzc319XCJcbiAgICBjdXN0b21DbGFzcz1cImJpenktc2lkZWJhci1vcHRpb24ge3tzZWxlY3RlZCA/ICdiaXp5LXNpZGViYXItb3B0aW9uLS1zZWxlY3RlZCcgOiAnJ319XCJcbiAgICBbb3BlbmVkXT1cInNlbGVjdGVkXCJcbiAgICAob25PcGVuKT1cIl9vblNlbGVjdCgpXCI+XG5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICA8c3BhbiBhY2NvcmRpb24tb3B0aW9uICpuZ0lmPVwib3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYml6eS1zaWRlYmFyLW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG5cbjwvYml6eS1hY2NvcmRpb24+Il19