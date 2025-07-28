import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[bizyReload]'
})
export class BizyReloadDirective {
  @Input() bizyReloadThreshold: number = 200;
  @Output() bizyReload = new EventEmitter<void>();

  #startY: number | null = null;
  #currentY: number | null = null;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.#startY = event.touches[0].clientY;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.#startY === null) {
      return;
    }

    this.#currentY = event.touches[0].clientY;

    const deltaY = this.#currentY - this.#startY;

    if (deltaY > this.bizyReloadThreshold) {
      this.#startY = null;
      this.bizyReload.emit();
    }
  }
}