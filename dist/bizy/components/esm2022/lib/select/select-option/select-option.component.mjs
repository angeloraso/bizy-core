import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizySelectOptionComponent {
    elementRef;
    ref;
    id = `bizy-select-option-${Math.random()}`;
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
        this.onSelect.emit();
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    getValue = () => {
        const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
        return value ?? '';
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectOptionComponent, deps: [{ token: ElementRef }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizySelectOptionComponent, selector: "bizy-select-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", selected: "selected" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{background-color:var(--bizy-select-option-selected-background-color)!important}.bizy-select-option--selected ::ng-deep .bizy-select-option__content *{color:var(--bizy-select-option-selected-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizySelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-select-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button \n    type=\"button\"\n    [id]=\"id\"\n    (click)=\"_onSelect()\"\n    (keyup.enter)=\"_onSelect()\"\n    [ngClass]=\"{'bizy-select-option--selected': selected, 'bizy-select-option--disabled': disabled}\"\n    class=\"bizy-select-option {{customClass}}\">\n\n    <span class=\"bizy-select-option__content\">\n        <ng-content></ng-content>\n    </span>\n    \n</button>", styles: [":host{font-size:1rem}.bizy-select-option{font-size:1rem;width:100%;border:none;background-color:var(--bizy-select-background-color);display:flex;align-items:center;justify-content:space-between;column-gap:.5rem;padding:.5rem;color:var(--bizy-select-option-color);cursor:pointer}.bizy-select-option:hover{background-color:var(--bizy-select-option-hover-background-color)}.bizy-select-option--selected{background-color:var(--bizy-select-option-selected-background-color)!important}.bizy-select-option--selected ::ng-deep .bizy-select-option__content *{color:var(--bizy-select-option-selected-color)}.bizy-select-option--disabled{opacity:.5;pointer-events:none;cursor:not-allowed!important}.bizy-select-option__content{font-size:1rem;display:flex;align-items:center;column-gap:.3rem;text-align:start}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2VsZWN0L3NlbGVjdC1vcHRpb24vc2VsZWN0LW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvc2VsZWN0L3NlbGVjdC1vcHRpb24vc2VsZWN0LW9wdGlvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUXZJLE1BQU0sT0FBTyx5QkFBeUI7SUFRTjtJQUNPO0lBUjVCLEVBQUUsR0FBVyxzQkFBc0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDbkQsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDekIsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFFOUMsWUFDOEIsVUFBc0IsRUFDZixHQUFzQjtRQUQ3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2YsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDeEQsQ0FBQztJQUVKLFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxLQUFLLEdBQUcsR0FBVyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUE7SUFFRCxXQUFXLEdBQUcsR0FBWSxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDLENBQUE7SUFFRCxRQUFRLEdBQUcsR0FBVyxFQUFFO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBQ2pGLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUE7d0dBaENVLHlCQUF5QixrQkFRMUIsVUFBVSxhQUNWLGlCQUFpQjs0RkFUaEIseUJBQXlCLDJMQ1J0QyxnWUFZUzs7NEZESkkseUJBQXlCO2tCQU5yQyxTQUFTOytCQUNFLG9CQUFvQixtQkFHYix1QkFBdUIsQ0FBQyxNQUFNOzswQkFVNUMsTUFBTTsyQkFBQyxVQUFVOzswQkFDakIsTUFBTTsyQkFBQyxpQkFBaUI7NENBUmxCLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jpenktc2VsZWN0LW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3Qtb3B0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3Qtb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5U2VsZWN0T3B0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LXNlbGVjdC1vcHRpb24tJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgX29uU2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgZ2V0VmFsdWUgPSAoKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZWxlbWVudFJlZj8ubmF0aXZlRWxlbWVudD8uZmlyc3RDaGlsZD8uY2hpbGRyZW5bMF0/LmlubmVyVGV4dDtcbiAgICByZXR1cm4gdmFsdWUgPz8gJyc7XG4gIH1cbn0iLCI8YnV0dG9uIFxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIFtpZF09XCJpZFwiXG4gICAgKGNsaWNrKT1cIl9vblNlbGVjdCgpXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwiX29uU2VsZWN0KClcIlxuICAgIFtuZ0NsYXNzXT1cInsnYml6eS1zZWxlY3Qtb3B0aW9uLS1zZWxlY3RlZCc6IHNlbGVjdGVkLCAnYml6eS1zZWxlY3Qtb3B0aW9uLS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gICAgY2xhc3M9XCJiaXp5LXNlbGVjdC1vcHRpb24ge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktc2VsZWN0LW9wdGlvbl9fY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIFxuPC9idXR0b24+Il19