import { takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild, ContentChildren, QueryList } from '@angular/core';
import { Subject, Subscription, debounceTime, interval } from 'rxjs';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'bizy-input',
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyInputComponent implements OnDestroy {
  @ContentChildren(BizyInputOptionComponent) options: QueryList<BizyInputOptionComponent>;
  @ViewChild('bizyInputWrapper') bizyInputWrapper: ElementRef;
  @ViewChild('bizyInput') bizyInput: ElementRef;
  @Input() id: string = `bizy-input-${Math.random()}`;
  @Input() name: string = `bizy-input-${Math.random()}`;
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea' | 'currency' = 'text';
  @Input() customClass: string = '';
  @Input() placeholder: string = '';
  @Input() debounceTime: number = 250;
  @Input() rows: number = 4;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() onChange = new EventEmitter<string | number>();
  @Output() onEnter = new EventEmitter<PointerEvent>();
  @Output() onBackspace = new EventEmitter<PointerEvent>();
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() onBlur = new EventEmitter<PointerEvent>();
  @Output() onFocus = new EventEmitter<PointerEvent>();

  @Input() set autofocus(autofocus: boolean) {
    if (typeof autofocus === 'undefined' || autofocus === null) {
      return;
    }

    this.setFocus(autofocus);
  }

  @Input() set value(value: string | number) {
    if (typeof value === 'undefined' || value === null) {
      return;
    }

    if (value === 0) {
      this._value = '';
      return;
    }

    if (this.type === 'currency' && Number(value)) {
      const decimalPosition = String(value).indexOf('.');
      if (decimalPosition > 0) {
        let leftSide = String(value).substring(0, decimalPosition);
        let rightSide = String(value).substring(decimalPosition + 1);
        leftSide = this.decimalPipe.transform(leftSide, '1.0-0');
        this._value = `${leftSide},${rightSide}`;
        return;
      }

      this._value = this.decimalPipe.transform(value, '1.0-0');
      return;
    }

    this._value = String(value);
  }


  focused: boolean = false;
  touched: boolean = false;
  opened: boolean = false;
  _value: string = '';

  #subscription = new Subscription();
  #optionSubscription = new Subscription();
  onChange$ = new Subject<string | number>();


  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DecimalPipe) private decimalPipe: DecimalPipe
  ) {}

  getWidth(): number {
    return this.bizyInputWrapper && this.bizyInputWrapper.nativeElement && this.bizyInputWrapper.nativeElement.offsetWidth ? this.bizyInputWrapper.nativeElement.offsetWidth : 0;
  }

  _onchange(value: string) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.type === 'currency') {
      let cleanedStr = value.replace(/\./g, '');
      cleanedStr = cleanedStr.replace(',', '.');
      cleanedStr = cleanedStr.replace(/\,/g, '');
      this.onChange$.next(Number(cleanedStr));
      return;
    }

    this.onChange$.next(value);
  }

  _onClick(event: PointerEvent) {
    this.onSelect.emit(event);
    this.onOpen()
  }

  _onEnter(event: PointerEvent) {
    if (this.disabled || this.readonly || !this.focused) {
      return;
    }

    this.onEnter.emit(event);
  }

  _onBlur(event: PointerEvent) {
    setTimeout(() => {
      this.focused = false;
      this.touched = true;
      this.ref.detectChanges();
      this.onBlur.emit(event);
    }, 250)
  }

  _onBackspace(event: PointerEvent) {
    setTimeout(() => {
      this.onBackspace.emit(event);
    }, 250)
  }

  _onFocus(event: PointerEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.focused = true;
    this.ref.detectChanges();
    this.onFocus.emit(event);
  }

  setTouched(touched: boolean) {
    this.touched = touched;
    this.ref.detectChanges();
  }

  ngAfterViewInit() {
    this.#subscription.add(this.onChange$.pipe(debounceTime(this.debounceTime)).subscribe(value => {
      this.valueChange.emit(value);
      this.onChange.emit(value);
    }))
  }

  onOpen() {
    if (this.disabled) {
      return;
    }

    this.opened = !this.opened;
    this.ref.detectChanges();

    if (!this.options) {
      return;
    }

    this.#optionSubscription.unsubscribe();
    this.#optionSubscription = new Subscription();
    this.options.forEach(_option => {
      this.#optionSubscription.add(_option.onSelect.subscribe(() => {
        this.close();
        this.ref.detectChanges();
        this.#optionSubscription.unsubscribe();
      }));
    });
  }

  setFocus(focus: boolean) {
    const interval$ = interval(300);
    const finish$ = new Subject<void>();
    this.#subscription.add(interval$.pipe(takeUntil(finish$)).subscribe(() => {
      if (this.bizyInput && this.bizyInput.nativeElement) {
        if (focus) {
          this.bizyInput.nativeElement.focus();
          this.focused = true;
        } else {
          this.bizyInput.nativeElement.blur();
          this.focused = false;
        }
        
        finish$.next();
        finish$.complete();
        this.ref.detectChanges();
      }
    }))
  }

  close = (event?: PointerEvent & {target: {id: string}}, button?: HTMLButtonElement) => {
    if (button && event && event.target && event.target === button) {
      return;
    }

    this.opened = false;
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#optionSubscription.unsubscribe();
  }
}