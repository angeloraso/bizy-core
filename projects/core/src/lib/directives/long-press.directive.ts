import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';

@Directive({
  selector: '[bizyLongPress]',
})
export class BizyLongPressDirective implements OnDestroy {
  @Input() bizyLongPressDelay = 750;
  @Output() bizyLongPress = new EventEmitter<MouseEvent |TouchEvent>();

  #pressTimeout: any = null;

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onPressStart(event: MouseEvent | TouchEvent): void {
    this.clearTimeout(); // Clear any existing timeout
    this.#pressTimeout = setTimeout(() => {
      this.bizyLongPress.emit(event);
    }, this.bizyLongPressDelay);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  @HostListener('touchcancel')
  onPressEnd(): void {
    this.clearTimeout();
  }

  private clearTimeout(): void {
    if (this.#pressTimeout) {
      clearTimeout(this.#pressTimeout);
      this.#pressTimeout = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
