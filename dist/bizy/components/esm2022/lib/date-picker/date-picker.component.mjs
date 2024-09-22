import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import flatpickr from "flatpickr";
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
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
    started = false;
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
                this.datePipeFormat = 'yyyy-MM-dd HH:mm:ss';
                this.enableTime = true;
                this.noCalendar = false;
                break;
            case 'time':
                this.dateFormat = 'H:i:S';
                this.datePipeFormat = 'HH:mm:ss';
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
    constructor(datePipe) {
        this.datePipe = datePipe;
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
                enableSeconds: this.enableTime,
                plugins,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxpQkFBaUIsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBUzNDLE1BQU0sT0FBTyx1QkFBdUI7SUF5Rk47SUF4RlMsY0FBYyxDQUFxQjtJQUMvRCxFQUFFLEdBQVcsb0JBQW9CLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ2pELFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3ZCLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQ3hDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBOEIsQ0FBQztJQUM3RCxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXVDLENBQUM7SUFDbkUsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFDM0MsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFDckMsUUFBUSxHQUFHLElBQUksWUFB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QUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUM7d0dBN0pVLHVCQUF1QixrQkF5RnhCLFFBQVE7NEZBekZQLHVCQUF1QiwrY0NkcEMsNmhDQWdDQTs7NEZEbEJhLHVCQUF1QjtrQkFObkMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTTs7MEJBMkY1QyxNQUFNOzJCQUFDLFFBQVE7NENBeEZtQixjQUFjO3NCQUFsRCxTQUFTO3VCQUFDLGdCQUFnQjtnQkFDbEIsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFXTSxJQUFJO3NCQUFoQixLQUFLO2dCQWNPLEtBQUs7c0JBQWpCLEtBQUs7Z0JBY08sSUFBSTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBmbGF0cGlja3IgZnJvbSBcImZsYXRwaWNrclwiO1xuaW1wb3J0IG1vbnRoU2VsZWN0UGx1Z2luIGZyb20gJ2ZsYXRwaWNrci9kaXN0L3BsdWdpbnMvbW9udGhTZWxlY3QvaW5kZXguanMnO1xuaW1wb3J0IHsgU3BhbmlzaCB9IGZyb20gXCJmbGF0cGlja3IvZGlzdC9sMTBuL2VzLmpzXCJcbmltcG9ydCB7IEJpenlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL2lucHV0JztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiaXp5LWRhdGUtcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtcGlja2VyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlLXBpY2tlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQml6eURhdGVQaWNrZXJDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdiaXp5RGF0ZVBpY2tlcicpIHByaXZhdGUgYml6eURhdGVQaWNrZXI6IEJpenlJbnB1dENvbXBvbmVudDtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBiaXp5LWRhdGUtcGlja2VyLSR7TWF0aC5yYW5kb20oKX1gO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgZGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmFuZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtmcm9tOiBudW1iZXIsIHRvOiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlciB8IHtmcm9tOiBudW1iZXIsIHRvOiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBkYXRlRm9ybWF0OiBzdHJpbmcgPSAnWS1tLWQnO1xuICBkYXRlUGlwZUZvcm1hdDogc3RyaW5nID0gJ3l5eXktTU0tZGQnXG4gIGVuYWJsZVRpbWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBub0NhbGVuZGFyOiBib29sZWFuID0gdHJ1ZTtcbiAgbW9kZTogJ3NpbmdsZScgfCAncmFuZ2UnID0gJ3NpbmdsZSc7XG4gIGRhdGVzOiBBcnJheTxudW1iZXI+ID0gW0RhdGUubm93KCldO1xuICB0aW1lOiBudW1iZXIgPSBEYXRlLm5vdygpO1xuXG4gIEBJbnB1dCgpIHNldCBkYXRlKGRhdGU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZSA9ICdzaW5nbGUnO1xuICAgIHRoaXMuZGF0ZXMgPSBbZGF0ZV07XG4gICAgdGhpcy50aW1lID0gZGF0ZTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdGhpcy5kYXRlUGlwZUZvcm1hdCwgdW5kZWZpbmVkLCAnZXMtQVInKTtcbiAgICBpZiAoIXRoaXMuZW5hYmxlVGltZSB8fCAhdGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLiNzdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByYW5nZShyYW5nZToge2Zyb206IG51bWJlciwgdG86IG51bWJlcn0pIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlID0gJ3JhbmdlJztcbiAgICB0aGlzLmRhdGVzID0gW3JhbmdlLmZyb20sIHJhbmdlLnRvXTtcbiAgICB0aGlzLnRpbWUgPSByYW5nZS5mcm9tO1xuICAgIHRoaXMudmFsdWUgPSBgJHt0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShyYW5nZS5mcm9tLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpfSAtICR7dGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmFuZ2UudG8sIHRoaXMuZGF0ZVBpcGVGb3JtYXQsIHVuZGVmaW5lZCwgJ2VzLUFSJyl9YDsgXG4gICAgdGhpcy4jc3RhcnQoKVxuICB9XG5cbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIHNldCB0eXBlKHR5cGU6ICdkYXRlJyB8ICdkYXRlLXRpbWUnIHwgJ3RpbWUnIHwgJ3llYXItbW9udGgnKSB7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdCA9ICdZLW0tZCBIOmk6Uyc7XG4gICAgICAgIHRoaXMuZGF0ZVBpcGVGb3JtYXQgPSAneXl5eS1NTS1kZCBISDptbTpzcyc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnSDppOlMnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ0hIOm1tOnNzJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub0NhbGVuZGFyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd5ZWFyLW1vbnRoJzpcbiAgICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1NJztcbiAgICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ3l5eXkgTU1NTSc7XG4gICAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5ub0NhbGVuZGFyID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnWS1tLWQnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gJ3l5eXktTU0tZGQnO1xuICAgICAgICB0aGlzLmVuYWJsZVRpbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub0NhbGVuZGFyID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChEYXRlUGlwZSkgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGVcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLiNzdGFydCgpXG4gIH1cblxuICAjc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuYml6eURhdGVQaWNrZXIgJiYgdGhpcy5iaXp5RGF0ZVBpY2tlci5iaXp5SW5wdXRXcmFwcGVyICYmIHRoaXMuYml6eURhdGVQaWNrZXIuYml6eUlucHV0V3JhcHBlci5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBjb25zdCBwbHVnaW5zID0gW107XG5cbiAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXQgPT09ICdZLU0nKSB7XG4gICAgICAgIHBsdWdpbnMucHVzaChtb250aFNlbGVjdFBsdWdpbih7XG4gICAgICAgICAgc2hvcnRoYW5kOiB0cnVlXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZmxhdHBpY2tyKHRoaXMuYml6eURhdGVQaWNrZXIuYml6eUlucHV0V3JhcHBlci5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgIGxvY2FsZTogU3BhbmlzaCxcbiAgICAgICAgbW9kZTogdGhpcy5tb2RlLFxuICAgICAgICBkYXRlRm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgIGVuYWJsZVRpbWU6IHRoaXMuZW5hYmxlVGltZSxcbiAgICAgICAgZW5hYmxlU2Vjb25kczogdGhpcy5lbmFibGVUaW1lLFxuICAgICAgICBwbHVnaW5zLFxuICAgICAgICBub0NhbGVuZGFyOiB0aGlzLm5vQ2FsZW5kYXIsXG4gICAgICAgIGRpc2FibGVNb2JpbGU6IHRydWUsXG4gICAgICAgIHRpbWVfMjRocjogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdERhdGU6IHRoaXMubW9kZSA9PT0gJ3NpbmdsZScgPyBuZXcgRGF0ZSh0aGlzLmRhdGVzWzBdKSA6IHRoaXMuZGF0ZXMubWFwKF9kYXRlID0+IG5ldyBEYXRlKF9kYXRlKSksXG4gICAgICAgIGRlZmF1bHRIb3VyOiB0aGlzLiNnZXRIb3VyKHRoaXMudGltZSksXG4gICAgICAgIGRlZmF1bHRNaW51dGU6IHRoaXMuI2dldE1pbnV0ZSh0aGlzLnRpbWUpLFxuICAgICAgICBvbkNoYW5nZTogKHNlbGVjdGVkRGF0ZXM6IEFycmF5PERhdGU+KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3NpbmdsZScgJiYgc2VsZWN0ZWREYXRlc1swXSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZXNbMF0pO1xuICAgICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkRGF0ZXNbMF0gJiYgc2VsZWN0ZWREYXRlc1sxXSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZXNbMF0pO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBuZXcgRGF0ZShzZWxlY3RlZERhdGVzWzFdKTtcbiAgICAgICAgICAgIHRvLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IHtmcm9tOiBmcm9tLmdldFRpbWUoKSwgdG86IHRvLmdldFRpbWUoKX07XG4gICAgICAgICAgICB0aGlzLnJhbmdlQ2hhbmdlLmVtaXQocmFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHJhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uT3BlbjogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gICNnZXRIb3VyKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpO1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH1cblxuICAjZ2V0TWludXRlKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpO1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfVxufSIsIjxiaXp5LWlucHV0XG4gICAgI2JpenlEYXRlUGlja2VyXG4gICAgW3JlYWRvbmx5XT1cInRydWVcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgKG9uU2VsZWN0KT1cIm9uU2VsZWN0LmVtaXQoJGV2ZW50KVwiXG4gICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIGNsYXNzPVwiYml6eS1kYXRlLXBpY2tlciB7e2N1c3RvbUNsYXNzfX1cIj5cblxuICAgIDxzdmcgXG4gICAgICAgIHNsb3Q9XCJzdWZmaXhcIlxuICAgICAgICBpZD1cImJpenktZGF0ZS1waWNrZXItYXJyb3dcIlxuICAgICAgICBjbGFzcz1cImJpenktZGF0ZS1waWNrZXJfX2Fycm93XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydiaXp5LWRhdGUtcGlja2VyX19hcnJvdy0tb3BlbmVkJzogb3BlbmVkfVwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB2aWV3Qm94PVwiMCAwIDMyMCA1MTJcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xMzcuNCAzNzQuNmMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMGwxMjgtMTI4YzkuMi05LjIgMTEuOS0yMi45IDYuOS0zNC45cy0xNi42LTE5LjgtMjkuNi0xOS44TDMyIDE5MmMtMTIuOSAwLTI0LjYgNy44LTI5LjYgMTkuOHMtMi4yIDI1LjcgNi45IDM0LjlsMTI4IDEyOHpcIi8+XG4gICAgPC9zdmc+XG5cbiAgICA8bmctY29udGFpbmVyIHNsb3Q9XCJoZWFkZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9aGVhZGVyXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy1jb250YWluZXIgc2xvdD1cInN1ZmZpeFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1wcmVmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLWNvbnRhaW5lciBzbG90PVwiZXJyb3JcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9ZXJyb3JdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuXG48L2JpenktaW5wdXQ+XG4iXX0=