import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BizyInputComponent } from '../../input/input.component';

@Component({
  selector: 'bizy-filter-section-range-option',
  templateUrl: './filter-section-range-option.html',
  styleUrls: ['./filter-section-range-option.css'],
  imports: [BizyInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionRangeOptionComponent {
  @Input() id: string = `bizy-filter-section-range-option-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Output() onChange = new EventEmitter<{min: number | null, max: number | null}>();

  _minLimit: number;
  _maxLimit: number;

  #activated = new BehaviorSubject<boolean>(false);

  get activated$(): Observable<boolean> {
    return this.#activated.asObservable();
  }

  form: FormGroup;

  @Input() set min(min: number | null) {
    if (typeof min === 'undefined' || min === null) {
      this.minValue.setValue(null);
    } else {
      this.minValue.setValue(min);
    }

    this.#activated.next(Boolean(min));
    this.ref.detectChanges();
  };

  @Input() set max(max: number | null) {
    if (typeof max === 'undefined' || max === null) {
      this.maxValue.setValue(null);
    } else {
      this.maxValue.setValue(max);
    }

    this.#activated.next(Boolean(max));
    this.ref.detectChanges();
  };

  @Input() set minLimit(min: number | null) {
    if (typeof min === 'undefined' || min === null) {
      return;
    }

    this._minLimit = min;
    if (typeof this._maxLimit === 'undefined' || this._maxLimit === null) {
      this.minValue.setValidators([Validators.max(min)])
    } else {
      this.minValue.setValidators([Validators.max(this._maxLimit), Validators.min(min)])
    }
  };

  @Input() set maxLimit(max: number | null) {
    if (typeof max === 'undefined' || max === null) {
      return;
    }

    this._maxLimit = max;
    if (typeof this._minLimit === 'undefined' || this._minLimit === null) {
      this.maxValue.setValidators([Validators.max(max)])
    } else {
      this.maxValue.setValidators([Validators.min(this._minLimit), Validators.max(max)])
    }
  };

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      minValue: [null],
      maxValue: [null]
    });
  }

  setMinValue(value: number | string) {
    let min = value === '' ? null : Number(value);
    const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);

    if (min !== null && max !== null && max < min) {
      return;
    }

    if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
      min = this._minLimit;
    }

    this.onChange.emit({min, max});
    this.#activated.next(Boolean(min) || Boolean(max));
    this.ref.detectChanges();
  }
  
  setMaxValue(value: number | string | null) {
    let max = !Boolean(value) && value !== 0 ? null : Number(value);

    const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);

    if (min !== null && max !== null && max < min) {
      return;
    }

    if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
      max = this._maxLimit;
    }

    this.onChange.emit({min, max});
    this.#activated.next(Boolean(min) || Boolean(max));
    this.ref.detectChanges();
  }

  get minValue(): AbstractControl<number | string> {
    return this.form.get('minValue')!;
  }

  get maxValue(): AbstractControl<number | string> {
    return this.form.get('maxValue')!;
  }

  onClean = () => {
    this.minValue.setValue(null);
    this.maxValue.setValue(null);
    this.onChange.emit({min: null, max: null});
    this.#activated.next(false);
    this.ref.detectChanges();
  }

  getId = () => {
    return this.id;
  }

  isActivated = () => {
    return this.#activated.value;
  }
}