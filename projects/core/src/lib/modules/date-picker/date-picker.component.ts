import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BizyInputComponent } from '../input/input.component';
import { CommonModule, DatePipe } from '@angular/common';
import type { Instance } from 'flatpickr/dist/types/instance';
import type { Plugin } from 'flatpickr/dist/types/options';
@Component({
  selector: 'bizy-date-picker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
  imports: [CommonModule, BizyInputComponent],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyDatePickerComponent implements OnDestroy {
  readonly #elementRef = inject(ElementRef);
  readonly #datePipe = inject(DatePipe);
  readonly #ref = inject(ChangeDetectorRef);

  @ViewChild('bizyDatePicker') private bizyDatePicker: BizyInputComponent | null = null;
  @Input() id: string = `bizy-date-picker-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Input() minDate: number | null = null;
  @Input() maxDate: number | null = null;
  @Input() enableSeconds: boolean = false;
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
  #instance: Instance | null = null;
  #starting: Promise<void> | null = null;
  #destroyed = false;


  get touched(): boolean {
    return this.bizyDatePicker ? this.bizyDatePicker.touched : false;
  }

  @Input() set date(date: number) {
    if (typeof date === 'undefined' || date === null) {
      return;
    }

    this.mode = 'single';
    this.dates = [date];
    this.time = date;
    this.value = this.#datePipe.transform(date, this.datePipeFormat, undefined, 'es-AR')!;
    if (!this.enableTime || !this.started) {
      void this.#start();
    }
  }

  @Input() set range(range: {from: number, to: number}) {
    if (!range) {
      return;
    }

    this.mode = 'range';
    this.dates = [range.from, range.to];
    this.time = range.from;
    this.value = `${this.#datePipe.transform(range.from, this.datePipeFormat, undefined, 'es-AR')} - ${this.#datePipe.transform(range.to, this.datePipeFormat, undefined, 'es-AR')}`; 
    void this.#start();
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

  ngAfterViewInit() {
    void this.#start()
  }

  ngOnDestroy(): void {
    this.#destroyed = true;
    this.#instance?.destroy();
    this.#instance = null;
  }

  async #start(): Promise<void> {
    if (this.started || this.#starting) {
      return this.#starting ?? Promise.resolve();
    }

    if (this.bizyDatePicker && this.bizyDatePicker.bizyInputWrapper && this.bizyDatePicker.bizyInputWrapper.nativeElement) {
      this.#starting = this.#initialize();
      try {
        await this.#starting;
      } finally {
        this.#starting = null;
      }
    }
  }

  async #initialize(): Promise<void> {
    const [{ default: flatpickr }, { default: monthSelectPlugin }, { Spanish }] = await Promise.all([
      import('flatpickr'),
      import('flatpickr/dist/plugins/monthSelect/index.js'),
      import('flatpickr/dist/l10n/es.js')
    ]);

    if (this.#destroyed) {
      return;
    }

    const plugins: Array<Plugin> = [];

    if (this.dateFormat === 'Y-M') {
      plugins.push(monthSelectPlugin({
        shorthand: true
      }));
    }

    const overlayHost = this.#getOverlayHost();

    this.#instance = flatpickr(this.bizyDatePicker!.bizyInputWrapper.nativeElement, {
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
      ...(overlayHost ? {
        appendTo: overlayHost,
        position: (instance: Instance, positionElement?: HTMLElement) =>
          this.#positionCalendar(instance, positionElement)
      } : {}),
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

  setTouched(touched: boolean) {
    if (this.bizyDatePicker) {
      this.bizyDatePicker.setTouched(touched);
      this.#ref.detectChanges();
    }
  }
  
  getNativeElement = () => this.#elementRef?.nativeElement;

  #getOverlayHost(): HTMLElement | undefined {
    const overlayHost = this.#elementRef.nativeElement.closest('.cdk-overlay-popover');
    return overlayHost instanceof HTMLElement ? overlayHost : undefined;
  }

  #positionCalendar(instance: Instance, customPositionElement?: HTMLElement) {
    const calendar = instance.calendarContainer;
    const positionElement = customPositionElement ?? instance._positionElement;

    if (!calendar || !positionElement) {
      return;
    }

    const inputBounds = positionElement.getBoundingClientRect();
    const calendarHeight = Array.from(calendar.children)
      .reduce((height, child) => height + (child as HTMLElement).offsetHeight, 0);
    const calendarWidth = calendar.offsetWidth;
    const showOnTop = window.innerHeight - inputBounds.bottom < calendarHeight && inputBounds.top > calendarHeight;
    const top = showOnTop ? inputBounds.top - calendarHeight - 2 : inputBounds.bottom + 2;
    const left = Math.max(0, Math.min(inputBounds.left, window.innerWidth - calendarWidth));

    calendar.classList.toggle('arrowTop', !showOnTop);
    calendar.classList.toggle('arrowBottom', showOnTop);
    calendar.style.position = 'fixed';
    calendar.style.top = `${top}px`;
    calendar.style.left = `${left}px`;
    calendar.style.right = 'auto';
    calendar.style.zIndex = '1001';
    calendar.style.pointerEvents = 'auto';
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
