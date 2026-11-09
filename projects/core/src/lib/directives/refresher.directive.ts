import {
  booleanAttribute,
  Directive,
  EventEmitter,
  HostListener,
  Input,
  numberAttribute,
  OnChanges,
  Output,
} from '@angular/core';

@Directive({
  selector: '[bizy-refresher]'
})
export class BizyRefresherDirective implements OnChanges {
  /** Minimum downward distance in CSS pixels, measured when the finger is lifted. */
  @Input({ transform: numberAttribute }) bizyRefreshThreshold = 80;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) refreshing = false;
  @Output() bizyRefresh = new EventEmitter<void>();

  #touchId: number | null = null;
  #startY = 0;

  ngOnChanges(): void {
    if (this.disabled || this.refreshing) {
      this.#reset();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.#reset();

    if (this.disabled || this.refreshing || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    this.#touchId = touch.identifier;
    this.#startY = touch.clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const touchId = this.#touchId;
    const startY = this.#startY;
    this.#reset();

    if (touchId === null || this.disabled || this.refreshing || event.touches.length !== 0) {
      return;
    }

    if (!Number.isFinite(this.bizyRefreshThreshold) || this.bizyRefreshThreshold < 0) {
      return;
    }

    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      if (touch.identifier === touchId && touch.clientY - startY > this.bizyRefreshThreshold) {
        this.bizyRefresh.emit();
        return;
      }
    }
  }

  @HostListener('touchcancel')
  onTouchCancel(): void {
    this.#reset();
  }

  #reset(): void {
    this.#touchId = null;
    this.#startY = 0;
  }
}
