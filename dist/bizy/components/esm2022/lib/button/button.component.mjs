import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ButtonComponent {
    id = String(Math.random());
    disabled = false;
    type = 'button';
    customClass = '';
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ButtonComponent, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n        \n    <ng-content></ng-content>\n    \n</button>\n\n", styles: [".bizy-button{display:flex;justify-content:center;align-items:center;column-gap:.5rem;width:-moz-fit-content;width:fit-content;padding:.5rem;border-radius:.3rem;color:var(--bizy-button-color, #ffffff);border:none;cursor:pointer;background-color:var(--bizy-button-background-color, transparent)}.bizy-button:hover{filter:brightness(95%)}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    id=\"{{id}}\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n        \n    <ng-content></ng-content>\n    \n</button>\n\n", styles: [".bizy-button{display:flex;justify-content:center;align-items:center;column-gap:.5rem;width:-moz-fit-content;width:fit-content;padding:.5rem;border-radius:.3rem;color:var(--bizy-button-color, #ffffff);border:none;cursor:pointer;background-color:var(--bizy-button-background-color, transparent)}.bizy-button:hover{filter:brightness(95%)}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9idXR0b24vYnV0dG9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUWhHLE1BQU0sT0FBTyxlQUFlO0lBQ2pCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixJQUFJLEdBQXdCLFFBQVEsQ0FBQztJQUNyQyxXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxTQUFTLENBQUMsS0FBbUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7d0dBYlUsZUFBZTs0RkFBZixlQUFlLDRLQ1I1QiwrUkFZQTs7NEZESmEsZUFBZTtrQkFOM0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXR0b24uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHR5cGU6ICdidXR0b24nIHwgJ3N1Ym1pdCcgPSAnYnV0dG9uJztcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBfb25TZWxlY3QoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGV2ZW50KTtcbiAgfVxufSIsIjxidXR0b24gXG4gICAgW3R5cGVdPVwidHlwZVwiXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIGNsYXNzPVwiYml6eS1idXR0b24ge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktYnV0dG9uLS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gICAgKGNsaWNrKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIFxuPC9idXR0b24+XG5cbiJdfQ==