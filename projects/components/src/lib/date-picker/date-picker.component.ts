import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import flatpickr from "flatpickr";
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import { Spanish } from "flatpickr/dist/l10n/es.js"
import { BizyInputComponent } from '../input';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'bizy-date-picker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyDatePickerComponent {
  @ViewChild('bizyDatePicker') private bizyDatePicker: BizyInputComponent;
  @Input() id: string = `bizy-date-picker-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() dateChange = new EventEmitter<number>();
  @Output() rangeChange = new EventEmitter<{from: number, to: number}>();
  @Output() onChange = new EventEmitter<number | {from: number, to: number}>();
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() onOpen = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  dateFormat: string = 'Y-m-d';
  datePipeFormat: string = 'yyyy-MM-dd'
  enableTime: boolean = false;
  started: boolean = false;
  noCalendar: boolean = true;
  mode: 'single' | 'range' = 'single';
  dates: Array<number> = [Date.now()];
  time: number = Date.now();

  @Input() set date(date: number) {
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

  @Input() set range(range: {from: number, to: number}) {
    if (!range) {
      return;
    }

    this.mode = 'range';
    this.dates = [range.from, range.to];
    this.time = range.from;
    this.value = `${this.datePipe.transform(range.from, this.datePipeFormat, undefined, 'es-AR')} - ${this.datePipe.transform(range.to, this.datePipeFormat, undefined, 'es-AR')}`; 
    this.#start()
  }

  value: string = '';

  @Input() set type(type: 'date' | 'date-time' | 'time' | 'year-month') {
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

  constructor(
    @Inject(DatePipe) private datePipe: DatePipe
  ) {}

  ngAfterViewInit() {
    this.#start()
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
        onChange: (selectedDates: Array<Date>) => {
          if (this.mode === 'single' && selectedDates[0]) {
            const date = new Date(selectedDates[0]);
            this.dateChange.emit(date.getTime());
            this.onChange.emit(date.getTime());
          } else if (selectedDates[0] && selectedDates[1]) {
            const from = new Date(selectedDates[0]);
            const to = new Date(selectedDates[1]);
            to.setHours(23, 59, 59, 999);
            const range = {from: from.getTime(), to: to.getTime()};
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

  #getHour(time: number): number {
    const date = new Date(time);
    return date.getHours();
  }

  #getMinute(time: number): number {
    const date = new Date(time);
    return date.getMinutes();
  }
}