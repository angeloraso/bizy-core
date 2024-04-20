import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyMenuOptionComponent {
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    _onSelect(event) {
        if (this.disabled) {
            return;
        }
        this.onSelect.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyMenuOptionComponent, selector: "bizy-menu-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyMenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-menu-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect($event)\"\n    (keyup.enter)=\"_onSelect($event)\"\n    [ngClass]=\"{'bizy-menu-option--selected': selected, 'bizy-menu-option--disabled': disabled}\"\n    class=\"bizy-menu-option {{customClass}}\">\n\n    <span class=\"bizy-menu-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>\n\n<span class=\"bizy-menu-option__menu\">\n    <ng-content select=\"bizy-menu\"></ng-content>\n</span>\n", styles: [":host{font-size:1rem}:host:has(>.bizy-menu-option__menu:not(:empty)) .bizy-menu-option{display:none!important}.bizy-menu-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-menu-option-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-menu-option-color);cursor:pointer}.bizy-menu-option:hover{background-color:var(--bizy-menu-option-hover-background-color)}.bizy-menu-option--selected{color:var(--bizy-menu-option-selected-color)!important;background-color:var(--bizy-menu-option-selected-background-color)!important}.bizy-menu-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-menu-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;width:100%}::ng-deep .bizy-menu-option__menu *{color:var(--bizy-menu-option-color);fill:var(--bizy-menu-option-color)}\n"] }]
        }], propDecorators: { id: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL21lbnUvbWVudS1vcHRpb24vbWVudS1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL21lbnUvbWVudS1vcHRpb24vbWVudS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRaEcsTUFBTSxPQUFPLHVCQUF1QjtJQUN6QixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ3pCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBeUMsQ0FBQztJQUUvRSxTQUFTLENBQUMsS0FBNEM7UUFDcEQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7d0dBYlUsdUJBQXVCOzRGQUF2Qix1QkFBdUIseUxDUnBDLGdmQWlCQTs7NEZEVGEsdUJBQXVCO2tCQU5uQyxTQUFTOytCQUNFLGtCQUFrQixtQkFHWCx1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LW1lbnUtb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUtb3B0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZW51LW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eU1lbnVPcHRpb25Db21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50ICYge3RhcmdldDoge2lkOiBzdHJpbmd9fT4oKTtcblxuICBfb25TZWxlY3QoZXZlbnQ6IFBvaW50ZXJFdmVudCAmIHt0YXJnZXQ6IHtpZDogc3RyaW5nfX0pIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudCk7XG4gIH1cbn0iLCI8YnV0dG9uIFxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGlkPVwie3tpZH19XCJcbiAgICAoY2xpY2spPVwiX29uU2VsZWN0KCRldmVudClcIlxuICAgIChrZXl1cC5lbnRlcik9XCJfb25TZWxlY3QoJGV2ZW50KVwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LW1lbnUtb3B0aW9uLS1zZWxlY3RlZCc6IHNlbGVjdGVkLCAnYml6eS1tZW51LW9wdGlvbi0tZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgIGNsYXNzPVwiYml6eS1tZW51LW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1tZW51LW9wdGlvbl9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIFxuPC9idXR0b24+XG5cbjxzcGFuIGNsYXNzPVwiYml6eS1tZW51LW9wdGlvbl9fbWVudVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJpenktbWVudVwiPjwvbmctY29udGVudD5cbjwvc3Bhbj5cbiJdfQ==