import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../input/input.component";
export class BizyDatePickerComponent {
    datePipe;
    bizyDatePicker;
    id = `bizy-date-picker-${Math.random()}`;
    disabled = false;
    customClass = '';
    opened = false;
    dateChange = new EventEmitter();
    rangeChange = new EventEmitter();
    onChange = new EventEmitter();
    openedChange = new EventEmitter();
    onOpen = new EventEmitter();
    onSelect = new EventEmitter();
    dateFormat = 'Y-m-d';
    datePipeFormat = 'yyyy-MM-dd';
    enableTime = false;
    mode = 'single';
    dates = [Date.now()];
    time = Date.now();
    set date(date) {
        if (typeof date === 'undefined' || date === null) {
            return;
        }
        this.mode = 'single';
        this.dates = [date];
        this.time = date;
        this.value = this.datePipe.transform(date, this.datePipeFormat, undefined, 'es-AR');
        this.#start();
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
                break;
            case 'date-time':
                this.dateFormat = 'Y-m-d H:i';
                this.datePipeFormat = 'yyyy-MM-dd HH:mm';
                this.enableTime = true;
                break;
            case 'time':
                this.dateFormat = 'H:i';
                this.datePipeFormat = 'HH:mm';
                this.enableTime = true;
                break;
            case 'year':
                this.dateFormat = 'Y';
                this.datePipeFormat = 'yyyy';
                this.enableTime = false;
                break;
            case 'month':
                this.dateFormat = 'm';
                this.datePipeFormat = 'MMMM';
                this.enableTime = false;
                break;
            case 'year-month':
                this.dateFormat = 'Y-M';
                this.datePipeFormat = 'yyyy-MMMM';
                this.enableTime = false;
                break;
            default:
                this.dateFormat = 'Y-m-d';
                this.datePipeFormat = 'yyyy-MM-dd';
                this.enableTime = false;
        }
    }
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    ngAfterViewInit() {
        this.#start();
    }
    #start() {
        if (this.bizyDatePicker && this.bizyDatePicker.bizyInputWrapper && this.bizyDatePicker.bizyInputWrapper.nativeElement) {
            flatpickr(this.bizyDatePicker.bizyInputWrapper.nativeElement, {
                locale: Spanish,
                mode: this.mode,
                dateFormat: this.dateFormat,
                enableTime: this.enableTime,
                defaultDate: this.dates.map(_date => {
                    const date = new Date(_date);
                    return date.toISOString();
                }),
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, deps: [{ token: DatePipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyDatePickerComponent, selector: "bizy-date-picker", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened", date: "date", range: "range", type: "type" }, outputs: { dateChange: "dateChange", rangeChange: "rangeChange", onChange: "onChange", openedChange: "openedChange", onOpen: "onOpen", onSelect: "onSelect" }, viewQueries: [{ propertyName: "bizyDatePicker", first: true, predicate: ["bizyDatePicker"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);max-width:var(--bizy-input-max-width)}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i2.BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "debounceTime", "rows", "disabled", "readonly", "autofocus", "value"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-date-picker', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);max-width:var(--bizy-input-max-width)}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe, decorators: [{
                    type: Inject,
                    args: [DatePipe]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRW5ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVMzQyxNQUFNLE9BQU8sdUJBQXVCO0lBMEZOO0lBekZTLGNBQWMsQ0FBcUI7SUFDL0QsRUFBRSxHQUFXLG9CQUFvQixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNqRCxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsTUFBTSxHQUFZLEtBQUssQ0FBQztJQUN2QixVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN4QyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQThCLENBQUM7SUFDN0QsUUFBUSxHQUFHLElBQUksWUFBWSxFQUF1QyxDQUFDO0lBQ25FLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzNDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQ3JDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxVQUFVLEdBQVcsT0FBTyxD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QkFBakIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQVNNLElBQUk7c0JBQWhCLEtBQUs7Z0JBWU8sS0FBSztzQkFBakIsS0FBSztnQkFjTyxJQUFJO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGZsYXRwaWNrciBmcm9tIFwiZmxhdHBpY2tyXCI7XG5pbXBvcnQgeyBTcGFuaXNoIH0gZnJvbSBcImZsYXRwaWNrci9kaXN0L2wxMG4vZXMuanNcIlxuaW1wb3J0IHsgQml6eUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vaW5wdXQnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpenktZGF0ZS1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1waWNrZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RhdGUtcGlja2VyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCaXp5RGF0ZVBpY2tlckNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ2JpenlEYXRlUGlja2VyJykgcHJpdmF0ZSBiaXp5RGF0ZVBpY2tlcjogQml6eUlucHV0Q29tcG9uZW50O1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYGJpenktZGF0ZS1waWNrZXItJHtNYXRoLnJhbmRvbSgpfWA7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSByYW5nZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e2Zyb206IG51bWJlciwgdG86IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyIHwge2Zyb206IG51bWJlciwgdG86IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnRlckV2ZW50PigpO1xuXG4gIGRhdGVGb3JtYXQ6IHN0cmluZyA9ICdZLW0tZCc7XG4gIGRhdGVQaXBlRm9ybWF0OiBzdHJpbmcgPSAneXl5eS1NTS1kZCdcbiAgZW5hYmxlVGltZTogYm9vbGVhbiA9IGZhbHNlO1xuICBtb2RlOiAnc2luZ2xlJyB8ICdyYW5nZScgPSAnc2luZ2xlJztcbiAgZGF0ZXM6IEFycmF5PG51bWJlcj4gPSBbRGF0ZS5ub3coKV07XG4gIHRpbWU6IG51bWJlciA9IERhdGUubm93KCk7XG5cbiAgQElucHV0KCkgc2V0IGRhdGUoZGF0ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAndW5kZWZpbmVkJyB8fCBkYXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlID0gJ3NpbmdsZSc7XG4gICAgdGhpcy5kYXRlcyA9IFtkYXRlXTtcbiAgICB0aGlzLnRpbWUgPSBkYXRlO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpOyBcbiAgICB0aGlzLiNzdGFydCgpXG4gIH1cblxuICBASW5wdXQoKSBzZXQgcmFuZ2UocmFuZ2U6IHtmcm9tOiBudW1iZXIsIHRvOiBudW1iZXJ9KSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZSA9ICdyYW5nZSc7XG4gICAgdGhpcy5kYXRlcyA9IFtyYW5nZS5mcm9tLCByYW5nZS50b107XG4gICAgdGhpcy50aW1lID0gcmFuZ2UuZnJvbTtcbiAgICB0aGlzLnZhbHVlID0gYCR7dGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmFuZ2UuZnJvbSwgdGhpcy5kYXRlUGlwZUZvcm1hdCwgdW5kZWZpbmVkLCAnZXMtQVInKX0gLSAke3RoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHJhbmdlLnRvLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpfWA7IFxuICAgIHRoaXMuI3N0YXJ0KClcbiAgfVxuXG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBzZXQgdHlwZSh0eXBlOiAnZGF0ZScgfCAnZGF0ZS10aW1lJyB8ICd0aW1lJyB8ICd5ZWFyJyB8ICdtb250aCcgfCAneWVhci1tb250aCcpIHtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1tLWQnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ3l5eXktTU0tZGQnO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1tLWQgSDppJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkIEhIOm1tJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ0g6aSc7XG4gICAgICAgIHRoaXMuZGF0ZVBpcGVGb3JtYXQgPSAnSEg6bW0nO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWSc7XG4gICAgICAgIHRoaXMuZGF0ZVBpcGVGb3JtYXQgPSAneXl5eSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ20nO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ01NTU0nO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd5ZWFyLW1vbnRoJzpcbiAgICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1NJztcbiAgICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ3l5eXktTU1NTSc7XG4gICAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1tLWQnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ3l5eXktTU0tZGQnO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERhdGVQaXBlKSBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuI3N0YXJ0KClcbiAgfVxuXG4gICNzdGFydCgpIHtcbiAgICBpZiAodGhpcy5iaXp5RGF0ZVBpY2tlciAmJiB0aGlzLmJpenlEYXRlUGlja2VyLmJpenlJbnB1dFdyYXBwZXIgJiYgdGhpcy5iaXp5RGF0ZVBpY2tlci5iaXp5SW5wdXRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGZsYXRwaWNrcih0aGlzLmJpenlEYXRlUGlja2VyLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudCwge1xuICAgICAgICBsb2NhbGU6IFNwYW5pc2gsXG4gICAgICAgIG1vZGU6IHRoaXMubW9kZSxcbiAgICAgICAgZGF0ZUZvcm1hdDogdGhpcy5kYXRlRm9ybWF0LFxuICAgICAgICBlbmFibGVUaW1lOiB0aGlzLmVuYWJsZVRpbWUsXG4gICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmRhdGVzLm1hcChfZGF0ZSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKF9kYXRlKTtcbiAgICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgICAgICB9KSxcbiAgICAgICAgZGVmYXVsdEhvdXI6IHRoaXMuI2dldEhvdXIodGhpcy50aW1lKSxcbiAgICAgICAgZGVmYXVsdE1pbnV0ZTogdGhpcy4jZ2V0TWludXRlKHRoaXMudGltZSksXG4gICAgICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogQXJyYXk8RGF0ZT4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnc2luZ2xlJyAmJiBzZWxlY3RlZERhdGVzWzBdKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc2VsZWN0ZWREYXRlc1swXSk7XG4gICAgICAgICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWREYXRlc1swXSAmJiBzZWxlY3RlZERhdGVzWzFdKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbmV3IERhdGUoc2VsZWN0ZWREYXRlc1swXSk7XG4gICAgICAgICAgICBjb25zdCB0byA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZXNbMV0pO1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSB7ZnJvbTogZnJvbS5nZXRUaW1lKCksIHRvOiB0by5nZXRUaW1lKCl9O1xuICAgICAgICAgICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChyYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbk9wZW46ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodGhpcy5vcGVuZWQpO1xuICAgICAgICAgIHRoaXMub25PcGVuLmVtaXQodGhpcy5vcGVuZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAjZ2V0SG91cih0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9XG5cbiAgI2dldE1pbnV0ZSh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH1cbn0iLCI8Yml6eS1pbnB1dFxuICAgICNiaXp5RGF0ZVBpY2tlclxuICAgIFtyZWFkb25seV09XCJ0cnVlXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIChvblNlbGVjdCk9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgW2lkXT1cImlkXCJcbiAgICBjbGFzcz1cImJpenktZGF0ZS1waWNrZXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8c3ZnIFxuICAgICAgICBzbG90PVwic3VmZml4XCJcbiAgICAgICAgaWQ9XCJiaXp5LWRhdGUtcGlja2VyLWFycm93XCJcbiAgICAgICAgY2xhc3M9XCJiaXp5LWRhdGUtcGlja2VyX19hcnJvd1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS1kYXRlLXBpY2tlcl9fYXJyb3ctLW9wZW5lZCc6IG9wZW5lZH1cIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCAzMjAgNTEyXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTM3LjQgMzc0LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBsMTI4LTEyOGM5LjItOS4yIDExLjktMjIuOSA2LjktMzQuOXMtMTYuNi0xOS44LTI5LjYtMTkuOEwzMiAxOTJjLTEyLjkgMC0yNC42IDcuOC0yOS42IDE5LjhzLTIuMiAyNS43IDYuOSAzNC45bDEyOCAxMjh6XCIvPlxuICAgIDwvc3ZnPlxuXG4gICAgPG5nLWNvbnRhaW5lciBzbG90PVwiaGVhZGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyIHNsb3Q9XCJzdWZmaXhcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9cHJlZml4XVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy1jb250YWluZXIgc2xvdD1cImVycm9yXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWVycm9yXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuPC9iaXp5LWlucHV0PlxuIl19