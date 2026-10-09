import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { SliderBullet, SliderBulletEvent, SliderLimit, SliderRange } from './slider.types';

@Component({
  selector: 'bizy-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BizySliderComponent {
  readonly #elementRef = inject(ElementRef);
  @ViewChild('fromSlider') fromSlider: ElementRef | null = null;
  @ViewChild('toSlider') toSlider: ElementRef | null = null;
  @Input() step: number = 1;
  @Output() valueChange = new EventEmitter<number>();
  @Output() onSelect = new EventEmitter<SliderBulletEvent>();
  @Output() onMove = new EventEmitter<SliderBulletEvent>();
  @Output() onRelease = new EventEmitter<SliderBulletEvent>();

  private activeInteraction: { bullet: SliderBullet; pointerId?: number } | null = null;
  private rangeConfigured = false;
  private valueConfigured = false;
  private _limit: Required<SliderLimit> = { min: 0, max: 100 };

  _min: number = 0;
  _max: number = 100;
  _value: number = 0;

  @Input() set limit(limit: SliderLimit | null | undefined) {
    this._limit = { min: limit?.min ?? 0, max: limit?.max ?? 100 };
    if (!this.rangeConfigured) {
      this._min = this._limit.min;
      this._max = this._limit.max;
    }
  }

  get limit(): Required<SliderLimit> {
    return this._limit;
  }

  @Input() set range(range: SliderRange | null | undefined) {
    this.rangeConfigured = range != null;
    this._min = range?.min ?? this._limit.min;
    this._max = range?.max ?? this._limit.max;
  }

  get range(): SliderRange | null {
    return this.rangeConfigured ? { min: this._min, max: this._max } : null;
  }

  @Input() set value(value: number | null | undefined) {
    this.valueConfigured = value != null;
    if (value == null) {
      return;
    }

    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  get isSingle(): boolean {
    return this.valueConfigured && !this.rangeConfigured;
  }

  get displayValue(): number {
    return this.clamp(this._value);
  }

  get displayMin(): number {
    return this.clamp(this._min);
  }

  get displayMax(): number {
    return this.clamp(this._max);
  }

  get minPercent(): number {
    return this.percent(this.displayMin);
  }

  get maxPercent(): number {
    return this.percent(this.displayMax);
  }

  get valuePercent(): number {
    return this.percent(this.displayValue);
  }

  private percent(value: number): number {
    const span = this._limit.max - this._limit.min;
    return span > 0 ? Math.min(100, Math.max(0, (value - this._limit.min) / span * 100)) : 0;
  }

  private clamp(value: number): number {
    return Math.min(this._limit.max, Math.max(this._limit.min, value));
  }

  setFromSlider(value: number) {
    if (value > this.displayMax && this.fromSlider) {
      this._min = this.displayMax;
      this.fromSlider.nativeElement.value = this._min;
    } else {
      this._min =  value;
    }

    this.onMove.emit(this.bulletEvent('min'));
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  setValueSlider(value: number) {
    this._value = value;
    this.valueChange.emit(value);
    this.onMove.emit(this.bulletEvent('value'));
  }

  setToSlider(value: number) {
    if (value < this.displayMin && this.toSlider) {
      this._max = this.displayMin;
      this.toSlider.nativeElement.value = this._max;
    } else {
      this._max =  value;
    }

    this.onMove.emit(this.bulletEvent('max'));
  }

  selectBullet(bullet: SliderBullet, event: PointerEvent) {
    if (event.button !== 0 || !event.isPrimary || this.activeInteraction) {
      return;
    }

    this.activeInteraction = { bullet, pointerId: event.pointerId };
    this.onSelect.emit(this.bulletEvent(bullet));
  }

  selectBulletWithKeyboard(bullet: SliderBullet, event: KeyboardEvent) {
    if (!this.isSliderKey(event) || this.activeInteraction) {
      return;
    }

    this.activeInteraction = { bullet };
    this.onSelect.emit(this.bulletEvent(bullet));
  }

  releaseBulletWithKeyboard(bullet: SliderBullet, event: KeyboardEvent) {
    if (this.isSliderKey(event) && this.activeInteraction?.bullet === bullet && this.activeInteraction.pointerId === undefined) {
      this.releaseBullet();
    }
  }

  releaseBulletOnBlur(bullet: SliderBullet) {
    if (this.activeInteraction?.bullet === bullet && this.activeInteraction.pointerId === undefined) {
      this.releaseBullet();
    }
  }

  @HostListener('document:pointerup', ['$event'])
  @HostListener('document:pointercancel', ['$event'])
  releaseBulletOnPointerEnd(event: PointerEvent) {
    if (this.activeInteraction?.pointerId === event.pointerId) {
      this.releaseBullet();
    }
  }

  private releaseBullet() {
    if (!this.activeInteraction) {
      return;
    }

    const bullet = this.activeInteraction.bullet;
    this.activeInteraction = null;
    this.onRelease.emit(this.bulletEvent(bullet));
  }

  private bulletEvent(bullet: SliderBullet): SliderBulletEvent {
    if (bullet === 'value') {
      return this.displayValue;
    }

    return { bullet, value: bullet === 'min' ? this.displayMin : this.displayMax };
  }

  private isSliderKey(event: KeyboardEvent): boolean {
    return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key);
  }
}
