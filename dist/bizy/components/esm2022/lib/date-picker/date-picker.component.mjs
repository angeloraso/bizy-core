import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import flatpickr from "flatpickr";
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../input/input.component";
export class BizyDatePickerComponent {
    datePipe;
    ref;
    bizyDatePicker;
    id = `bizy-date-picker-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    minDate = null;
    maxDate = null;
    enableSeconds = false;
    dateChange = new EventEmitter();
    rangeChange = new EventEmitter();
    onChange = new EventEmitter();
    openedChange = new EventEmitter();
    onOpen = new EventEmitter();
    onSelect = new EventEmitter();
    dateFormat = 'Y-m-d';
    datePipeFormat = 'yyyy-MM-dd';
    enableTime = false;
    started = false;
    noCalendar = true;
    mode = 'single';
    dates = [Date.now()];
    time = Date.now();
    get touched() {
        return this.bizyDatePicker ? this.bizyDatePicker.touched : false;
    }
    set date(date) {
        if (typeof date === 'undefined' || date === null) {
            return;
        }
        this.mode = 'single';
        this.dates = [date];
        this.time = date;
        this.value = this.datePipe.transform(date, this.datePipeFormat, undefined, 'es-AR');
        if (!this.enableTime || !this.started) {
            this.#start();
        }
    }
    set range(range) {
        if (!range) {
            return;
        }
        this.mode = 'range';
        this.dates = [range.from, range.to];
        this.time = range.from;
        this.value = `${this.datePipe.transform(range.from, this.datePipeFormat, undefined, 'es-AR')} - ${this.datePipe.transform(range.to, this.datePipeFormat, undefined, 'es-AR')}`;
        this.#start();
    }
    value = '';
    set type(type) {
        if (!type) {
            return;
        }
        switch (type) {
            case 'date':
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            case 'date-time':
                this.dateFormat = 'Y-m-d H:i:S';
                this.datePipeFormat = this.enableSeconds ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd HH:mm';
                this.enableTime = true;
                this.noCalendar = false;
                break;
            case 'time':
                this.dateFormat = 'H:i:S';
                this.datePipeFormat = this.enableSeconds ? 'HH:mm:ss' : 'HH:mm';
                this.enableTime = true;
                this.noCalendar = true;
                break;
            case 'year-month':
                this.dateFormat = 'Y-M';
                this.datePipeFormat = 'yyyy MMMM';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            default:
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
                this.noCalendar = false;
        }
    }
    constructor(datePipe, ref) {
        this.datePipe = datePipe;
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.#start();
    }
    #start() {
        if (this.bizyDatePicker && this.bizyDatePicker.bizyInputWrapper && this.bizyDatePicker.bizyInputWrapper.nativeElement) {
            const plugins = [];
            if (this.dateFormat === 'Y-M') {
                plugins.push(monthSelectPlugin({
                    shorthand: true
                }));
            }
            flatpickr(this.bizyDatePicker.bizyInputWrapper.nativeElement, {
                locale: Spanish,
                mode: this.mode,
                dateFormat: this.dateFormat,
                enableTime: this.enableTime,
                enableSeconds: this.enableSeconds,
                plugins,
                minDate: this.minDate,
                maxDate: this.maxDate,
                noCalendar: this.noCalendar,
                disableMobile: true,
                time_24hr: true,
                defaultDate: this.mode === 'single' ? new Date(this.dates[0]) : this.dates.map(_date => new Date(_date)),
                defaultHour: this.#getHour(this.time),
                defaultMinute: this.#getMinute(this.time),
                onChange: (selectedDates) => {
                    if (this.mode === 'single' && selectedDates[0]) {
                        const date = new Date(selectedDates[0]);
                        this.dateChange.emit(date.getTime());
                        this.onChange.emit(date.getTime());
                    }
                    else if (selectedDates[0] && selectedDates[1]) {
                        const from = new Date(selectedDates[0]);
                        const to = new Date(selectedDates[1]);
                        to.setHours(23, 59, 59, 999);
                        const range = { from: from.getTime(), to: to.getTime() };
                        this.rangeChange.emit(range);
                        this.onChange.emit(range);
                    }
                },
                onOpen: () => {
                    this.opened = true;
                    this.openedChange.emit(this.opened);
                    this.onOpen.emit(this.opened);
                },
                onClose: () => {
                    this.opened = false;
                    this.openedChange.emit(this.opened);
                    this.onOpen.emit(this.opened);
                }
            });
            this.started = true;
        }
    }
    setTouched(touched) {
        if (this.bizyDatePicker) {
            this.bizyDatePicker.setTouched(touched);
            this.ref.detectChanges();
        }
    }
    #getHour(time) {
        const date = new Date(time);
        return date.getHours();
    }
    #getMinute(time) {
        const date = new Date(time);
        return date.getMinutes();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, deps: [{ token: DatePipe }, { token: ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyDatePickerComponent, selector: "bizy-date-picker", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened", minDate: "minDate", maxDate: "maxDate", enableSeconds: "enableSeconds", date: "date", range: "range", type: "type" }, outputs: { dateChange: "dateChange", rangeChange: "rangeChange", onChange: "onChange", openedChange: "openedChange", onOpen: "onOpen", onSelect: "onSelect" }, viewQueries: [{ propertyName: "bizyDatePicker", first: true, predicate: ["bizyDatePicker"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\" *ngIf=\"touched\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-date-picker', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\" *ngIf=\"touched\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe, decorators: [{
                    type: Inject,
                    args: [DatePipe]
                }] }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Inject,
                    args: [ChangeDetectorRef]
                }] }]; }, propDecorators: { bizyDatePicker: [{
                type: ViewChild,
                args: ['bizyDatePicker']
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], customClass: [{
                type: Input
            }], opened: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], enableSeconds: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], rangeChange: [{
                type: Output
            }], onChange: [{
                type: Output
            }], openedChange: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], date: [{
                type: Input
            }], range: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SSxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxpQkFBaUIsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBUzNDLE1BQU0sT0FBTyx1QkFBdUI7SUFnR047SUFDUztJQWhHQSxjQUFjLENBQXFCO0lBQy9ELEVBQUUsR0FBVyxvQkFBb0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDakQsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFDeEIsT0FBTyxHQUFrQixJQUFJLENBQUM7SUFDOUIsT0FBTyxHQUFrQixJQUFJLENBQUM7SUFDOUIsYUFBYSxHQUFZLEtBQUssQ0FBQztJQUM5QixVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN4QyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQThCLENBQUM7SUFDN0QsUUFBUSxHQUFHLElBQUksWUFBWSxFQUF1QyxDQUFD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QkFBQyxpQkFBaUI7NENBaEdVLGNBQWM7c0JBQWxELFNBQVM7dUJBQUMsZ0JBQWdCO2dCQUNsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFlTSxJQUFJO3NCQUFoQixLQUFLO2dCQWNPLEtBQUs7c0JBQWpCLEtBQUs7Z0JBY08sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZmxhdHBpY2tyIGZyb20gXCJmbGF0cGlja3JcIjtcbmltcG9ydCBtb250aFNlbGVjdFBsdWdpbiBmcm9tICdmbGF0cGlja3IvZGlzdC9wbHVnaW5zL21vbnRoU2VsZWN0L2luZGV4LmpzJztcbmltcG9ydCB7IFNwYW5pc2ggfSBmcm9tIFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9lcy5qc1wiXG5pbXBvcnQgeyBCaXp5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9pbnB1dCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZS1waWNrZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlEYXRlUGlja2VyQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnYml6eURhdGVQaWNrZXInKSBwcml2YXRlIGJpenlEYXRlUGlja2VyOiBCaXp5SW5wdXRDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1kYXRlLXBpY2tlci0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbWluRGF0ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1heERhdGU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBlbmFibGVTZWNvbmRzOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSByYW5nZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e2Zyb206IG51bWJlciwgdG86IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyIHwge2Zyb206IG51bWJlciwgdG86IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIGRhdGVGb3JtYXQ6IHN0cmluZyA9ICdZLW0tZCc7XG4gIGRhdGVQaXBlRm9ybWF0OiBzdHJpbmcgPSAneXl5eS1NTS1kZCdcbiAgZW5hYmxlVGltZTogYm9vbGVhbiA9IGZhbHNlO1xuICBzdGFydGVkOiBib29sZWFuID0gZmFsc2U7XG4gIG5vQ2FsZW5kYXI6IGJvb2xlYW4gPSB0cnVlO1xuICBtb2RlOiAnc2luZ2xlJyB8ICdyYW5nZScgPSAnc2luZ2xlJztcbiAgZGF0ZXM6IEFycmF5PG51bWJlcj4gPSBbRGF0ZS5ub3coKV07XG4gIHRpbWU6IG51bWJlciA9IERhdGUubm93KCk7XG5cbiAgZ2V0IHRvdWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYml6eURhdGVQaWNrZXIgPyB0aGlzLmJpenlEYXRlUGlja2VyLnRvdWNoZWQgOiBmYWxzZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkYXRlKGRhdGU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZSA9ICdzaW5nbGUnO1xuICAgIHRoaXMuZGF0ZXMgPSBbZGF0ZV07XG4gICAgdGhpcy50aW1lID0gZGF0ZTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdGhpcy5kYXRlUGlwZUZvcm1hdCwgdW5kZWZpbmVkLCAnZXMtQVInKTtcbiAgICBpZiAoIXRoaXMuZW5hYmxlVGltZSB8fCAhdGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLiNzdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByYW5nZShyYW5nZToge2Zyb206IG51bWJlciwgdG86IG51bWJlcn0pIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlID0gJ3JhbmdlJztcbiAgICB0aGlzLmRhdGVzID0gW3JhbmdlLmZyb20sIHJhbmdlLnRvXTtcbiAgICB0aGlzLnRpbWUgPSByYW5nZS5mcm9tO1xuICAgIHRoaXMudmFsdWUgPSBgJHt0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShyYW5nZS5mcm9tLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpfSAtICR7dGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmFuZ2UudG8sIHRoaXMuZGF0ZVBpcGVGb3JtYXQsIHVuZGVmaW5lZCwgJ2VzLUFSJyl9YDsgXG4gICAgdGhpcy4jc3RhcnQoKVxuICB9XG5cbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIHNldCB0eXBlKHR5cGU6ICdkYXRlJyB8ICdkYXRlLXRpbWUnIHwgJ3RpbWUnIHwgJ3llYXItbW9udGgnKSB7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdCA9ICdZLW0tZCBIOmk6Uyc7XG4gICAgICAgIHRoaXMuZGF0ZVBpcGVGb3JtYXQgPSB0aGlzLmVuYWJsZVNlY29uZHMgPyAneXl5eS1NTS1kZCBISDptbTpzcycgOiAneXl5eS1NTS1kZCBISDptbSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnSDppOlMnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gdGhpcy5lbmFibGVTZWNvbmRzID8gJ0hIOm1tOnNzJyA6ICdISDptbSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneWVhci1tb250aCc6XG4gICAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktTSc7XG4gICAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5IE1NTU0nO1xuICAgICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRGF0ZVBpcGUpIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlLFxuICAgIEBJbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI3N0YXJ0KClcbiAgfVxuXG4gICNzdGFydCgpIHtcbiAgICBpZiAodGhpcy5iaXp5RGF0ZVBpY2tlciAmJiB0aGlzLmJpenlEYXRlUGlja2VyLmJpenlJbnB1dFdyYXBwZXIgJiYgdGhpcy5iaXp5RGF0ZVBpY2tlci5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHBsdWdpbnMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdCA9PT0gJ1ktTScpIHtcbiAgICAgICAgcGx1Z2lucy5wdXNoKG1vbnRoU2VsZWN0UGx1Z2luKHtcbiAgICAgICAgICBzaG9ydGhhbmQ6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBmbGF0cGlja3IodGhpcy5iaXp5RGF0ZVBpY2tlci5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgbG9jYWxlOiBTcGFuaXNoLFxuICAgICAgICBtb2RlOiB0aGlzLm1vZGUsXG4gICAgICAgIGRhdGVGb3JtYXQ6IHRoaXMuZGF0ZUZvcm1hdCxcbiAgICAgICAgZW5hYmxlVGltZTogdGhpcy5lbmFibGVUaW1lLFxuICAgICAgICBlbmFibGVTZWNvbmRzOiB0aGlzLmVuYWJsZVNlY29uZHMsXG4gICAgICAgIHBsdWdpbnMsXG4gICAgICAgIG1pbkRhdGU6IHRoaXMubWluRGF0ZSxcbiAgICAgICAgbWF4RGF0ZTogdGhpcy5tYXhEYXRlLFxuICAgICAgICBub0NhbGVuZGFyOiB0aGlzLm5vQ2FsZW5kYXIsXG4gICAgICAgIGRpc2FibGVNb2JpbGU6IHRydWUsXG4gICAgICAgIHRpbWVfMjRocjogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdERhdGU6IHRoaXMubW9kZSA9PT0gJ3NpbmdsZScgPyBuZXcgRGF0ZSh0aGlzLmRhdGVzWzBdKSA6IHRoaXMuZGF0ZXMubWFwKF9kYXRlID0+IG5ldyBEYXRlKF9kYXRlKSksXG4gICAgICAgIGRlZmF1bHRIb3VyOiB0aGlzLiNnZXRIb3VyKHRoaXMudGltZSksXG4gICAgICAgIGRlZmF1bHRNaW51dGU6IHRoaXMuI2dldE1pbnV0ZSh0aGlzLnRpbWUpLFxuICAgICAgICBvbkNoYW5nZTogKHNlbGVjdGVkRGF0ZXM6IEFycmF5PERhdGU+KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3NpbmdsZScgJiYgc2VsZWN0ZWREYXRlc1swXSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZXNbMF0pO1xuICAgICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkRGF0ZXNbMF0gJiYgc2VsZWN0ZWREYXRlc1sxXSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZXNbMF0pO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBuZXcgRGF0ZShzZWxlY3RlZERhdGVzWzFdKTtcbiAgICAgICAgICAgIHRvLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IHtmcm9tOiBmcm9tLmdldFRpbWUoKSwgdG86IHRvLmdldFRpbWUoKX07XG4gICAgICAgICAgICB0aGlzLnJhbmdlQ2hhbmdlLmVtaXQocmFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHJhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uT3BlbjogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvdWNoZWQodG91Y2hlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmJpenlEYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmJpenlEYXRlUGlja2VyLnNldFRvdWNoZWQodG91Y2hlZCk7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgI2dldEhvdXIodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZSk7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfVxuXG4gICNnZXRNaW51dGUodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZSk7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICB9XG59IiwiPGJpenktaW5wdXRcbiAgICAjYml6eURhdGVQaWNrZXJcbiAgICBbcmVhZG9ubHldPVwidHJ1ZVwiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAob25TZWxlY3QpPVwib25TZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgIFtpZF09XCJpZFwiXG4gICAgY2xhc3M9XCJiaXp5LWRhdGUtcGlja2VyIHt7Y3VzdG9tQ2xhc3N9fVwiPlxuXG4gICAgPHN2ZyBcbiAgICAgICAgc2xvdD1cInN1ZmZpeFwiXG4gICAgICAgIGlkPVwiYml6eS1kYXRlLXBpY2tlci1hcnJvd1wiXG4gICAgICAgIGNsYXNzPVwiYml6eS1kYXRlLXBpY2tlcl9fYXJyb3dcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktZGF0ZS1waWNrZXJfX2Fycm93LS1vcGVuZWQnOiBvcGVuZWR9XCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPlxuICAgICAgICA8cGF0aCBkPVwiTTEzNy40IDM3NC42YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDEyOC0xMjhjOS4yLTkuMiAxMS45LTIyLjkgNi45LTM0LjlzLTE2LjYtMTkuOC0yOS42LTE5LjhMMzIgMTkyYy0xMi45IDAtMjQuNiA3LjgtMjkuNiAxOS44cy0yLjIgMjUuNyA2LjkgMzQuOWwxMjggMTI4elwiLz5cbiAgICA8L3N2Zz5cblxuICAgIDxuZy1jb250YWluZXIgc2xvdD1cImhlYWRlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1oZWFkZXJdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLWNvbnRhaW5lciBzbG90PVwic3VmZml4XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyIHNsb3Q9XCJlcnJvclwiICpuZ0lmPVwidG91Y2hlZFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1lcnJvcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbjwvYml6eS1pbnB1dD5cbiJdfQ==