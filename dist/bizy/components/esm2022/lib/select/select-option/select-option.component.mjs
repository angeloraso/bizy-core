import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SelectOptionComponent {
    elementRef;
    ref;
    key;
    id = String(Math.random());
    disabled = false;
    customClass = '';
    selected = false;
    onSelect = new EventEmitter();
    constructor(elementRef, ref) {
        this.elementRef = elementRef;
        this.ref = ref;
    }
    _onSelect() {
        if (this.disabled) {
            return;
        }
        this.selected = true;
        this.onSelect.emit();
        this.ref.detectChanges();
    }
    setSelected = (selected) => {
        this.selected = selected;
        this.ref.detectChanges();
    };
    getKey = () => {
        return this.key;
    };
    getId = () => {
        return this.id;
    };
    getValue = () => {
        const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
        return value ?? '';
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectOptionComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: SelectOptionComponent, selector: "bizy-select-option", inputs: { key: "key", id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}:host:has(>.bizy-select-option__select:not(:empty)) .bizy-select-option{display:none!important}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color, #000);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color, #2b94f444)}.bizy-select-option--selected{color:var(--bizy-select-option-selected-color, #fff);background-color:var(--bizy-select-option-selected-background-color, #2b94f4)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    id=\"{{id}}\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}:host:has(>.bizy-select-option__select:not(:empty)) .bizy-select-option{display:none!important}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color, #fff);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color, #000);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color, #2b94f444)}.bizy-select-option--selected{color:var(--bizy-select-option-selected-color, #fff);background-color:var(--bizy-select-option-selected-background-color, #2b94f4)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { key: [{
                type: Input
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2VsZWN0L3NlbGVjdC1vcHRpb24vc2VsZWN0LW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2VsZWN0L3NlbGVjdC1vcHRpb24vc2VsZWN0LW9wdGlvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUXZJLE1BQU0sT0FBTyxxQkFBcUI7SUFTRjtJQUNPO0lBVDVCLEdBQUcsQ0FBa0I7SUFDckIsRUFBRSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUN6QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUU5QyxZQUM4QixVQUFzQixFQUNmLEdBQXNCO1FBRDdCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDZixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUN4RCxDQUFDO0lBRUosU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVcsR0FBRyxDQUFDLFFBQWlCLEVBQVEsRUFBRTtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELE1BQU0sR0FBRyxHQUFvQixFQUFFO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDLENBQUE7SUFFRCxLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxRQUFRLEdBQUcsR0FBVyxFQUFFO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBQ2pGLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUE7d0dBdkNVLHFCQUFxQixrQkFTdEIsVUFBVSxhQUNWLGlCQUFpQjs0RkFWaEIscUJBQXFCLHVNQ1JsQyxrWUFZUzs7NEZESkkscUJBQXFCO2tCQU5qQyxTQUFTOytCQUNFLG9CQUFvQixtQkFHYix1QkFBdUIsQ0FBQyxNQUFNOzswQkFXNUMsTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxpQkFBaUI7NENBVGxCLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LXNlbGVjdC1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0T3B0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkga2V5OiBzdHJpbmcgfCBudW1iZXI7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgX29uU2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWQgPSAoc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgZ2V0S2V5ID0gKCk6IHN0cmluZyB8IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIHRoaXMua2V5O1xuICB9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFZhbHVlID0gKCk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmVsZW1lbnRSZWY/Lm5hdGl2ZUVsZW1lbnQ/LmZpcnN0Q2hpbGQ/LmNoaWxkcmVuWzBdPy5pbm5lclRleHQ7XG4gICAgcmV0dXJuIHZhbHVlID8/ICcnO1xuICB9XG59IiwiPGJ1dHRvbiBcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBpZD1cInt7aWR9fVwiXG4gICAgKGNsaWNrKT1cIl9vblNlbGVjdCgpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KClcIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1zZWxlY3Qtb3B0aW9uLS1zZWxlY3RlZCc6IHNlbGVjdGVkLCAnYml6eS1zZWxlY3Qtb3B0aW9uLS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gICAgY2xhc3M9XCJiaXp5LXNlbGVjdC1vcHRpb24ge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktc2VsZWN0LW9wdGlvbl9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIFxuPC9idXR0b24+Il19