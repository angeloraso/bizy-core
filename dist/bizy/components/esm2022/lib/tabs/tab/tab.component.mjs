import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BizyTabComponent {
    ref;
    id = String(Math.random());
    disabled = false;
    linePosition = 'top';
    customClass = '';
    selected = false;
    selectedChange = new EventEmitter();
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
        this.selectedChange.emit(selected);
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    getSelected = () => {
        return this.selected;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyTabComponent, selector: "bizy-tab", inputs: { id: "id", disabled: "disabled", linePosition: "linePosition", customClass: "customClass", selected: "selected" }, outputs: { selectedChange: "selectedChange", onSelect: "onSelect" }, ngImport: i0, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n\n<button \n  type=\"button\"\n  id=\"{{id}}\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"onSelect.emit()\"\n  (keyup.enter)=\"onSelect.emit()\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n", styles: [":host{font-size:1rem;position:relative}.bizy-tab{width:100%;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:var(--bizy-tab-flex-direction);align-items:center;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{position:absolute;width:100%;height:.2rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.3s;animation-fill-mode:both}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-tab', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'top'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n\n<button \n  type=\"button\"\n  id=\"{{id}}\"\n  [ngClass]=\"{'bizy-tab--selected': selected, 'bizy-tab--disabled': disabled}\"\n  class=\"bizy-tab {{customClass}}\"\n  (click)=\"onSelect.emit()\"\n  (keyup.enter)=\"onSelect.emit()\">\n\n  <ng-content></ng-content>\n\n</button>\n\n<span class=\"bizy-tab__selected-line\" *ngIf=\"linePosition === 'bottom'\" [ngClass]=\"{'bizy-tab__selected-line--visible': selected && !disabled}\"></span>\n", styles: [":host{font-size:1rem;position:relative}.bizy-tab{width:100%;min-width:-moz-fit-content;min-width:fit-content;display:flex;flex-direction:var(--bizy-tab-flex-direction);align-items:center;border-top:var(--bizy-tab-border-top);border-right:var(--bizy-tab-border-right);border-bottom:var(--bizy-tab-border-bottom);border-left:var(--bizy-tab-border-left);border-radius:var(--bizy-tab-border-radius);padding:var(--bizy-tab-padding);background-color:var(--bizy-tab-background-color);cursor:pointer}.bizy-tab--selected{color:var(--bizy-tab-selected-color);background-color:var(--bizy-tab-selected-background-color)}.bizy-tab--disabled{opacity:.5;cursor:not-allowed!important;pointer-events:none}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.bizy-tab__selected-line{position:absolute;width:100%;height:.2rem;visibility:hidden;pointer-events:none;background-color:var(--bizy-tab-selected-color)}.bizy-tab__selected-line--visible{visibility:visible;animation-name:zoomIn;animation-duration:.3s;animation-fill-mode:both}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], linePosition: [{
                type: Input
            }], customClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi90YWJzL3RhYi90YWIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL3RhYnMvdGFiL3RhYi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQThCLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUXZKLE1BQU0sT0FBTyxnQkFBZ0I7SUFVVTtJQVQ1QixFQUFFLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsWUFBWSxHQUFxQixLQUFLLENBQUM7SUFDdkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ3pCLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzdDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRTlDLFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVcsR0FBRyxDQUFDLFFBQWlCLEVBQVEsRUFBRTtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELEtBQUssR0FBRyxHQUFZLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFhLEVBQUU7UUFDM0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQTt3R0FqQ1UsZ0JBQWdCLGtCQVVqQixpQkFBaUI7NEZBVmhCLGdCQUFnQixpUENSN0Isd2xCQWVBOzs0RkRQYSxnQkFBZ0I7a0JBTjVCLFNBQVM7K0JBQ0UsVUFBVSxtQkFHSCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFZNUMsTUFBTTsyQkFBQyxpQkFBaUI7NENBVGxCLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS10YWInLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFiLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlUYWJDb21wb25lbnQge1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBsaW5lUG9zaXRpb246ICdib3R0b20nIHwgJ3RvcCcgPSAndG9wJztcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENoYW5nZURldGVjdG9yUmVmKSBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIF9vblNlbGVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3QuZW1pdCgpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWQgPSAoc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBnZXRJZCA9ICgpOiBzdHJpbmcgID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkID0gKCk6IGJvb2xlYW4gID0+IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxufSIsIjxzcGFuIGNsYXNzPVwiYml6eS10YWJfX3NlbGVjdGVkLWxpbmVcIiAqbmdJZj1cImxpbmVQb3NpdGlvbiA9PT0gJ3RvcCdcIiBbbmdDbGFzc109XCJ7J2JpenktdGFiX19zZWxlY3RlZC1saW5lLS12aXNpYmxlJzogc2VsZWN0ZWQgJiYgIWRpc2FibGVkfVwiPjwvc3Bhbj5cblxuPGJ1dHRvbiBcbiAgdHlwZT1cImJ1dHRvblwiXG4gIGlkPVwie3tpZH19XCJcbiAgW25nQ2xhc3NdPVwieydiaXp5LXRhYi0tc2VsZWN0ZWQnOiBzZWxlY3RlZCwgJ2JpenktdGFiLS1kaXNhYmxlZCc6IGRpc2FibGVkfVwiXG4gIGNsYXNzPVwiYml6eS10YWIge3tjdXN0b21DbGFzc319XCJcbiAgKGNsaWNrKT1cIm9uU2VsZWN0LmVtaXQoKVwiXG4gIChrZXl1cC5lbnRlcik9XCJvblNlbGVjdC5lbWl0KClcIj5cblxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbjwvYnV0dG9uPlxuXG48c3BhbiBjbGFzcz1cImJpenktdGFiX19zZWxlY3RlZC1saW5lXCIgKm5nSWY9XCJsaW5lUG9zaXRpb24gPT09ICdib3R0b20nXCIgW25nQ2xhc3NdPVwieydiaXp5LXRhYl9fc2VsZWN0ZWQtbGluZS0tdmlzaWJsZSc6IHNlbGVjdGVkICYmICFkaXNhYmxlZH1cIj48L3NwYW4+XG4iXX0=