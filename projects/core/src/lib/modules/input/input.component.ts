import { filter, take } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, ContentChildren, QueryList, inject } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, debounceTime } from 'rxjs';
import { BizyInputOptionComponent } from './input-option/input-option.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyCurrencyFormatDirective } from '../../directives/currency-format.directive';

@Component({
  selector: 'bizy-input',
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  imports: [CommonModule, FormsModule, OverlayModule, BizyCurrencyFormatDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyInputComponent implements OnDestroy {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @ContentChildren(BizyInputOptionComponent) options: QueryList<BizyInputOptionComponent>;
  @ViewChild('bizyInputWrapper') bizyInputWrapper: ElementRef;
  @Input() id: string = `bizy-input-${Math.random()}`;
  @Input() name: string = `bizy-input-${Math.random()}`;
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea' | 'currency' = 'text';
  @Input() customClass: string = '';
  @Input() placeholder: string = '';
  @Input() debounceTime: number = 250;
  @Input() rows: number = 4;
  @Input() maxLength: number | null = null;
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() onChange = new EventEmitter<string | number>();
  @Output() onEnter = new EventEmitter<KeyboardEvent>();
  @Output() onBackspace = new EventEmitter<KeyboardEvent>();
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() onBlur = new EventEmitter<PointerEvent>();
  @Output() onFocus = new EventEmitter<PointerEvent>();

  @Output() onPaste = new EventEmitter<ClipboardEvent>();

  @ViewChild('bizyInput') set bizyInput(element: ElementRef) {
    if (element) {
      this.#input = element;
      setTimeout(() => {
        this.setFocus(this.autofocus);
      }, 0);
    }
  };

  @Input() set value(value: string | number | null) {
    if (typeof value === 'undefined') {
      return;
    }

    if (this.type === 'currency') {
      this._currencyValue = Number(value);

      if (this.#input && this.#input.nativeElement && (<any>this.#input.nativeElement).getValue) {
        const _value = (<any>this.#input.nativeElement).getValue();
        if (_value !== this._currencyValue) {
          this.#input.nativeElement.setValue(this._currencyValue);
        }
      }

      return;
    }

    this._value = value;
  }

  focused: boolean = false;
  touched: boolean = false;
  opened: boolean = false;
  _value: string | number | null = null;
  _currencyValue: number | null = null;
  
  currencyOptions = 'commaDecimalCharDotSeparator';
  
  #input: ElementRef | null = null;
  #subscription = new Subscription();
  #optionSubscription = new Subscription();
  onChange$ = new Subject<string | number>();
  #afterViewInitSubscription = new Subscription();
  #afterViewInit = new BehaviorSubject<boolean>(false);


  getWidth = (): number => this.bizyInputWrapper && this.bizyInputWrapper.nativeElement && this.bizyInputWrapper.nativeElement.offsetWidth ? this.bizyInputWrapper.nativeElement.offsetWidth : 0;

  _onchange = (value: string) => {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.type === 'currency' && (<any>this.#input.nativeElement).getValue) {
      this._currencyValue = (<any>this.#input.nativeElement).getValue()
      this.onChange$.next(this._currencyValue);
      return;
    }

    this.onChange$.next(value);
  }

  _onClick = (event: PointerEvent) => {
    this.onSelect.emit(event);
    this.onOpen()
  }

  _onEnter = (event: KeyboardEvent) => {
    if (this.disabled || this.readonly || !this.focused) {
      return;
    }

    this.onEnter.emit(event);
  }

  _onBackspace = (event: KeyboardEvent) => {
    setTimeout(() => {
      this.onBackspace.emit(event);
    }, this.debounceTime)
  }

  setTouched(touched: boolean) {
    this.touched = touched;
    this.#ref.detectChanges();
  }

  ngAfterViewInit() {
    if (this.type === 'currency'&& (<any>this.#input.nativeElement).setValue) {
      this.#input.nativeElement.setValue(this._currencyValue);
    }
    this.#subscription.add(this.onChange$.pipe(debounceTime(this.debounceTime)).subscribe(value => {
      this.valueChange.emit(value);
      this.onChange.emit(value);
    }))

    this.#input.nativeElement.addEventListener('focus', this.#focus);
    this.#input.nativeElement.addEventListener('blur', this.#blur);
    this.#input.nativeElement.addEventListener('paste', this.#paste);

    this.#afterViewInit.next(true);
  }

  #focus = (event: PointerEvent) => {
    this.focused = true;
    this.onFocus.emit(event);
    this.#ref.detectChanges();
  }

  #blur = (event: PointerEvent) => {
    if (this.type === 'currency') {
      this.#input.nativeElement.setValue(this._currencyValue);
    }

    this.focused = false;
    this.touched = true;
    this.onBlur.emit(event);
    this.#ref.detectChanges();
  }

  #paste = (event: ClipboardEvent) => {
    this.onPaste.emit(event);
    this.#ref.detectChanges();
  }

  onOpen = () => {
    if (this.disabled) {
      return;
    }

    this.opened = !this.opened;
    this.#ref.detectChanges();

    if (!this.options) {
      return;
    }

    this.#optionSubscription.unsubscribe();
    this.#optionSubscription = new Subscription();
    this.options.forEach(_option => {
      this.#optionSubscription.add(_option.onSelect.subscribe(() => {
        this.close();
        this.#ref.detectChanges();
        this.#optionSubscription.unsubscribe();
      }));
    });
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  setFocus = (focus: boolean) => {
    this.#afterViewInitSubscription.add(this.#afterViewInit.pipe(filter(value => value === true), take(1)).subscribe(() => {
      if (!this.#input || !this.#input.nativeElement) {
        return;
      }

      if (focus) {
        this.#input.nativeElement.focus();
        this.focused = true;
      } else {
        this.#input.nativeElement.blur();
        this.focused = false;
      }

      this.#ref.detectChanges();
    }));
  }

  close = (event?: PointerEvent & {target: {id: string}}, button?: HTMLButtonElement) => {
    if (button && event && event.target && event.target === button) {
      return;
    }

    this.opened = false;
    this.#ref.detectChanges();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#optionSubscription.unsubscribe();
    this.#afterViewInitSubscription.unsubscribe();
    if (this.#input && this.#input.nativeElement) {
      this.#input.nativeElement.removeEventListener('focus', this.#focus);
      this.#input.nativeElement.removeEventListener('blur', this.#blur);
      this.#input.nativeElement.removeEventListener('paste', this.#paste);
    }
  }
}