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
    selectable = true;
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
        if (this.disabled || !this.selectable) {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySidebarOptionComponent, selector: "bizy-sidebar-option", inputs: { id: "id", disabled: "disabled", selectable: "selectable", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, queries: [{ propertyName: "options", predicate: BizySidebarOptionComponent }], ngImport: i0, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{!selectable ? 'bizy-sidebar-option--no-selectable' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--no-selectable{pointer-events:none;cursor:default!important}::ng-deep .bizy-sidebar-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.BizyAccordionComponent, selector: "bizy-accordion", inputs: ["id", "customClass", "disabled", "opened"], outputs: ["openedChange", "onSelect"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySidebarOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-sidebar-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-accordion\n    class=\"{{customClass}}\"\n    [id]=\"id\"\n    customClass=\"bizy-sidebar-option {{_selected && (!options || options.length === 0) ? 'bizy-sidebar-option--selected' : ''}} {{!selectable ? 'bizy-sidebar-option--no-selectable' : ''}} {{disabled ? 'bizy-sidebar-option--disabled' : ''}}\"\n    [opened]=\"_selected\"\n    (onSelect)=\"_onSelect($event)\">\n\n    <ng-content></ng-content>\n\n    <ng-container accordion-option *ngIf=\"options && options.length > 0\">\n        <ng-content select=\"bizy-sidebar-option\"></ng-content>\n    </ng-container>\n\n</bizy-accordion>", styles: [":host{font-size:1rem;direction:ltr}:host:not(:has(.bizy-sidebar-option--disabled)) ::ng-deep .bizy-sidebar-option:hover{--bizy-accordion-background-color: var(--bizy-sidebar-option-hover-color) }::ng-deep .bizy-accordion__options{position:sticky}:host ::ng-deep .bizy-accordion__options:before{content:\"\";position:absolute;inset:0;background-color:#000;opacity:.3}::ng-deep .bizy-sidebar-option--selected{--bizy-accordion-background-color: var(--bizy-sidebar-option-selected-color) !important}::ng-deep .bizy-sidebar-option--no-selectable{pointer-events:none;cursor:default!important}::ng-deep .bizy-sidebar-option--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}::ng-deep .bizy-accordion__options--opened{max-height:100%!important}\n"] }]
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
            }], selectable: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3NpZGViYXIvc2lkZWJhci1vcHRpb24vc2lkZWJhci1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBYSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQVF2QyxNQUFNLE9BQU8sMEJBQTBCO0lBd0JBO0lBdkJRLE9BQU8sQ0FBd0M7SUFDbkYsRUFBRSxHQUFXLHVCQUF1QixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNwRCxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBWSxJQUFJLENBQUM7SUFDM0IsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUM3QyxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFdEQsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQy9DLFNBQVMsR0FBWSxLQUFLLENBQUM7SUFFM0IsSUFBYSxRQUFRLENBQUMsUUFBaUI7UUFDckMsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUN4RCxPQUFPO1NBQ1I7UUFFRCxNQUFNLE1BQU0sR0FBRyxRQUFRLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFDcUMsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLFNBQVMsQ0FBQyxLQUFtQjtRQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3JDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssR0FBRyxHQUFZLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFhLEVBQUU7UUFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUMsQ0FBQTt3R0E5Q1UsMEJBQTBCLGtCQXdCM0IsaUJBQWlCOzRGQXhCaEIsMEJBQTBCLGdSQUNwQiwwQkFBMEIsNkJDVjdDLG9sQkFhaUI7OzRGREpKLDBCQUEwQjtrQkFOdEMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBR2QsdUJBQXVCLENBQUMsTUFBTTs7MEJBMEI1QyxNQUFNOzJCQUFDLGlCQUFpQjs0Q0F2QmtCLE9BQU87c0JBQW5ELGVBQWU7dUJBQUMsMEJBQTBCO2dCQUNsQyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0ksY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUtNLFFBQVE7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1zaWRlYmFyLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlYmFyLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci1vcHRpb24uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZHJlbihCaXp5U2lkZWJhck9wdGlvbkNvbXBvbmVudCkgb3B0aW9uczogUXVlcnlMaXN0PEJpenlTaWRlYmFyT3B0aW9uQ29tcG9uZW50PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXNpZGViYXItb3B0aW9uLSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIF90dXJuT24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCBzZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlbGVjdGVkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdHVybk9uID0gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkO1xuICAgIHRoaXMuX3R1cm5PbiQubmV4dCh0dXJuT24pO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBfb25TZWxlY3QoZXZlbnQ6IFBvaW50ZXJFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoIXRoaXMuX3NlbGVjdGVkKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX3NldFNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgfVxuXG4gIGdldElkID0gKCk6IHN0cmluZyAgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWQgPSAoKTogYm9vbGVhbiAgPT4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxufSIsIjxiaXp5LWFjY29yZGlvblxuICAgIGNsYXNzPVwie3tjdXN0b21DbGFzc319XCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIGN1c3RvbUNsYXNzPVwiYml6eS1zaWRlYmFyLW9wdGlvbiB7e19zZWxlY3RlZCAmJiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5sZW5ndGggPT09IDApID8gJ2Jpenktc2lkZWJhci1vcHRpb24tLXNlbGVjdGVkJyA6ICcnfX0ge3shc2VsZWN0YWJsZSA/ICdiaXp5LXNpZGViYXItb3B0aW9uLS1uby1zZWxlY3RhYmxlJyA6ICcnfX0ge3tkaXNhYmxlZCA/ICdiaXp5LXNpZGViYXItb3B0aW9uLS1kaXNhYmxlZCcgOiAnJ319XCJcbiAgICBbb3BlbmVkXT1cIl9zZWxlY3RlZFwiXG4gICAgKG9uU2VsZWN0KT1cIl9vblNlbGVjdCgkZXZlbnQpXCI+XG5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICA8bmctY29udGFpbmVyIGFjY29yZGlvbi1vcHRpb24gKm5nSWY9XCJvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJiaXp5LXNpZGViYXItb3B0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuXG48L2JpenktYWNjb3JkaW9uPiJdfQ==