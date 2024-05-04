import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../input/input.component";
export class BizyFilterSectionSearchOptionComponent {
    id = String(Math.random());
    value = '';
    customClass = '';
    onChange = new EventEmitter();
    valueChange = new EventEmitter();
    setValue(value) {
        this.valueChange.emit(value);
        this.onChange.emit(value);
    }
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return Boolean(this.value);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionSearchOptionComponent, selector: "bizy-filter-section-search-option", inputs: { id: "id", value: "value", customClass: "customClass" }, outputs: { onChange: "onChange", valueChange: "valueChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-search-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <bizy-input\n        class=\"bizy-filter-section-search-option__input\"\n        [autoFocus]=\"true\"\n        [value]=\"value\"\n        (onChange)=\"setValue($event)\">\n    </bizy-input>\n\n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-search-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-search-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: i1.BizyInputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "value", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "onEnter", "onBlur", "valueChange", "onChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-search-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-search-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <bizy-input\n        class=\"bizy-filter-section-search-option__input\"\n        [autoFocus]=\"true\"\n        [value]=\"value\"\n        (onChange)=\"setValue($event)\">\n    </bizy-input>\n\n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-search-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-search-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], value: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], valueChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVFoRyxNQUFNLE9BQU8sc0NBQXNDO0lBQ3hDLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsS0FBSyxHQUFvQixFQUFFLENBQUM7SUFDNUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFDN0MsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRzFELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssR0FBRyxHQUFXLEVBQUU7UUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFdBQVcsR0FBRyxHQUFZLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQTt3R0FuQlUsc0NBQXNDOzRGQUF0QyxzQ0FBc0MsME1DUm5ELDJTQVdNOzs0RkRITyxzQ0FBc0M7a0JBTmxELFNBQVM7K0JBQ0UsbUNBQW1DLG1CQUc1Qix1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsdGVyU2VjdGlvblNlYXJjaE9wdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSAnJztcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PHN0cmluZz4+KCk7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4oKTtcblxuXG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGlzQWN0aXZhdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMudmFsdWUpO1xuICB9XG59IiwiPGRpdiBcbiAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIGlkPVwie3tpZH19XCI+XG5cbiAgICA8Yml6eS1pbnB1dFxuICAgICAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbl9faW5wdXRcIlxuICAgICAgICBbYXV0b0ZvY3VzXT1cInRydWVcIlxuICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAob25DaGFuZ2UpPVwic2V0VmFsdWUoJGV2ZW50KVwiPlxuICAgIDwvYml6eS1pbnB1dD5cblxuPC9kaXY+Il19