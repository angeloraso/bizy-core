import {
  booleanAttribute,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  Output,
} from '@angular/core';

@Directive({
  selector: '[bizyRefresher]'
})
export class BizyRefresherDirective implements OnChanges {
  /** Minimum downward distance in CSS pixels, measured when the finger is lifted. */
  @Input({ transform: numberAttribute }) bizyRefreshThreshold = 80;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) refreshing = false;
  @Output() bizyRefresh = new EventEmitter<void>();

  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
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
    const bounds = this.#elementRef.nativeElement.getBoundingClientRect();
    // Only gestures starting within the top 15% (up to 80 CSS pixels) qualify.
    const startMargin = Math.min(bounds.height * 0.15, 80);
    const startOffset = touch.clientY - bounds.top;
    if (bounds.height <= 0 || startOffset < 0 || startOffset > startMargin) {
      return;
    }

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
