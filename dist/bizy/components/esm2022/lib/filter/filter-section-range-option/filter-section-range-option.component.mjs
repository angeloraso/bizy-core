import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../input/input.component";
import * as i2 from "../../slider/slider.component";
import * as i3 from "@angular/forms";
export class FilterSectionRangeOptionComponent {
    fb;
    id = String(Math.random());
    disabled = false;
    minLabel = 'Min';
    maxLabel = 'Max';
    customClass = '';
    onChange = new EventEmitter();
    _minLimit;
    _maxLimit;
    ngAfterViewInit() {
        if (this._minLimit) {
            this.minValue.setValue(this._minLimit);
        }
        if (this._maxLimit) {
            this.maxValue.setValue(this._maxLimit);
        }
    }
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
        this.minValue.setValue(min);
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
        this.maxValue.setValue(max);
        if (typeof this._minLimit === 'undefined' || this._minLimit === null) {
            this.maxValue.setValidators([Validators.max(max)]);
        }
        else {
            this.maxValue.setValidators([Validators.min(this._minLimit), Validators.max(max)]);
        }
    }
    ;
    form;
    #subscription = new Subscription();
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            minValue: [null],
            maxValue: [null]
        });
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
    onClear() {
        this.minValue.setValue(this._minLimit);
        this.maxValue.setValue(this._maxLimit);
    }
    getId() {
        return this.id;
    }
    getSelected() {
        return this.minValue.value === this._minLimit && this.maxValue.value === this._maxLimit;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionRangeOptionComponent, deps: [{ token: FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: FilterSectionRangeOptionComponent, selector: "bizy-filter-section-range-option", inputs: { id: "id", disabled: "disabled", minLabel: "minLabel", maxLabel: "maxLabel", customClass: "customClass", min: "min", max: "max", minLimit: "minLimit", maxLimit: "maxLimit" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n\n    <bizy-slider \n        [min]=\"minValue.value\"\n        [minLimit]=\"_minLimit\"\n        [maxLimit]=\"_maxLimit\"\n        [max]=\"maxValue.value\"\n        (onChange)=\"minValue.setValue($event.min); maxValue.setValue($event.max)\">\n    </bizy-slider>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}\n"], dependencies: [{ kind: "component", type: i1.InputComponent, selector: "bizy-input", inputs: ["id", "disabled", "readonly", "multiple", "clear", "autoFocus", "autoCapitalize", "autoCorrect", "browserAutoComplete", "type", "label", "max", "maxLength", "min", "minLength", "control", "placeholder", "cancelLabel", "confirmLabel", "customClass"], outputs: ["onFocus", "enter", "onBlur"] }, { kind: "component", type: i2.SliderComponent, selector: "bizy-slider", inputs: ["minLimit", "maxLimit", "min", "max"], outputs: ["onChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterSectionRangeOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-filter-section-range-option', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div \n    class=\"bizy-filter-section-range-option {{customClass}}\"\n    id=\"{{id}}\">\n\n    <span class=\"bizy-filter-section-range-option__inputs\">\n\n        <bizy-input\n            [title]=\"minLabel\"\n            type=\"number\"\n            [control]=\"minValue\">\n        </bizy-input>\n\n        <bizy-input\n            [title]=\"maxLabel\"\n            type=\"number\"\n            [control]=\"maxValue\">\n        </bizy-input>\n\n    </span>\n\n    <bizy-slider \n        [min]=\"minValue.value\"\n        [minLimit]=\"_minLimit\"\n        [maxLimit]=\"_maxLimit\"\n        [max]=\"maxValue.value\"\n        (onChange)=\"minValue.setValue($event.min); maxValue.setValue($event.max)\">\n    </bizy-slider>\n    \n</div>", styles: [":host{font-size:1rem}.bizy-filter-section-range-option{display:flex;flex-direction:column;row-gap:1rem}.bizy-filter-section-range-option__inputs{display:flex;align-items:center;column-gap:.5rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.FormBuilder, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9maWx0ZXIvZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NyYy9saWIvZmlsdGVyL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi9maWx0ZXItc2VjdGlvbi1yYW5nZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFtQixXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBUWxELE1BQU0sT0FBTyxpQ0FBaUM7SUF1RWI7SUF0RXRCLEVBQUUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixRQUFRLEdBQVcsS0FBSyxDQUFDO0lBQ3pCLFFBQVEsR0FBVyxLQUFLLENBQUM7SUFDekIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN4QixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQTRDLENBQUM7SUFFbEYsU0FBUyxDQUFTO0lBQ2xCLFNBQVMsQ0FBUztJQUVsQixlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElB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LENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFGLENBQUM7d0dBbklVLGlDQUFpQyxrQkF1RWxDLFdBQVc7NEZBdkVWLGlDQUFpQyxtU0NWOUMsb3VCQTRCTTs7NEZEbEJPLGlDQUFpQztrQkFON0MsU0FBUzsrQkFDRSxrQ0FBa0MsbUJBRzNCLHVCQUF1QixDQUFDLE1BQU07OzBCQXlFNUMsTUFBTTsyQkFBQyxXQUFXOzRDQXRFWixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQWVNLEdBQUc7c0JBQWYsS0FBSztnQkFTTyxHQUFHO3NCQUFmLEtBQUs7Z0JBU08sUUFBUTtzQkFBcEIsS0FBSztnQkFjTyxRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZWN0aW9uUmFuZ2VPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbWluTGFiZWw6IHN0cmluZyA9ICdNaW4nO1xuICBASW5wdXQoKSBtYXhMYWJlbDogc3RyaW5nID0gJ01heCc7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7bWluOiBudW1iZXIgfCBudWxsLCBtYXg6IG51bWJlciB8IG51bGx9PigpO1xuXG4gIF9taW5MaW1pdDogbnVtYmVyO1xuICBfbWF4TGltaXQ6IG51bWJlcjtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuX21pbkxpbWl0KSB7XG4gICAgICB0aGlzLm1pblZhbHVlLnNldFZhbHVlKHRoaXMuX21pbkxpbWl0KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbWF4TGltaXQpIHtcbiAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsdWUodGhpcy5fbWF4TGltaXQpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtaW4obWluOiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnIHx8IG1pbiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5taW5WYWx1ZS5zZXRWYWx1ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5taW5WYWx1ZS5zZXRWYWx1ZShtaW4pO1xuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBtYXgobWF4OiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnIHx8IG1heCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5tYXhWYWx1ZS5zZXRWYWx1ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tYXhWYWx1ZS5zZXRWYWx1ZShtYXgpO1xuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBtaW5MaW1pdChtaW46IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcgfHwgbWluID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbWluTGltaXQgPSBtaW47XG4gICAgdGhpcy5taW5WYWx1ZS5zZXRWYWx1ZShtaW4pO1xuICAgIGlmICh0eXBlb2YgdGhpcy5fbWF4TGltaXQgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuX21heExpbWl0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1pblZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWF4KG1pbildKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pblZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWF4KHRoaXMuX21heExpbWl0KSwgVmFsaWRhdG9ycy5taW4obWluKV0pXG4gICAgfVxuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBtYXhMaW1pdChtYXg6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbWF4ID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbWF4TGltaXQgPSBtYXg7XG4gICAgdGhpcy5tYXhWYWx1ZS5zZXRWYWx1ZShtYXgpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5fbWluTGltaXQgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuX21pbkxpbWl0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1heFZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWF4KG1heCldKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heFZhbHVlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMubWluKHRoaXMuX21pbkxpbWl0KSwgVmFsaWRhdG9ycy5tYXgobWF4KV0pXG4gICAgfVxuICB9O1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcbiAgI3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlclxuICApIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIG1pblZhbHVlOiBbbnVsbF0sXG4gICAgICBtYXhWYWx1ZTogW251bGxdXG4gICAgfSk7XG5cbiAgICB0aGlzLiNzdWJzY3JpcHRpb24uYWRkKHRoaXMubWluVmFsdWUudmFsdWVDaGFuZ2VzLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZShfdmFsdWUgPT4ge1xuICAgICAgY29uc3QgbWluID0gX3ZhbHVlID09PSAnJyA/IG51bGwgOiBOdW1iZXIoX3ZhbHVlKTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fbWluTGltaXQgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuX21pbkxpbWl0ICE9PSBudWxsICYmIG1pbiAmJiBtaW4gPCB0aGlzLl9taW5MaW1pdCkge1xuICAgICAgICB0aGlzLm1pblZhbHVlLnNldFZhbHVlKHRoaXMuX21pbkxpbWl0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXggPSB0aGlzLm1heFZhbHVlLnZhbHVlID09PSBudWxsIHx8IHRoaXMubWF4VmFsdWUudmFsdWUgPT09ICcnID8gbnVsbCA6IE51bWJlcih0aGlzLm1heFZhbHVlLnZhbHVlKTtcblxuICAgICAgaWYgKG1pbiAhPT0gbnVsbCAmJiBtYXggIT09IG51bGwgJiYgbWF4IDwgbWluKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHttaW4sIG1heH0pO1xuICAgIH0pKTtcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbi5hZGQodGhpcy5tYXhWYWx1ZS52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKF92YWx1ZSA9PiB7XG4gICAgICBjb25zdCBtYXggPSBfdmFsdWUgPT09ICcnID8gbnVsbCA6IE51bWJlcihfdmFsdWUpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tYXhMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fbWF4TGltaXQgIT09IG51bGwgJiYgbWF4ICYmIG1heCA+IHRoaXMuX21heExpbWl0KSB7XG4gICAgICAgIHRoaXMubWF4VmFsdWUuc2V0VmFsdWUodGhpcy5fbWF4TGltaXQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pbiA9IHRoaXMubWluVmFsdWUudmFsdWUgPT09IG51bGwgfHwgdGhpcy5taW5WYWx1ZS52YWx1ZSA9PT0gJycgPyBudWxsIDogTnVtYmVyKHRoaXMubWluVmFsdWUudmFsdWUpO1xuXG4gICAgICBpZiAobWluICE9PSBudWxsICYmIG1heCAhPT0gbnVsbCAgJiYgbWF4IDwgbWluKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHttaW4sIG1heH0pO1xuICAgIH0pKTtcbiAgfVxuXG4gIGdldCBtaW5WYWx1ZSgpOiBBYnN0cmFjdENvbnRyb2w8bnVtYmVyIHwgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5nZXQoJ21pblZhbHVlJykhO1xuICB9XG5cbiAgZ2V0IG1heFZhbHVlKCk6IEFic3RyYWN0Q29udHJvbDxudW1iZXIgfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmdldCgnbWF4VmFsdWUnKSE7XG4gIH1cblxuICBvbkNsZWFyKCkge1xuICAgIHRoaXMubWluVmFsdWUuc2V0VmFsdWUodGhpcy5fbWluTGltaXQpO1xuXG4gICAgdGhpcy5tYXhWYWx1ZS5zZXRWYWx1ZSh0aGlzLl9tYXhMaW1pdCk7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLm1pblZhbHVlLnZhbHVlID09PSB0aGlzLl9taW5MaW1pdCAmJiB0aGlzLm1heFZhbHVlLnZhbHVlID09PSB0aGlzLl9tYXhMaW1pdDtcbiAgfVxufSIsIjxkaXYgXG4gICAgY2xhc3M9XCJiaXp5LWZpbHRlci1zZWN0aW9uLXJhbmdlLW9wdGlvbiB7e2N1c3RvbUNsYXNzfX1cIlxuICAgIGlkPVwie3tpZH19XCI+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpenktZmlsdGVyLXNlY3Rpb24tcmFuZ2Utb3B0aW9uX19pbnB1dHNcIj5cblxuICAgICAgICA8Yml6eS1pbnB1dFxuICAgICAgICAgICAgW3RpdGxlXT1cIm1pbkxhYmVsXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgW2NvbnRyb2xdPVwibWluVmFsdWVcIj5cbiAgICAgICAgPC9iaXp5LWlucHV0PlxuXG4gICAgICAgIDxiaXp5LWlucHV0XG4gICAgICAgICAgICBbdGl0bGVdPVwibWF4TGFiZWxcIlxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBbY29udHJvbF09XCJtYXhWYWx1ZVwiPlxuICAgICAgICA8L2JpenktaW5wdXQ+XG5cbiAgICA8L3NwYW4+XG5cbiAgICA8Yml6eS1zbGlkZXIgXG4gICAgICAgIFttaW5dPVwibWluVmFsdWUudmFsdWVcIlxuICAgICAgICBbbWluTGltaXRdPVwiX21pbkxpbWl0XCJcbiAgICAgICAgW21heExpbWl0XT1cIl9tYXhMaW1pdFwiXG4gICAgICAgIFttYXhdPVwibWF4VmFsdWUudmFsdWVcIlxuICAgICAgICAob25DaGFuZ2UpPVwibWluVmFsdWUuc2V0VmFsdWUoJGV2ZW50Lm1pbik7IG1heFZhbHVlLnNldFZhbHVlKCRldmVudC5tYXgpXCI+XG4gICAgPC9iaXp5LXNsaWRlcj5cbiAgICBcbjwvZGl2PiJdfQ==