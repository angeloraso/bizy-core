import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ionic/angular";
export class InputComponent {
    bizyInput;
    id = `bizy-input-${Math.random()}`;
    disabled = false;
    readonly = false;
    multiple = false;
    clear = true;
    autoFocus = true;
    autoCapitalize = false;
    autoCorrect = false;
    browserAutoComplete = true;
    type = 'text';
    label = '';
    max;
    maxLength;
    min;
    minLength;
    control;
    placeholder = '';
    customClass;
    onFocus = new EventEmitter();
    onInput(event) {
        if (!event || !event.target) {
            return;
        }
        this.control.markAsTouched();
        this.control.setValue(event.target.value ?? null);
    }
    onBlur() {
        this.control.markAsTouched();
    }
    focus() {
        if (!this.bizyInput || !this.bizyInput.setFocus) {
            return;
        }
        this.bizyInput.setFocus();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.9", type: InputComponent, selector: "bizy-input", inputs: { id: "id", disabled: "disabled", readonly: "readonly", multiple: "multiple", clear: "clear", autoFocus: "autoFocus", autoCapitalize: "autoCapitalize", autoCorrect: "autoCorrect", browserAutoComplete: "browserAutoComplete", type: "type", label: "label", max: "max", maxLength: "maxLength", min: "min", minLength: "minLength", control: "control", placeholder: "placeholder", customClass: "customClass" }, outputs: { onFocus: "onFocus" }, viewQueries: [{ propertyName: "bizyInput", first: true, predicate: ["bizyInput"], descendants: true }], ngImport: i0, template: "<ion-input \n    #bizyInput\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control?.value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <div slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></div>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n", styles: ["::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IonInput, selector: "ion-input", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"] }, { kind: "directive", type: i2.TextValueAccessor, selector: "ion-input:not([type=number]),ion-textarea,ion-searchbar,ion-range" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.9", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-input', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ion-input \n    #bizyInput\n    class=\"bizy-input {{customClass}}\"\n    [ngClass]=\"{'bizy-input--error': control && control.touched && control.invalid}\"\n    [type]=\"type\"\n    [inputmode]=\"type\"\n    id=\"{{id}}\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly\"\n    [value]=\"control?.value\"\n    [spellcheck]=\"true\"\n    [autocapitalize]=\"autoCapitalize ? 'on' : 'off'\"\n    [autocorrect]=\"autoCorrect ? 'on' : 'off'\"\n    [autocomplete]=\"browserAutoComplete ? 'on' : 'off'\"\n    [autofocus]=\"autoFocus\"\n    fill=\"solid\"\n    [max]=\"max\"\n    [maxlength]=\"maxLength\"\n    [min]=\"min\"\n    [minlength]=\"minLength\"\n    [debounce]=\"300\"\n    (ionBlur)=\"onBlur()\"\n    (ionInput)=\"onInput($event)\"\n    [clearInput]=\"clear\"\n    [placeholder]=\"placeholder\"\n    labelPlacement=\"stacked\">\n    <div slot=\"start\"><ng-content select=\"[input-start]\"></ng-content></div>\n    <div slot=\"label\">{{label}} <ng-content select=\"[input-label]\"></ng-content></div>\n    <div slot=\"end\"><ng-content select=\"[input-end]\"></ng-content></div>\n</ion-input>\n\n<span class=\"bizy-input__errors\" *ngIf=\"control && control.touched && control.invalid\">\n    <ng-content select=\"[input-error]\"></ng-content>\n</span>\n\n", styles: ["::ng-deep .bizy-input{--color: var(--bizy-input-color) !important;--background: var(--bizy-input-background-color) !important;--placeholder-color: var(--bizy-input-placeholder-color) !important;--placeholder-opacity: .8 !important;--padding-start: .3rem !important;--padding-end: .3rem !important;--inner-padding-end: 0 !important;--border-radius: .3rem .3rem 0 0 !important;border-bottom:.1rem solid var(--bizy-input-color)}::ng-deep .bizy-input__errors{margin-top:.5rem;display:flex;flex-direction:column;row-gap:.3rem}::ng-deep .bizy-input--error{border-bottom-color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input--error [slot=label]{color:var(--bizy-input-error-color)!important}::ng-deep .bizy-input [slot=label]{color:var(--bizy-input-label-color)}::ng-deep .bizy-input [slot=start]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .bizy-input [slot=end]{margin-inline-start:0!important;margin-inline-end:0!important}::ng-deep .input-clear-icon.sc-ion-input-ios{width:auto!important;height:auto!important}\n"] }]
        }], propDecorators: { bizyInput: [{
                type: ViewChild,
                args: ['bizyInput']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], multiple: [{
                type: Input
            }], clear: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], autoCapitalize: [{
                type: Input
            }], autoCorrect: [{
                type: Input
            }], browserAutoComplete: [{
                type: Input
            }], type: [{
                type: Input
            }], label: [{
                type: Input
            }], max: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], min: [{
                type: Input
            }], minLength: [{
                type: Input
            }], control: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onFocus: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9pbnB1dC9pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBVTNHLE1BQU0sT0FBTyxjQUFjO0lBQ0QsU0FBUyxDQUFXO0lBQ25DLEVBQUUsR0FBVyxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQzNDLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLEtBQUssR0FBWSxJQUFJLENBQUM7SUFDdEIsU0FBUyxHQUFZLElBQUksQ0FBQztJQUMxQixjQUFjLEdBQVksS0FBSyxDQUFDO0lBQ2hDLFdBQVcsR0FBWSxLQUFLLENBQUM7SUFDN0IsbUJBQW1CLEdBQVksSUFBSSxDQUFDO0lBQ3BDLElBQUksR0FBeUUsTUFBTSxDQUFDO0lBQ3BGLEtBQUssR0FBVyxFQUFFLENBQUM7SUFDbkIsR0FBRyxDQUFTO0lBQ1osU0FBUyxDQUFTO0lBQ2xCLEdBQUcsQ0FBUztJQUNaLFNBQVMsQ0FBUztJQUNsQixPQUFPLENBQWM7SUFDckIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixXQUFXLENBQVM7SUFDbkIsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFHN0MsT0FBTyxDQUFDLEtBQXlDO1FBQy9DLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7dUdBMUNVLGNBQWM7MkZBQWQsY0FBYyx1bEJDVjNCLHd2Q0FtQ0E7OzJGRHpCYSxjQUFjO2tCQU4xQixTQUFTOytCQUNFLFlBQVksbUJBR0wsdUJBQXVCLENBQUMsTUFBTTs4QkFHdkIsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXO2dCQUNiLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxPQUFPO3NCQUFoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSW9uSW5wdXQgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lucHV0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dENvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ2JpenlJbnB1dCcpIGJpenlJbnB1dDogSW9uSW5wdXQ7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1pbnB1dC0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXI6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBhdXRvRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBhdXRvQ2FwaXRhbGl6ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhdXRvQ29ycmVjdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBicm93c2VyQXV0b0NvbXBsZXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdHlwZTogJ3RleHQnIHwgJ2RhdGUnIHwgJ3Bhc3N3b3JkJyB8ICdlbWFpbCcgfCAnbnVtYmVyJyB8ICdzZWFyY2gnIHwgJ3RlbCcgPSAndGV4dCc7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heExlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgQElucHV0KCkgbWluTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvbnRyb2w6IEZvcm1Db250cm9sO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvbkZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cbiAgb25JbnB1dChldmVudDoge3RhcmdldDoge3ZhbHVlOiBzdHJpbmcgfCBudW1iZXJ9fSkge1xuICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LnRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgdGhpcy5jb250cm9sLnNldFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSA/PyBudWxsKTtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLmJpenlJbnB1dCB8fCAhdGhpcy5iaXp5SW5wdXQuc2V0Rm9jdXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJpenlJbnB1dC5zZXRGb2N1cygpO1xuICB9XG59IiwiPGlvbi1pbnB1dCBcbiAgICAjYml6eUlucHV0XG4gICAgY2xhc3M9XCJiaXp5LWlucHV0IHt7Y3VzdG9tQ2xhc3N9fVwiXG4gICAgW25nQ2xhc3NdPVwieydiaXp5LWlucHV0LS1lcnJvcic6IGNvbnRyb2wgJiYgY29udHJvbC50b3VjaGVkICYmIGNvbnRyb2wuaW52YWxpZH1cIlxuICAgIFt0eXBlXT1cInR5cGVcIlxuICAgIFtpbnB1dG1vZGVdPVwidHlwZVwiXG4gICAgaWQ9XCJ7e2lkfX1cIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICBbdmFsdWVdPVwiY29udHJvbD8udmFsdWVcIlxuICAgIFtzcGVsbGNoZWNrXT1cInRydWVcIlxuICAgIFthdXRvY2FwaXRhbGl6ZV09XCJhdXRvQ2FwaXRhbGl6ZSA/ICdvbicgOiAnb2ZmJ1wiXG4gICAgW2F1dG9jb3JyZWN0XT1cImF1dG9Db3JyZWN0ID8gJ29uJyA6ICdvZmYnXCJcbiAgICBbYXV0b2NvbXBsZXRlXT1cImJyb3dzZXJBdXRvQ29tcGxldGUgPyAnb24nIDogJ29mZidcIlxuICAgIFthdXRvZm9jdXNdPVwiYXV0b0ZvY3VzXCJcbiAgICBmaWxsPVwic29saWRcIlxuICAgIFttYXhdPVwibWF4XCJcbiAgICBbbWF4bGVuZ3RoXT1cIm1heExlbmd0aFwiXG4gICAgW21pbl09XCJtaW5cIlxuICAgIFttaW5sZW5ndGhdPVwibWluTGVuZ3RoXCJcbiAgICBbZGVib3VuY2VdPVwiMzAwXCJcbiAgICAoaW9uQmx1cik9XCJvbkJsdXIoKVwiXG4gICAgKGlvbklucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gICAgW2NsZWFySW5wdXRdPVwiY2xlYXJcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgbGFiZWxQbGFjZW1lbnQ9XCJzdGFja2VkXCI+XG4gICAgPGRpdiBzbG90PVwic3RhcnRcIj48bmctY29udGVudCBzZWxlY3Q9XCJbaW5wdXQtc3RhcnRdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgIDxkaXYgc2xvdD1cImxhYmVsXCI+e3tsYWJlbH19IDxuZy1jb250ZW50IHNlbGVjdD1cIltpbnB1dC1sYWJlbF1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgPGRpdiBzbG90PVwiZW5kXCI+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW2lucHV0LWVuZF1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG48L2lvbi1pbnB1dD5cblxuPHNwYW4gY2xhc3M9XCJiaXp5LWlucHV0X19lcnJvcnNcIiAqbmdJZj1cImNvbnRyb2wgJiYgY29udHJvbC50b3VjaGVkICYmIGNvbnRyb2wuaW52YWxpZFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltpbnB1dC1lcnJvcl1cIj48L25nLWNvbnRlbnQ+XG48L3NwYW4+XG5cbiJdfQ==