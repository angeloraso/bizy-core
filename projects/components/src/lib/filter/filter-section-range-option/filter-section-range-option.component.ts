import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'bizy-filter-section-range-option',
  templateUrl: './filter-section-range-option.html',
  styleUrls: ['./filter-section-range-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionRangeOptionComponent implements AfterViewInit {
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() minLabel: string = 'Mayor o igual';
  @Input() maxLabel: string = 'Menor o igual';
  @Input() customClass: string = '';
  @Output() onChange = new EventEmitter<{min: number | null, max: number | null}>();

  _minLimit: number;
  _maxLimit: number;

  form: FormGroup;
  #subscription = new Subscription();

  @Input() set min(min: number | null) {
    if (typeof min === 'undefined' || min === null) {
      this.minValue.setValue('');
      return;
    }

    this.minValue.setValue(min);
  };

  @Input() set max(max: number | null) {
    if (typeof max === 'undefined' || max === null) {
      this.maxValue.setValue('');
      return;
    }

    this.maxValue.setValue(max);
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
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      minValue: [null],
      maxValue: [null]
    });
  }

  ngAfterViewInit() {
    this.#subscription.add(this.minValue.valueChanges.pipe(debounceTime(300)).subscribe(_value => {
      const min = _value === '' ? null : Number(_value);
      if (typeof this._minLimit !== 'undefined' && this._minLimit !== null && min && min < this._minLimit) {
        this.minValue.setValue(this._minLimit);
        return;
      }

      const max = this.maxValue.value === null || this.maxValue.value === '' ? null : Number(this.maxValue.value);

      if (min !== null && max !== null && max < min) {
        return;
      }

      this.onChange.emit({min, max});
    }));

    this.#subscription.add(this.maxValue.valueChanges.pipe(debounceTime(300)).subscribe(_value => {
      const max = _value === '' ? null : Number(_value);
      if (typeof this._maxLimit !== 'undefined' && this._maxLimit !== null && max && max > this._maxLimit) {
        this.maxValue.setValue(this._maxLimit);
        return;
      }

      const min = this.minValue.value === null || this.minValue.value === '' ? null : Number(this.minValue.value);

      if (min !== null && max !== null && max < min) {
        return;
      }

      this.onChange.emit({min, max});
    }));
  }

  get minValue(): AbstractControl<number | string> {
    return this.form.get('minValue')!;
  }

  get maxValue(): AbstractControl<number | string> {
    return this.form.get('maxValue')!;
  }

  onClear = () => {
    this.minValue.setValue('');

    this.maxValue.setValue('');
  }

  getId = () => {
    return this.id;
  }

  isActivated = () => {
    return (this.minValue.value || this.minValue.value === 0 || this.maxValue.value || this.maxValue.value === 0 ) && (this.minValue.value !== this._minLimit || this.maxValue.value !== this._maxLimit);
  }
}