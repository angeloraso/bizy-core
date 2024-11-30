import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyCardComponent {
    id = `bizy-card-${Math.random()}`;
    disabled = false;
    selected = false;
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyCardComponent, selector: "bizy-card", inputs: { id: "id", disabled: "disabled", selected: "selected", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--selected': selected, 'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[slot=header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[slot=header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-card__content\">\n\n        <ng-content></ng-content>\n\n    </span>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[slot=footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[slot=footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:100%;width:100%}.bizy-card{height:var(--bizy-card-height);width:var(--bizy-card-width);cursor:var(--bizy-card-cursor);border:var(--bizy-card-border);border-radius:.3rem;overflow:hidden;padding:.5rem;display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:0 4px 6px #32325d1c,0 1px 3px #00000014}.bizy-card:hover{transform:translateY(-1px);box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-card:has(.bizy-card__content:empty) .bizy-card__content{display:none}.bizy-card:has(.bizy-card__content:empty) .bizy-card__header:not(:empty){height:100%!important}.bizy-card:has(.bizy-card__content:empty) .bizy-card__footer:not(:empty){height:100%!important}.bizy-card--selected{background-color:var(--bizy-card-selected-background-color)}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__content:not(:empty){display:flex;align-items:center;column-gap:.5rem;height:100%;width:100%}.bizy-card__header:has(.bizy-card__header__start:empty):has(.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__header__start{justify-self:start}.bizy-card__header__end{justify-self:end}.bizy-card__slot{width:-moz-fit-content;width:fit-content;max-width:-webkit-fill-available;display:flex;align-items:center;column-gap:.5rem;height:100%;overflow:hidden}.bizy-card__footer:has(.bizy-card__footer__start:empty):has(.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__footer__start{justify-self:start}.bizy-card__footer__end{justify-self:end}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-card', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    class=\"bizy-card {{customClass}}\"\n    [ngClass]=\"{'bizy-card--selected': selected, 'bizy-card--disabled': disabled}\">\n\n    <span class=\"bizy-card__header\">\n\n        <span class=\"bizy-card__header__start bizy-card__slot\">\n            <ng-content select=\"[slot=header-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__header__end bizy-card__slot\">\n            <ng-content select=\"[slot=header-end]\"></ng-content>\n        </span>\n\n    </span>\n\n    <span class=\"bizy-card__content\">\n\n        <ng-content></ng-content>\n\n    </span>\n\n    <span class=\"bizy-card__footer\">\n\n        <span class=\"bizy-card__footer__start bizy-card__slot\">\n            <ng-content select=\"[slot=footer-start]\"></ng-content>\n        </span>\n\n        <span class=\"bizy-card__footer__end bizy-card__slot\">\n            <ng-content select=\"[slot=footer-end]\"></ng-content>\n        </span>\n\n    </span>\n\n</button>", styles: [":host{font-size:1rem;height:100%;width:100%}.bizy-card{height:var(--bizy-card-height);width:var(--bizy-card-width);cursor:var(--bizy-card-cursor);border:var(--bizy-card-border);border-radius:.3rem;overflow:hidden;padding:.5rem;display:flex;flex-direction:column;justify-content:space-between;row-gap:.3rem;background-color:var(--bizy-card-background-color);transition:transform .25s ease-in-out;box-shadow:0 4px 6px #32325d1c,0 1px 3px #00000014}.bizy-card:hover{transform:translateY(-1px);box-shadow:0 7px 14px #32325d1a,0 3px 6px #00000014}.bizy-card:has(.bizy-card__content:empty) .bizy-card__content{display:none}.bizy-card:has(.bizy-card__content:empty) .bizy-card__header:not(:empty){height:100%!important}.bizy-card:has(.bizy-card__content:empty) .bizy-card__footer:not(:empty){height:100%!important}.bizy-card--selected{background-color:var(--bizy-card-selected-background-color)}.bizy-card--disabled{pointer-events:none;opacity:.5;cursor:not-allowed!important}.bizy-card__content:not(:empty){display:flex;align-items:center;column-gap:.5rem;height:100%;width:100%}.bizy-card__header:has(.bizy-card__header__start:empty):has(.bizy-card__header__end:empty){display:none}.bizy-card__header:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__header__start{justify-self:start}.bizy-card__header__end{justify-self:end}.bizy-card__slot{width:-moz-fit-content;width:fit-content;max-width:-webkit-fill-available;display:flex;align-items:center;column-gap:.5rem;height:100%;overflow:hidden}.bizy-card__footer:has(.bizy-card__footer__start:empty):has(.bizy-card__footer__end:empty){display:none}.bizy-card__footer:not(:empty){width:100%;height:-moz-fit-content;height:fit-content;display:grid;grid-template-columns:auto auto;align-items:center;column-gap:.5rem}.bizy-card__footer__start{justify-self:start}.bizy-card__footer__end{justify-self:end}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvY2FyZC9jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9jYXJkL2NhcmQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRaEcsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixFQUFFLEdBQVcsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUMxQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFFdEQsU0FBUyxDQUFDLEtBQW1CO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO3dHQWJVLGlCQUFpQjs0RkFBakIsaUJBQWlCLGtMQ1I5QixpakNBcUNTOzs0RkQ3QkksaUJBQWlCO2tCQU43QixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTTs4QkFHdEMsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcmQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhcmQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlDYXJkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWNhcmQtJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgX29uU2VsZWN0KGV2ZW50OiBQb2ludGVyRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gIH1cbn0iLCI8YnV0dG9uIFxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIChjbGljayk9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgKGtleXVwLmVudGVyKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICBjbGFzcz1cImJpenktY2FyZCB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1jYXJkLS1zZWxlY3RlZCc6IHNlbGVjdGVkLCAnYml6eS1jYXJkLS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaXp5LWNhcmRfX2hlYWRlclwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYml6eS1jYXJkX19oZWFkZXJfX3N0YXJ0IGJpenktY2FyZF9fc2xvdFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9aGVhZGVyLXN0YXJ0XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYml6eS1jYXJkX19oZWFkZXJfX2VuZCBiaXp5LWNhcmRfX3Nsb3RcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWhlYWRlci1lbmRdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktY2FyZF9fY29udGVudFwiPlxuXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1jYXJkX19mb290ZXJcIj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktY2FyZF9fZm9vdGVyX19zdGFydCBiaXp5LWNhcmRfX3Nsb3RcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWZvb3Rlci1zdGFydF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cImJpenktY2FyZF9fZm9vdGVyX19lbmQgYml6eS1jYXJkX19zbG90XCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1mb290ZXItZW5kXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgPC9zcGFuPlxuXG48L2J1dHRvbj4iXX0=