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
    noCalendar = true;
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
                this.noCalendar = false;
                break;
            case 'date-time':
                this.dateFormat = 'Y-m-d H:i';
                this.datePipeFormat = 'yyyy-MM-dd HH:mm';
                this.enableTime = true;
                this.noCalendar = false;
                break;
            case 'time':
                this.dateFormat = 'H:i';
                this.datePipeFormat = 'HH:mm';
                this.enableTime = true;
                this.noCalendar = true;
                break;
            case 'year':
                this.dateFormat = 'Y';
                this.datePipeFormat = 'yyyy';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            case 'month':
                this.dateFormat = 'm';
                this.datePipeFormat = 'MMMM';
                this.enableTime = false;
                this.noCalendar = false;
                break;
            case 'year-month':
                this.dateFormat = 'Y-M';
                this.datePipeFormat = 'yyyy-MMMM';
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
                noCalendar: this.noCalendar,
                time_24hr: true,
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyDatePickerComponent, selector: "bizy-date-picker", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened", date: "date", range: "range", type: "type" }, outputs: { dateChange: "dateChange", rangeChange: "rangeChange", onChange: "onChange", openedChange: "openedChange", onOpen: "onOpen", onSelect: "onSelect" }, viewQueries: [{ propertyName: "bizyDatePicker", first: true, predicate: ["bizyDatePicker"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i2.BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bizy-date-picker', changeDetection: ChangeDetectionStrategy.OnPush, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRW5ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVMzQyxNQUFNLE9BQU8sdUJBQXVCO0lBa0dOO0lBakdTLGNBQWMsQ0FBcUI7SUFDL0QsRUFBRSxHQUFXLG9CQUFvQixJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNqRCxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFdBQVcsR0FBVyxFQUFFLENBQUM7SUFDekIsTUFBTSxHQUFZLEtBQUssQ0FBQztJQUN2QixVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN4QyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQThCLENBQUM7SUFDN0QsUUFBUSxHQUFHLElBQUksWUFBWSxFQUF1QyxDQUFDO0lBQ25FLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzNDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQ3JDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUV0RCxVQUFVLEdBQVcsT0FBTyxD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RyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzQixDQUFDO3dHQTVKVSx1QkFBdUIsa0JBa0d4QixRQUFROzRGQWxHUCx1QkFBdUIsK2NDYnBDLDZoQ0FnQ0E7OzRGRG5CYSx1QkFBdUI7a0JBTm5DLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUdYLHVCQUF1QixDQUFDLE1BQU07OzBCQW9HNUMsTUFBTTsyQkFBQyxRQUFROzRDQWpHbUIsY0FBYztzQkFBbEQsU0FBUzt1QkFBQyxnQkFBZ0I7Z0JBQ2xCLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBVU0sSUFBSTtzQkFBaEIsS0FBSztnQkFZTyxLQUFLO3NCQUFqQixLQUFLO2dCQWNPLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZmxhdHBpY2tyIGZyb20gXCJmbGF0cGlja3JcIjtcbmltcG9ydCB7IFNwYW5pc2ggfSBmcm9tIFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9lcy5qc1wiXG5pbXBvcnQgeyBCaXp5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9pbnB1dCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZS1waWNrZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlEYXRlUGlja2VyQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnYml6eURhdGVQaWNrZXInKSBwcml2YXRlIGJpenlEYXRlUGlja2VyOiBCaXp5SW5wdXRDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1kYXRlLXBpY2tlci0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIGRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJhbmdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7ZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyfT4oKTtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXIgfCB7ZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyfT4oKTtcbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludGVyRXZlbnQ+KCk7XG5cbiAgZGF0ZUZvcm1hdDogc3RyaW5nID0gJ1ktbS1kJztcbiAgZGF0ZVBpcGVGb3JtYXQ6IHN0cmluZyA9ICd5eXl5LU1NLWRkJ1xuICBlbmFibGVUaW1lOiBib29sZWFuID0gZmFsc2U7XG4gIG5vQ2FsZW5kYXI6IGJvb2xlYW4gPSB0cnVlO1xuICBtb2RlOiAnc2luZ2xlJyB8ICdyYW5nZScgPSAnc2luZ2xlJztcbiAgZGF0ZXM6IEFycmF5PG51bWJlcj4gPSBbRGF0ZS5ub3coKV07XG4gIHRpbWU6IG51bWJlciA9IERhdGUubm93KCk7XG5cbiAgQElucHV0KCkgc2V0IGRhdGUoZGF0ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAndW5kZWZpbmVkJyB8fCBkYXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlID0gJ3NpbmdsZSc7XG4gICAgdGhpcy5kYXRlcyA9IFtkYXRlXTtcbiAgICB0aGlzLnRpbWUgPSBkYXRlO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpOyBcbiAgICB0aGlzLiNzdGFydCgpXG4gIH1cblxuICBASW5wdXQoKSBzZXQgcmFuZ2UocmFuZ2U6IHtmcm9tOiBudW1iZXIsIHRvOiBudW1iZXJ9KSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZSA9ICdyYW5nZSc7XG4gICAgdGhpcy5kYXRlcyA9IFtyYW5nZS5mcm9tLCByYW5nZS50b107XG4gICAgdGhpcy50aW1lID0gcmFuZ2UuZnJvbTtcbiAgICB0aGlzLnZhbHVlID0gYCR7dGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmFuZ2UuZnJvbSwgdGhpcy5kYXRlUGlwZUZvcm1hdCwgdW5kZWZpbmVkLCAnZXMtQVInKX0gLSAke3RoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHJhbmdlLnRvLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpfWA7IFxuICAgIHRoaXMuI3N0YXJ0KClcbiAgfVxuXG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBzZXQgdHlwZSh0eXBlOiAnZGF0ZScgfCAnZGF0ZS10aW1lJyB8ICd0aW1lJyB8ICd5ZWFyJyB8ICdtb250aCcgfCAneWVhci1tb250aCcpIHtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1tLWQnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ3l5eXktTU0tZGQnO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub0NhbGVuZGFyID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kIEg6aSc7XG4gICAgICAgIHRoaXMuZGF0ZVBpcGVGb3JtYXQgPSAneXl5eS1NTS1kZCBISDptbSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnSDppJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICdISDptbSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdCA9ICdZJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5JztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ20nO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ01NTU0nO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub0NhbGVuZGFyID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneWVhci1tb250aCc6XG4gICAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktTSc7XG4gICAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NTU0nO1xuICAgICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRGF0ZVBpcGUpIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jc3RhcnQoKVxuICB9XG5cbiAgI3N0YXJ0KCkge1xuICAgIGlmICh0aGlzLmJpenlEYXRlUGlja2VyICYmIHRoaXMuYml6eURhdGVQaWNrZXIuYml6eUlucHV0V3JhcHBlciAmJiB0aGlzLmJpenlEYXRlUGlja2VyLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudCkge1xuICAgICAgZmxhdHBpY2tyKHRoaXMuYml6eURhdGVQaWNrZXIuYml6eUlucHV0V3JhcHBlci5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgIGxvY2FsZTogU3BhbmlzaCxcbiAgICAgICAgbW9kZTogdGhpcy5tb2RlLFxuICAgICAgICBkYXRlRm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgIGVuYWJsZVRpbWU6IHRoaXMuZW5hYmxlVGltZSxcbiAgICAgICAgbm9DYWxlbmRhcjogdGhpcy5ub0NhbGVuZGFyLFxuICAgICAgICB0aW1lXzI0aHI6IHRydWUsXG4gICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmRhdGVzLm1hcChfZGF0ZSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKF9kYXRlKTtcbiAgICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgICAgICB9KSxcbiAgICAgICAgZGVmYXVsdEhvdXI6IHRoaXMuI2dldEhvdXIodGhpcy50aW1lKSxcbiAgICAgICAgZGVmYXVsdE1pbnV0ZTogdGhpcy4jZ2V0TWludXRlKHRoaXMudGltZSksXG4gICAgICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogQXJyYXk8RGF0ZT4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnc2luZ2xlJyAmJiBzZWxlY3RlZERhdGVzWzBdKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc2VsZWN0ZWREYXRlc1swXSk7XG4gICAgICAgICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWREYXRlc1swXSAmJiBzZWxlY3RlZERhdGVzWzFdKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbmV3IERhdGUoc2VsZWN0ZWREYXRlc1swXSk7XG4gICAgICAgICAgICBjb25zdCB0byA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZXNbMV0pO1xuICAgICAgICAgICAgdG8uc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlID0ge2Zyb206IGZyb20uZ2V0VGltZSgpLCB0bzogdG8uZ2V0VGltZSgpfTtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VDaGFuZ2UuZW1pdChyYW5nZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQocmFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodGhpcy5vcGVuZWQpO1xuICAgICAgICAgIHRoaXMub25PcGVuLmVtaXQodGhpcy5vcGVuZWQpO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgI2dldEhvdXIodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZSk7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfVxuXG4gICNnZXRNaW51dGUodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZSk7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICB9XG59IiwiPGJpenktaW5wdXRcbiAgICAjYml6eURhdGVQaWNrZXJcbiAgICBbcmVhZG9ubHldPVwidHJ1ZVwiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAob25TZWxlY3QpPVwib25TZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgIFtpZF09XCJpZFwiXG4gICAgY2xhc3M9XCJiaXp5LWRhdGUtcGlja2VyIHt7Y3VzdG9tQ2xhc3N9fVwiPlxuXG4gICAgPHN2ZyBcbiAgICAgICAgc2xvdD1cInN1ZmZpeFwiXG4gICAgICAgIGlkPVwiYml6eS1kYXRlLXBpY2tlci1hcnJvd1wiXG4gICAgICAgIGNsYXNzPVwiYml6eS1kYXRlLXBpY2tlcl9fYXJyb3dcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2JpenktZGF0ZS1waWNrZXJfX2Fycm93LS1vcGVuZWQnOiBvcGVuZWR9XCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPlxuICAgICAgICA8cGF0aCBkPVwiTTEzNy40IDM3NC42YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDEyOC0xMjhjOS4yLTkuMiAxMS45LTIyLjkgNi45LTM0LjlzLTE2LjYtMTkuOC0yOS42LTE5LjhMMzIgMTkyYy0xMi45IDAtMjQuNiA3LjgtMjkuNiAxOS44cy0yLjIgMjUuNyA2LjkgMzQuOWwxMjggMTI4elwiLz5cbiAgICA8L3N2Zz5cblxuICAgIDxuZy1jb250YWluZXIgc2xvdD1cImhlYWRlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1oZWFkZXJdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLWNvbnRhaW5lciBzbG90PVwic3VmZml4XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyIHNsb3Q9XCJlcnJvclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1lcnJvcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbjwvYml6eS1pbnB1dD5cbiJdfQ==