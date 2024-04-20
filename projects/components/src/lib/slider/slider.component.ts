import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'bizy-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BizySliderComponent {
  @ViewChild('fromSlider') fromSlider: ElementRef
  @ViewChild('toSlider') toSlider: ElementRef
  @Input() minLimit: number = 0;
  @Input() maxLimit: number = 100;
  @Output() onChange = new EventEmitter<{min: number, max: number}>();

  _min: number = 0;
  _max: number = 100;


  @Input() set min(min: number) {
    if (typeof min === 'undefined' || min == null) {
      return;
    }

    this._min = min;
  };

  @Input() set max(max: number) {
    if (typeof max === 'undefined' || max == null) {
      return;
    }

    this._max = max;
  };

  setFromSlider(value: number) {
    if (value > this._max ) {
      this._min = this._max;
      this.fromSlider.nativeElement.value = this._max;
    } else {
      this._min =  value;
    }

    this.onChange.emit({min: this._min, max: this._max})
  }

  setToSlider(value: number) {
    if (value < this._min ) {
      this._max = this._min;
      this.toSlider.nativeElement.value = this._min;
    } else {
      this._max =  value;
    }

    this.onChange.emit({min: this._min, max: this._max})
  }
}
