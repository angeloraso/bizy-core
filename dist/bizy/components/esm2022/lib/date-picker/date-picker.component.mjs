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
                enableSeconds: this.enableSeconds,
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: BizyDatePickerComponent, selector: "bizy-date-picker", inputs: { id: "id", disabled: "disabled", customClass: "customClass", opened: "opened", enableSeconds: "enableSeconds", date: "date", range: "range", type: "type" }, outputs: { dateChange: "dateChange", rangeChange: "rangeChange", onChange: "onChange", openedChange: "openedChange", onOpen: "onOpen", onSelect: "onSelect" }, viewQueries: [{ propertyName: "bizyDatePicker", first: true, predicate: ["bizyDatePicker"], descendants: true }], ngImport: i0, template: "<bizy-input\n    #bizyDatePicker\n    [readonly]=\"true\"\n    [disabled]=\"disabled\"\n    (onSelect)=\"onSelect.emit($event)\"\n    [value]=\"value\"\n    [id]=\"id\"\n    class=\"bizy-date-picker {{customClass}}\">\n\n    <svg \n        slot=\"suffix\"\n        id=\"bizy-date-picker-arrow\"\n        class=\"bizy-date-picker__arrow\"\n        [ngClass]=\"{'bizy-date-picker__arrow--opened': opened}\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        viewBox=\"0 0 320 512\">\n        <path d=\"M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z\"/>\n    </svg>\n\n    <ng-container slot=\"header\">\n        <ng-content select=\"[slot=header]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"suffix\">\n        <ng-content select=\"[slot=prefix]\"></ng-content>\n    </ng-container>\n\n    <ng-container slot=\"error\">\n        <ng-content select=\"[slot=error]\"></ng-content>\n    </ng-container>\n\n</bizy-input>\n", styles: [":host{font-size:1rem;width:var(--bizy-input-width);min-width:var(--bizy-input-min-width);max-width:var(--bizy-input-max-width);display:flex}.bizy-date-picker{--bizy-input-cursor: pointer}.bizy-date-picker__arrow{height:1rem;pointer-events:none;display:block;transition:transform .2s ease;fill:var(--bizy-input-color)}.bizy-date-picker__arrow--opened{transform:rotate(180deg)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i2.BizyInputComponent, selector: "bizy-input", inputs: ["id", "name", "type", "customClass", "placeholder", "debounceTime", "rows", "disabled", "readonly", "value", "autofocus"], outputs: ["valueChange", "onChange", "onEnter", "onBackspace", "onSelect", "onBlur", "onFocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc3JjL2xpYi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxpQkFBaUIsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBUzNDLE1BQU0sT0FBTyx1QkFBdUI7SUEwRk47SUF6RlMsY0FBYyxDQUFxQjtJQUMvRCxFQUFFLEdBQVcsb0JBQW9CLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ2pELFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDMUIsV0FBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixNQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3hCLGFBQWEsR0FBWSxLQUFLLENBQUM7SUFDOUIsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFDeEMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUE4QixDQUFDO0lBQzdELFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBdUMsQ0FBQztJQUNuRSxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUMzQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FB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QUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVk7UUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0IsQ0FBQzt3R0E5SlUsdUJBQXVCLGtCQTBGeEIsUUFBUTs0RkExRlAsdUJBQXVCLCtlQ2RwQyw2aENBZ0NBOzs0RkRsQmEsdUJBQXVCO2tCQU5uQyxTQUFTOytCQUNFLGtCQUFrQixtQkFHWCx1QkFBdUIsQ0FBQyxNQUFNOzswQkE0RjVDLE1BQU07MkJBQUMsUUFBUTs0Q0F6Rm1CLGNBQWM7c0JBQWxELFNBQVM7dUJBQUMsZ0JBQWdCO2dCQUNsQixFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNJLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBV00sSUFBSTtzQkFBaEIsS0FBSztnQkFjTyxLQUFLO3NCQUFqQixLQUFLO2dCQWNPLElBQUk7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZmxhdHBpY2tyIGZyb20gXCJmbGF0cGlja3JcIjtcbmltcG9ydCBtb250aFNlbGVjdFBsdWdpbiBmcm9tICdmbGF0cGlja3IvZGlzdC9wbHVnaW5zL21vbnRoU2VsZWN0L2luZGV4LmpzJztcbmltcG9ydCB7IFNwYW5pc2ggfSBmcm9tIFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9lcy5qc1wiXG5pbXBvcnQgeyBCaXp5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9pbnB1dCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml6eS1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZS1waWNrZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJpenlEYXRlUGlja2VyQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnYml6eURhdGVQaWNrZXInKSBwcml2YXRlIGJpenlEYXRlUGlja2VyOiBCaXp5SW5wdXRDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgYml6eS1kYXRlLXBpY2tlci0ke01hdGgucmFuZG9tKCl9YDtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlU2Vjb25kczogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgZGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmFuZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtmcm9tOiBudW1iZXIsIHRvOiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlciB8IHtmcm9tOiBudW1iZXIsIHRvOiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50ZXJFdmVudD4oKTtcblxuICBkYXRlRm9ybWF0OiBzdHJpbmcgPSAnWS1tLWQnO1xuICBkYXRlUGlwZUZvcm1hdDogc3RyaW5nID0gJ3l5eXktTU0tZGQnXG4gIGVuYWJsZVRpbWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBub0NhbGVuZGFyOiBib29sZWFuID0gdHJ1ZTtcbiAgbW9kZTogJ3NpbmdsZScgfCAncmFuZ2UnID0gJ3NpbmdsZSc7XG4gIGRhdGVzOiBBcnJheTxudW1iZXI+ID0gW0RhdGUubm93KCldO1xuICB0aW1lOiBudW1iZXIgPSBEYXRlLm5vdygpO1xuXG4gIEBJbnB1dCgpIHNldCBkYXRlKGRhdGU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZSA9ICdzaW5nbGUnO1xuICAgIHRoaXMuZGF0ZXMgPSBbZGF0ZV07XG4gICAgdGhpcy50aW1lID0gZGF0ZTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdGhpcy5kYXRlUGlwZUZvcm1hdCwgdW5kZWZpbmVkLCAnZXMtQVInKTtcbiAgICBpZiAoIXRoaXMuZW5hYmxlVGltZSB8fCAhdGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLiNzdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByYW5nZShyYW5nZToge2Zyb206IG51bWJlciwgdG86IG51bWJlcn0pIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlID0gJ3JhbmdlJztcbiAgICB0aGlzLmRhdGVzID0gW3JhbmdlLmZyb20sIHJhbmdlLnRvXTtcbiAgICB0aGlzLnRpbWUgPSByYW5nZS5mcm9tO1xuICAgIHRoaXMudmFsdWUgPSBgJHt0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShyYW5nZS5mcm9tLCB0aGlzLmRhdGVQaXBlRm9ybWF0LCB1bmRlZmluZWQsICdlcy1BUicpfSAtICR7dGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmFuZ2UudG8sIHRoaXMuZGF0ZVBpcGVGb3JtYXQsIHVuZGVmaW5lZCwgJ2VzLUFSJyl9YDsgXG4gICAgdGhpcy4jc3RhcnQoKVxuICB9XG5cbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIHNldCB0eXBlKHR5cGU6ICdkYXRlJyB8ICdkYXRlLXRpbWUnIHwgJ3RpbWUnIHwgJ3llYXItbW9udGgnKSB7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdCA9ICdZLW0tZCBIOmk6Uyc7XG4gICAgICAgIHRoaXMuZGF0ZVBpcGVGb3JtYXQgPSB0aGlzLmVuYWJsZVNlY29uZHMgPyAneXl5eS1NTS1kZCBISDptbTpzcycgOiAneXl5eS1NTS1kZCBISDptbSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSAnSDppOlMnO1xuICAgICAgICB0aGlzLmRhdGVQaXBlRm9ybWF0ID0gdGhpcy5lbmFibGVTZWNvbmRzID8gJ0hIOm1tOnNzJyA6ICdISDptbSc7XG4gICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneWVhci1tb250aCc6XG4gICAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktTSc7XG4gICAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5IE1NTU0nO1xuICAgICAgICAgIHRoaXMuZW5hYmxlVGltZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ID0gJ1ktbS1kJztcbiAgICAgICAgdGhpcy5kYXRlUGlwZUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcbiAgICAgICAgdGhpcy5lbmFibGVUaW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9DYWxlbmRhciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRGF0ZVBpcGUpIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4jc3RhcnQoKVxuICB9XG5cbiAgI3N0YXJ0KCkge1xuICAgIGlmICh0aGlzLmJpenlEYXRlUGlja2VyICYmIHRoaXMuYml6eURhdGVQaWNrZXIuYml6eUlucHV0V3JhcHBlciAmJiB0aGlzLmJpenlEYXRlUGlja2VyLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudCkge1xuICAgICAgY29uc3QgcGx1Z2lucyA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5kYXRlRm9ybWF0ID09PSAnWS1NJykge1xuICAgICAgICBwbHVnaW5zLnB1c2gobW9udGhTZWxlY3RQbHVnaW4oe1xuICAgICAgICAgIHNob3J0aGFuZDogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGZsYXRwaWNrcih0aGlzLmJpenlEYXRlUGlja2VyLmJpenlJbnB1dFdyYXBwZXIubmF0aXZlRWxlbWVudCwge1xuICAgICAgICBsb2NhbGU6IFNwYW5pc2gsXG4gICAgICAgIG1vZGU6IHRoaXMubW9kZSxcbiAgICAgICAgZGF0ZUZvcm1hdDogdGhpcy5kYXRlRm9ybWF0LFxuICAgICAgICBlbmFibGVUaW1lOiB0aGlzLmVuYWJsZVRpbWUsXG4gICAgICAgIGVuYWJsZVNlY29uZHM6IHRoaXMuZW5hYmxlU2Vjb25kcyxcbiAgICAgICAgcGx1Z2lucyxcbiAgICAgICAgbm9DYWxlbmRhcjogdGhpcy5ub0NhbGVuZGFyLFxuICAgICAgICBkaXNhYmxlTW9iaWxlOiB0cnVlLFxuICAgICAgICB0aW1lXzI0aHI6IHRydWUsXG4gICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLm1vZGUgPT09ICdzaW5nbGUnID8gbmV3IERhdGUodGhpcy5kYXRlc1swXSkgOiB0aGlzLmRhdGVzLm1hcChfZGF0ZSA9PiBuZXcgRGF0ZShfZGF0ZSkpLFxuICAgICAgICBkZWZhdWx0SG91cjogdGhpcy4jZ2V0SG91cih0aGlzLnRpbWUpLFxuICAgICAgICBkZWZhdWx0TWludXRlOiB0aGlzLiNnZXRNaW51dGUodGhpcy50aW1lKSxcbiAgICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBBcnJheTxEYXRlPikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdzaW5nbGUnICYmIHNlbGVjdGVkRGF0ZXNbMF0pIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzZWxlY3RlZERhdGVzWzBdKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZERhdGVzWzBdICYmIHNlbGVjdGVkRGF0ZXNbMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBuZXcgRGF0ZShzZWxlY3RlZERhdGVzWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbmV3IERhdGUoc2VsZWN0ZWREYXRlc1sxXSk7XG4gICAgICAgICAgICB0by5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSB7ZnJvbTogZnJvbS5nZXRUaW1lKCksIHRvOiB0by5nZXRUaW1lKCl9O1xuICAgICAgICAgICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChyYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbk9wZW46ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodGhpcy5vcGVuZWQpO1xuICAgICAgICAgIHRoaXMub25PcGVuLmVtaXQodGhpcy5vcGVuZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAjZ2V0SG91cih0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9XG5cbiAgI2dldE1pbnV0ZSh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH1cbn0iLCI8Yml6eS1pbnB1dFxuICAgICNiaXp5RGF0ZVBpY2tlclxuICAgIFtyZWFkb25seV09XCJ0cnVlXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIChvblNlbGVjdCk9XCJvblNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgW2lkXT1cImlkXCJcbiAgICBjbGFzcz1cImJpenktZGF0ZS1waWNrZXIge3tjdXN0b21DbGFzc319XCI+XG5cbiAgICA8c3ZnIFxuICAgICAgICBzbG90PVwic3VmZml4XCJcbiAgICAgICAgaWQ9XCJiaXp5LWRhdGUtcGlja2VyLWFycm93XCJcbiAgICAgICAgY2xhc3M9XCJiaXp5LWRhdGUtcGlja2VyX19hcnJvd1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnYml6eS1kYXRlLXBpY2tlcl9fYXJyb3ctLW9wZW5lZCc6IG9wZW5lZH1cIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCAzMjAgNTEyXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTM3LjQgMzc0LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBsMTI4LTEyOGM5LjItOS4yIDExLjktMjIuOSA2LjktMzQuOXMtMTYuNi0xOS44LTI5LjYtMTkuOEwzMiAxOTJjLTEyLjkgMC0yNC42IDcuOC0yOS42IDE5LjhzLTIuMiAyNS43IDYuOSAzNC45bDEyOCAxMjh6XCIvPlxuICAgIDwvc3ZnPlxuXG4gICAgPG5nLWNvbnRhaW5lciBzbG90PVwiaGVhZGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyIHNsb3Q9XCJzdWZmaXhcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9cHJlZml4XVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy1jb250YWluZXIgc2xvdD1cImVycm9yXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWVycm9yXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuPC9iaXp5LWlucHV0PlxuIl19