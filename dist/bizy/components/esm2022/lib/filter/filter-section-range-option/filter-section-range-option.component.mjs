import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../input/input.component";
import * as i2 from "@angular/forms";
export class BizyFilterSectionRangeOptionComponent {
    fb;
    ref;
    id = `bizy-filter-section-range-option-${Math.random()}`;
    disabled = false;
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    #activated = new BehaviorSubject(false);
    get activated$() {
        return this.#activated.asObservable();
    }
    form;
    set min(min) {
        if (typeof min === 'undefined' || min === null) {
            this.minValue.setValue(null);
        }
        else {
            this.minValue.setValue(min);
        }
        this.#activated.next(Boolean(min));
        this.ref.detectChanges();
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max === null) {
            this.maxValue.setValue(null);
        }
        else {
            this.maxValue.setValue(max);
        }
        this.#activated.next(Boolean(max));
        this.ref.detectChanges();
    }
    ;
    set minLimit(min) {
        if (typeof min === 'undefined' || min === null) {
            return;
        }
        this._minLimit = min;
        if (typeof this._maxLimit === 'undefined' || this._maxLimit === null) {
            this.minValue.setValidators([Validators.max(min)]);
        }
        else {
            this.minValue.setValidators([Validators.max(this._maxLimit), Validators.min(min)]);
        }
    }
    ;
    set maxLimit(max) {
        if (typeof max === 'undefined' || max === null) {
            return;
        }
        this._maxLimit = max;
        if (typeof this._minLimit === 'undefined' || this._minLimit === null) {
            this.maxValue.setValidators([Validators.max(max)]);
        }
        else {
            this.maxValue.setValidators([Validators.min(this._minLimit), Validators.max(max)]);
        }
    }
    ;
    constructor(fb, ref) {
        this.fb = fb;
        this.ref = ref;
        this.form = this.fb.group({
            minValue: [null],
            maxValue: [null]
        });
    }
    setMinValue(value) {
        let min = value === '' ? null : Number(value);
        const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);
        if (min !== null && max !== null && max < min) {
            return;
        }
        if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
            min = this._minLimit;
        }
        this.onChange.emit({ min, max });
        this.#activated.next(Boolean(min) || Boolean(max));
        this.ref.detectChanges();
    }
    setMaxValue(value) {
        let max = !Boolean(value) && value !== 0 ? null : Number(value);
        const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);
        if (min !== null && max !== null && max < min) {
            return;
        }
        if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
            max = this._maxLimit;
        }
        this.onChange.emit({ min, max });
        this.#activated.next(Boolean(min) || Boolean(max));
        this.ref.detectChanges();
    }
    get minValue() {
        return this.form.get('minValue');
    }
    get maxValue() {
        return this.form.get('maxValue');
    }
    onClean = () => {
        this.minValue.setValue(null);
        this.maxValue.setValue(null);
        this.onChange.emit({ min: null, max: null });
        this.#activated.next(false);
        this.ref.detectChanges();
    };
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return this.#activated.value;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, deps: [{ token: FormBuilder }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionRangeOptionComponent, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    [id]=\"id\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"minValue.value\"\n            (onChange)=\"setMinValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=min-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"maxValue.value\"\n            (onChange)=\"setMaxValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=max-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: i1.BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    [id]=\"id\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"minValue.value\"\n            (onChange)=\"setMinValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=min-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            type=\"number\"\n            [value]=\"maxValue.value\"\n            (onChange)=\"setMaxValue($event)\">\n\n            <ng-container slot=\"header\">\n                <ng-content select=\"[slot=max-header]\"></ng-content>\n            </ng-container>\n\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder, decorators: [{
                    type: Inject,
                    args: [FormBuilder]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], onChange: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], minLimit: [{
                type: Input
            }], maxLimit: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQW1CLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRixPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7O0FBUW5ELE1BQU0sT0FBTyxxQ0FBcUM7SUFrRWpCO0lBQ007SUFsRTVCLEVBQUUsR0FBVyxvQ0FBb0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDakUsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBNEMsQ0FBQztJQUVsRixTQUFTLENBQVM7SUFDbEIsU0FBUyxDQUFTO0lBRWxCLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVqRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUks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UUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQTtJQUVELEtBQUssR0FBRyxHQUFHLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFBO0lBRUQsV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNqQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUMsQ0FBQTt3R0FwSVUscUNBQXFDLGtCQWtFdEMsV0FBVyxhQUNYLGlCQUFpQjs0RkFuRWhCLHFDQUFxQyx1UENWbEQsdTZCQWdDTTs7NEZEdEJPLHFDQUFxQztrQkFOakQsU0FBUzsrQkFDRSxrQ0FBa0MsbUJBRzNCLHVCQUF1QixDQUFDLE1BQU07OzBCQW9FNUMsTUFBTTsyQkFBQyxXQUFXOzswQkFDbEIsTUFBTTsyQkFBQyxpQkFBaUI7NENBbEVsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBYU0sR0FBRztzQkFBZixLQUFLO2dCQVdPLEdBQUc7c0JBQWYsS0FBSztnQkFXTyxRQUFRO3NCQUFwQixLQUFLO2dCQWFPLFFBQVE7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eUZpbHRlclNlY3Rpb25SYW5nZU9wdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24tJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7bWluOiBudW1iZXIgfCBudWxsLCBtYXg6IG51bWJlciB8IG51bGx9PigpO1xuXG4gIF9taW5MaW1pdDogbnVtYmVyO1xuICBfbWF4TGltaXQ6IG51bWJlcjtcblxuICAjYWN0aXZhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgZ2V0IGFjdGl2YXRlZCQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuI2FjdGl2YXRlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBASW5wdXQoKSBzZXQgbWluKG1pbjogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmICh0eXBlb2YgbWluID09PSAndW5kZWZpbmVkJyB8fCBtaW4gPT09IG51bGwpIHtcbiAgICAgIHRoaXMubWluVmFsdWUuc2V0VmFsdWUobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluVmFsdWUuc2V0VmFsdWUobWluKTtcbiAgICB9XG5cbiAgICB0aGlzLiNhY3RpdmF0ZWQubmV4dChCb29sZWFuKG1pbikpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBASW5wdXQoKSBzZXQgbWF4KG1heDogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmICh0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyB8fCBtYXggPT09IG51bGwpIHtcbiAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsdWUobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsdWUobWF4KTtcbiAgICB9XG5cbiAgICB0aGlzLiNhY3RpdmF0ZWQubmV4dChCb29sZWFuKG1heCkpO1xuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBASW5wdXQoKSBzZXQgbWluTGltaXQobWluOiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnIHx8IG1pbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21pbkxpbWl0ID0gbWluO1xuICAgIGlmICh0eXBlb2YgdGhpcy5fbWF4TGltaXQgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuX21heExpbWl0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1pblZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWF4KG1pbildKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pblZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWF4KHRoaXMuX21heExpbWl0KSwgVmFsaWRhdG9ycy5taW4obWluKV0pXG4gICAgfVxuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBtYXhMaW1pdChtYXg6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbWF4ID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbWF4TGltaXQgPSBtYXg7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9taW5MaW1pdCA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5fbWluTGltaXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5tYXgobWF4KV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5taW4odGhpcy5fbWluTGltaXQpLCBWYWxpZGF0b3JzLm1heChtYXgpXSlcbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgQEluamVjdChDaGFuZ2VEZXRlY3RvclJlZikgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgbWluVmFsdWU6IFtudWxsXSxcbiAgICAgIG1heFZhbHVlOiBbbnVsbF1cbiAgICB9KTtcbiAgfVxuXG4gIHNldE1pblZhbHVlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBsZXQgbWluID0gdmFsdWUgPT09ICcnID8gbnVsbCA6IE51bWJlcih2YWx1ZSk7XG4gICAgY29uc3QgbWF4ID0gdGhpcy5tYXhWYWx1ZS52YWx1ZSA9PT0gbnVsbCB8fCB0aGlzLm1heFZhbHVlLnZhbHVlID09PSAnJyA/IG51bGwgOiBOdW1iZXIodGhpcy5tYXhWYWx1ZS52YWx1ZSk7XG5cbiAgICBpZiAobWluICE9PSBudWxsICYmIG1heCAhPT0gbnVsbCAmJiBtYXggPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX21pbkxpbWl0ICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLl9taW5MaW1pdCAhPT0gbnVsbCAmJiBtaW4gJiYgbWluIDwgdGhpcy5fbWluTGltaXQpIHtcbiAgICAgIG1pbiA9IHRoaXMuX21pbkxpbWl0O1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7bWluLCBtYXh9KTtcbiAgICB0aGlzLiNhY3RpdmF0ZWQubmV4dChCb29sZWFuKG1pbikgfHwgQm9vbGVhbihtYXgpKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbiAgXG4gIHNldE1heFZhbHVlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsKSB7XG4gICAgbGV0IG1heCA9ICFCb29sZWFuKHZhbHVlKSAmJiB2YWx1ZSAhPT0gMCA/IG51bGwgOiBOdW1iZXIodmFsdWUpO1xuXG4gICAgY29uc3QgbWluID0gdGhpcy5taW5WYWx1ZS52YWx1ZSA9PT0gbnVsbCB8fCB0aGlzLm1pblZhbHVlLnZhbHVlID09PSAnJyA/IG51bGwgOiBOdW1iZXIodGhpcy5taW5WYWx1ZS52YWx1ZSk7XG5cbiAgICBpZiAobWluICE9PSBudWxsICYmIG1heCAhPT0gbnVsbCAmJiBtYXggPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX21heExpbWl0ICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLl9tYXhMaW1pdCAhPT0gbnVsbCAmJiBtYXggJiYgbWF4ID4gdGhpcy5fbWF4TGltaXQpIHtcbiAgICAgIG1heCA9IHRoaXMuX21heExpbWl0O1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7bWluLCBtYXh9KTtcbiAgICB0aGlzLiNhY3RpdmF0ZWQubmV4dChCb29sZWFuKG1pbikgfHwgQm9vbGVhbihtYXgpKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBnZXQgbWluVmFsdWUoKTogQWJzdHJhY3RDb250cm9sPG51bWJlciB8IHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KCdtaW5WYWx1ZScpITtcbiAgfVxuXG4gIGdldCBtYXhWYWx1ZSgpOiBBYnN0cmFjdENvbnRyb2w8bnVtYmVyIHwgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5nZXQoJ21heFZhbHVlJykhO1xuICB9XG5cbiAgb25DbGVhbiA9ICgpID0+IHtcbiAgICB0aGlzLm1pblZhbHVlLnNldFZhbHVlKG51bGwpO1xuICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsdWUobnVsbCk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHttaW46IG51bGwsIG1heDogbnVsbH0pO1xuICAgIHRoaXMuI2FjdGl2YXRlZC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBnZXRJZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGlzQWN0aXZhdGVkID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLiNhY3RpdmF0ZWQudmFsdWU7XG4gIH1cbn0iLCI8ZGl2IFxuICAgIGNsYXNzPVwiYml6eS1maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24ge3tjdXN0b21DbGFzc319XCJcbiAgICBbaWRdPVwiaWRcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiYml6eS1maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb25fX2lucHV0c1wiPlxuXG4gICAgICAgIDxiaXp5LWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uX19pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJtaW5WYWx1ZS52YWx1ZVwiXG4gICAgICAgICAgICAob25DaGFuZ2UpPVwic2V0TWluVmFsdWUoJGV2ZW50KVwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyIHNsb3Q9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1taW4taGVhZGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvYml6eS1pbnB1dD5cblxuICAgICAgICA8Yml6eS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbl9faW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBbdmFsdWVdPVwibWF4VmFsdWUudmFsdWVcIlxuICAgICAgICAgICAgKG9uQ2hhbmdlKT1cInNldE1heFZhbHVlKCRldmVudClcIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBzbG90PVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9bWF4LWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2JpenktaW5wdXQ+XG5cbiAgICA8L3NwYW4+XG4gICAgXG48L2Rpdj4iXX0=