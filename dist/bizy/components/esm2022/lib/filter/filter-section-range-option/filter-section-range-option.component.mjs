import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../input/input.component";
import * as i2 from "@angular/forms";
export class BizyFilterSectionRangeOptionComponent {
    fb;
    id = String(Math.random());
    disabled = false;
    minLabel = 'Mayor o igual';
    maxLabel = 'Menor o igual';
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    form;
    #subscription = new Subscription();
    set min(min) {
        if (typeof min === 'undefined' || min === null) {
            this.minValue.setValue('');
            return;
        }
        this.minValue.setValue(min);
    }
    ;
    set max(max) {
        if (typeof max === 'undefined' || max === null) {
            this.maxValue.setValue('');
            return;
        }
        this.maxValue.setValue(max);
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
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            minValue: [null],
            maxValue: [null]
        });
    }
    ngAfterViewInit() {
        this.#subscription.add(this.minValue.valueChanges.pipe(debounceTime(300)).subscribe(_value => {
            const min = _value === '' ? null : Number(_value);
            if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
                this.minValue.setValue(this._minLimit);
                return;
            }
            const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);
            if (min !== null && max !== null && max < min) {
                return;
            }
            this.onChange.emit({ min, max });
        }));
        this.#subscription.add(this.maxValue.valueChanges.pipe(debounceTime(300)).subscribe(_value => {
            const max = _value === '' ? null : Number(_value);
            if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
                this.maxValue.setValue(this._maxLimit);
                return;
            }
            const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);
            if (min !== null && max !== null && max < min) {
                return;
            }
            this.onChange.emit({ min, max });
        }));
    }
    get minValue() {
        return this.form.get('minValue');
    }
    get maxValue() {
        return this.form.get('maxValue');
    }
    onClear = () => {
        this.minValue.setValue('');
        this.maxValue.setValue('');
    };
    getId = () => {
        return this.id;
    };
    isActivated = () => {
        return (this.minValue.value || this.minValue.value === 0 || this.maxValue.value || this.maxValue.value === 0) && (this.minValue.value !== this._minLimit || this.maxValue.value !== this._maxLimit);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, deps: [{ token: FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyFilterSectionRangeOptionComponent, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", minLabel: "minLabel", maxLabel: "maxLabel", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"], dependencies: [{ kind: "component", type: i1.BizyInputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "value", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "onEnter", "onBlur", "valueChange", "onChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            class=\"bizy-filter-section-range-option__input\"\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}.bizy-filter-section-range-option__input{--bizy-input-background-color: #f3f3f3 !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder, decorators: [{
                    type: Inject,
                    args: [FormBuilder]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], minLabel: [{
                type: Input
            }], maxLabel: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFtQixXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFRbEQsTUFBTSxPQUFPLHFDQUFxQztJQTJEakI7SUExRHRCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixRQUFRLEdBQVcsZUFBZSxDQUFDO0lBQ25DLFFBQVEsR0FBVyxlQUFlLENBQUM7SUFDbkMsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQTRDLENBQUM7SUFFbEYsU0FBUyxDQUFTO0lBQ2xCLFNBQVMsQ0FBUztJQUVsQixJQUFJLENBQVk7SUFDaEIsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkMsSUFBYSxHQUFHLENBQUMsR0FBa0I7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QUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdk0sQ0FBQyxDQUFBO3dHQXpIVSxxQ0FBcUMsa0JBMkR0QyxXQUFXOzRGQTNEVixxQ0FBcUMsbVNDVmxELDJsQkFzQk07OzRGRFpPLHFDQUFxQztrQkFOakQsU0FBUzsrQkFDRSxrQ0FBa0MsbUJBRzNCLHVCQUF1QixDQUFDLE1BQU07OzBCQTZENUMsTUFBTTsyQkFBQyxXQUFXOzRDQTFEWixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQVFNLEdBQUc7c0JBQWYsS0FBSztnQkFTTyxHQUFHO3NCQUFmLEtBQUs7Z0JBU08sUUFBUTtzQkFBcEIsS0FBSztnQkFhTyxRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RmlsdGVyU2VjdGlvblJhbmdlT3B0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSk7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG1pbkxhYmVsOiBzdHJpbmcgPSAnTWF5b3IgbyBpZ3VhbCc7XG4gIEBJbnB1dCgpIG1heExhYmVsOiBzdHJpbmcgPSAnTWVub3IgbyBpZ3VhbCc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7bWluOiBudW1iZXIgfCBudWxsLCBtYXg6IG51bWJlciB8IG51bGx9PigpO1xuXG4gIF9taW5MaW1pdDogbnVtYmVyO1xuICBfbWF4TGltaXQ6IG51bWJlcjtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG4gICNzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgQElucHV0KCkgc2V0IG1pbihtaW46IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcgfHwgbWluID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1pblZhbHVlLnNldFZhbHVlKCcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1pblZhbHVlLnNldFZhbHVlKG1pbik7XG4gIH07XG5cbiAgQElucHV0KCkgc2V0IG1heChtYXg6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbWF4ID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1heFZhbHVlLnNldFZhbHVlKCcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1heFZhbHVlLnNldFZhbHVlKG1heCk7XG4gIH07XG5cbiAgQElucHV0KCkgc2V0IG1pbkxpbWl0KG1pbjogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmICh0eXBlb2YgbWluID09PSAndW5kZWZpbmVkJyB8fCBtaW4gPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9taW5MaW1pdCA9IG1pbjtcbiAgICBpZiAodHlwZW9mIHRoaXMuX21heExpbWl0ID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLl9tYXhMaW1pdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5taW5WYWx1ZS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLm1heChtaW4pXSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taW5WYWx1ZS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLm1heCh0aGlzLl9tYXhMaW1pdCksIFZhbGlkYXRvcnMubWluKG1pbildKVxuICAgIH1cbiAgfTtcblxuICBASW5wdXQoKSBzZXQgbWF4TGltaXQobWF4OiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnIHx8IG1heCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21heExpbWl0ID0gbWF4O1xuICAgIGlmICh0eXBlb2YgdGhpcy5fbWluTGltaXQgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuX21pbkxpbWl0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1heFZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWF4KG1heCldKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heFZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWluKHRoaXMuX21pbkxpbWl0KSwgVmFsaWRhdG9ycy5tYXgobWF4KV0pXG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyXG4gICkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgbWluVmFsdWU6IFtudWxsXSxcbiAgICAgIG1heFZhbHVlOiBbbnVsbF1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubWluVmFsdWUudmFsdWVDaGFuZ2VzLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZShfdmFsdWUgPT4ge1xuICAgICAgY29uc3QgbWluID0gX3ZhbHVlID09PSAnJyA/IG51bGwgOiBOdW1iZXIoX3ZhbHVlKTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fbWluTGltaXQgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuX21pbkxpbWl0ICE9PSBudWxsICYmIG1pbiAmJiBtaW4gPCB0aGlzLl9taW5MaW1pdCkge1xuICAgICAgICB0aGlzLm1pblZhbHVlLnNldFZhbHVlKHRoaXMuX21pbkxpbWl0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXggPSB0aGlzLm1heFZhbHVlLnZhbHVlID09PSBudWxsIHx8IHRoaXMubWF4VmFsdWUudmFsdWUgPT09ICcnID8gbnVsbCA6IE51bWJlcih0aGlzLm1heFZhbHVlLnZhbHVlKTtcblxuICAgICAgaWYgKG1pbiAhPT0gbnVsbCAmJiBtYXggIT09IG51bGwgJiYgbWF4IDwgbWluKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHttaW4sIG1heH0pO1xuICAgIH0pKTtcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5tYXhWYWx1ZS52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKF92YWx1ZSA9PiB7XG4gICAgICBjb25zdCBtYXggPSBfdmFsdWUgPT09ICcnID8gbnVsbCA6IE51bWJlcihfdmFsdWUpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tYXhMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fbWF4TGltaXQgIT09IG51bGwgJiYgbWF4ICYmIG1heCA+IHRoaXMuX21heExpbWl0KSB7XG4gICAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsdWUodGhpcy5fbWF4TGltaXQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pbiA9IHRoaXMubWluVmFsdWUudmFsdWUgPT09IG51bGwgfHwgdGhpcy5taW5WYWx1ZS52YWx1ZSA9PT0gJycgPyBudWxsIDogTnVtYmVyKHRoaXMubWluVmFsdWUudmFsdWUpO1xuXG4gICAgICBpZiAobWluICE9PSBudWxsICYmIG1heCAhPT0gbnVsbCAmJiBtYXggPCBtaW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe21pbiwgbWF4fSk7XG4gICAgfSkpO1xuICB9XG5cbiAgZ2V0IG1pblZhbHVlKCk6IEFic3RyYWN0Q29udHJvbDxudW1iZXIgfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmdldCgnbWluVmFsdWUnKSE7XG4gIH1cblxuICBnZXQgbWF4VmFsdWUoKTogQWJzdHJhY3RDb250cm9sPG51bWJlciB8IHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KCdtYXhWYWx1ZScpITtcbiAgfVxuXG4gIG9uQ2xlYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5taW5WYWx1ZS5zZXRWYWx1ZSgnJyk7XG5cbiAgICB0aGlzLm1heFZhbHVlLnNldFZhbHVlKCcnKTtcbiAgfVxuXG4gIGdldElkID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgaXNBY3RpdmF0ZWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuICh0aGlzLm1pblZhbHVlLnZhbHVlIHx8IHRoaXMubWluVmFsdWUudmFsdWUgPT09IDAgfHwgdGhpcy5tYXhWYWx1ZS52YWx1ZSB8fCB0aGlzLm1heFZhbHVlLnZhbHVlID09PSAwICkgJiYgKHRoaXMubWluVmFsdWUudmFsdWUgIT09IHRoaXMuX21pbkxpbWl0IHx8IHRoaXMubWF4VmFsdWUudmFsdWUgIT09IHRoaXMuX21heExpbWl0KTtcbiAgfVxufSIsIjxkaXYgXG4gICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIGlkPVwie3tpZH19XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uX19pbnB1dHNcIj5cblxuICAgICAgICA8Yml6eS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbl9faW5wdXRcIlxuICAgICAgICAgICAgW3RpdGxlXT1cIm1pbkxhYmVsXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgW2NvbnRyb2xdPVwibWluVmFsdWVcIj5cbiAgICAgICAgPC9iaXp5LWlucHV0PlxuXG4gICAgICAgIDxiaXp5LWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uX19pbnB1dFwiXG4gICAgICAgICAgICBbdGl0bGVdPVwibWF4TGFiZWxcIlxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBbY29udHJvbF09XCJtYXhWYWx1ZVwiPlxuICAgICAgICA8L2JpenktaW5wdXQ+XG5cbiAgICA8L3NwYW4+XG4gICAgXG48L2Rpdj4iXX0=