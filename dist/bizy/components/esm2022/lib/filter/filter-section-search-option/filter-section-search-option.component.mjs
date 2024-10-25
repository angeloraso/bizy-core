import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../input/input.component";
export class BizyFilterSectionSearchOptionComponent {
    ref;
    id = `bizy-filter-section-search-option-${Math.random()}`;
    customClass = '';
    valueChange = new EventEmitter();
    onChange = new EventEmitter();
    _value = '';
    #activated = new BehaviorSubject(false);
    get activated$() {
        return this.#activated.asObservable();
    }
    set value(value) {
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        if (Array.isArray(value)) {
            value = '';
        }
        this._value = value;
        this.#activated.next(Boolean(value));
        this.ref.detectChanges();
    }
    constructor(ref) {
        this.ref = ref;
    }
    _onChange(value) {
        this.valueChange.emit(value);
        this.onChange.emit(value);
        this.#activated.next(Boolean(value));
        this.ref.detectChanges();
    }
    getId = () => {
        return this.id;
    };
    getValue = () => {
        return this._value;
    };
    isActivated = () => {
        return this.#activated.value;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, deps: [{ token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionSearchOptionComponent, selector: "bizy-filter-section-search-option", inputs: { id: "id", customClass: "customClass", value: "value" }, outputs: { valueChange: "valueChange", onChange: "onChange" }, ngImport: i0, template: "<bizy-input\n    [id]=\"id\" \n    (onChange)=\"_onChange($event)\"\n    [value]=\"_value\"\n    class=\"bizy-filter-section-search-option {{customClass}}\">\n\n    <span slot=\"header\"></span>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=suffix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:100%}.bizy-filter-section-search-option{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: i1.BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionSearchOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-search-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    [id]=\"id\" \n    (onChange)=\"_onChange($event)\"\n    [value]=\"_value\"\n    class=\"bizy-filter-section-search-option {{customClass}}\">\n\n    <span slot=\"header\"></span>\n\n    <ng-container slot=\"prefix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=suffix]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:100%}.bizy-filter-section-search-option{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], customClass: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXNlYXJjaC1vcHRpb24vZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7OztBQVFuRCxNQUFNLE9BQU8sc0NBQXNDO0lBNkJaO0lBNUI1QixFQUFFLEdBQVcscUNBQXFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ2xFLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDeEIsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFDekMsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFaEQsTUFBTSxHQUFXLEVBQUUsQ0FBQztJQUVwQixVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFakQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFhLEtBQUssQ0FBQyxLQUFhO1FBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEQsT0FBTztTQUNSO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFlBQ3FDLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQ3hELENBQUM7SUFFSixTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQTtJQUVELFFBQVEsR0FBRyxHQUFHLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQyxDQUFBO0lBRUQsV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNqQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUMsQ0FBQTt3R0FqRFUsc0NBQXNDLGtCQTZCdkMsaUJBQWlCOzRGQTdCaEIsc0NBQXNDLDBNQ1RuRCxxY0FpQkE7OzRGRFJhLHNDQUFzQztrQkFObEQsU0FBUzsrQkFDRSxtQ0FBbUMsbUJBRzVCLHVCQUF1QixDQUFDLE1BQU07OzBCQStCNUMsTUFBTTsyQkFBQyxpQkFBaUI7NENBNUJsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBVU0sS0FBSztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24tc2VhcmNoLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsdGVyU2VjdGlvblNlYXJjaE9wdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uLSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBfdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gICNhY3RpdmF0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBnZXQgYWN0aXZhdGVkJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy4jYWN0aXZhdGVkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9IFxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLiNhY3RpdmF0ZWQubmV4dChCb29sZWFuKHZhbHVlKSk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBfb25DaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB0aGlzLiNhY3RpdmF0ZWQubmV4dChCb29sZWFuKHZhbHVlKSk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgZ2V0SWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cblxuICBnZXRWYWx1ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBpc0FjdGl2YXRlZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy4jYWN0aXZhdGVkLnZhbHVlO1xuICB9XG59IiwiPGJpenktaW5wdXRcbiAgICBbaWRdPVwiaWRcIiBcbiAgICAob25DaGFuZ2UpPVwiX29uQ2hhbmdlKCRldmVudClcIlxuICAgIFt2YWx1ZV09XCJfdmFsdWVcIlxuICAgIGNsYXNzPVwiYml6eS1maWx0ZXItc2VjdGlvbi1zZWFyY2gtb3B0aW9uIHt7Y3VzdG9tQ2xhc3N9fVwiPlxuXG4gICAgPHNwYW4gc2xvdD1cImhlYWRlclwiPjwvc3Bhbj5cblxuICAgIDxuZy1jb250YWluZXIgc2xvdD1cInByZWZpeFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1wcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLWNvbnRhaW5lciBzbG90PVwic3VmZml4XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXN1ZmZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbjwvYml6eS1pbnB1dD5cbiJdfQ==