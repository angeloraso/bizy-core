import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyButtonComponent {
    id = `bizy-button-${Math.random()}`;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyButtonComponent, selector: "bizy-button", inputs: { id: "id", disabled: "disabled", type: "type", customClass: "customClass" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    [type]=\"type\"\n    [id]=\"id\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:100%;height:100%;padding:var(--bizy-button-padding);border-radius:.3rem;border:none;cursor:pointer;background-color:var(--bizy-button-background-color)}::ng-deep .bizy-button *{color:var(--bizy-button-color);text-wrap:nowrap}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    [type]=\"type\"\n    [id]=\"id\"\n    class=\"bizy-button {{customClass}}\"\n    [ngClass]=\"{'bizy-button--disabled': disabled}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\">\n    <span class=\"bizy-button__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n", styles: [":host{font-size:1rem}.bizy-button{display:flex;justify-content:space-between;align-items:center;column-gap:.5rem;width:100%;height:100%;padding:var(--bizy-button-padding);border-radius:.3rem;border:none;cursor:pointer;background-color:var(--bizy-button-background-color)}::ng-deep .bizy-button *{color:var(--bizy-button-color);text-wrap:nowrap}.bizy-button:hover{filter:brightness(95%)}.bizy-button__content{width:100%;display:flex;align-items:center;column-gap:.3rem}.bizy-button--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9idXR0b24vYnV0dG9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUWhHLE1BQU0sT0FBTyxtQkFBbUI7SUFDckIsRUFBRSxHQUFXLGVBQWUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDNUMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixJQUFJLEdBQXdCLFFBQVEsQ0FBQztJQUNyQyxXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxTQUFTLENBQUMsS0FBbUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7d0dBYlUsbUJBQW1COzRGQUFuQixtQkFBbUIsNEtDUmhDLCtVQWFBOzs0RkRMYSxtQkFBbUI7a0JBTi9CLFNBQVM7K0JBQ0UsYUFBYSxtQkFHTix1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5QnV0dG9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWJ1dHRvbi0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdHlwZTogJ2J1dHRvbicgfCAnc3VibWl0JyA9ICdidXR0b24nO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIF9vblNlbGVjdChldmVudDogUG9pbnRlckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICBbdHlwZV09XCJ0eXBlXCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIGNsYXNzPVwiYml6eS1idXR0b24ge3tjdXN0b21DbGFzc319XCJcbiAgICBbbmdDbGFzc109XCJ7J2JpenktYnV0dG9uLS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gICAgKGNsaWNrKT1cIl9vblNlbGVjdCgkZXZlbnQpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KCRldmVudClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktYnV0dG9uX19jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gICAgXG48L2J1dHRvbj5cblxuIl19