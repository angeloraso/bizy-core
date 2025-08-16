import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BizyInputComponent } from '../../input/input.component';

@Component({
  selector: 'bizy-filter-section-search-option',
  templateUrl: './filter-section-search-option.html',
  styleUrls: ['./filter-section-search-option.css'],
  imports: [BizyInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionSearchOptionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @Input() id: string = `bizy-filter-section-search-option-${Math.random()}`;
  @Input() customClass: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() onChange = new EventEmitter<string>();

  _value: string = '';

  #activated = new BehaviorSubject<boolean>(false);

  get activated$(): Observable<boolean> {
    return this.#activated.asObservable();
  }

  @Input() set value(value: string) {
    if (typeof value === 'undefined' || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value = '';
    } 

    this._value = value;
    this.#activated.next(Boolean(value));
    this.#ref.detectChanges();
  }

  _onChange(value: string) {
    this.valueChange.emit(value);
    this.onChange.emit(value);
    this.#activated.next(Boolean(value));
    this.#ref.detectChanges();
  }

  getId = () => {
    return this.id;
  }

  getValue = () => {
    return this._value;
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  isActivated = () => {
    return this.#activated.value;
  }
}