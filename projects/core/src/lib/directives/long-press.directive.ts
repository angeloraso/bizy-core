import { inject, AfterViewInit, Renderer2 } from '@angular/core';
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { fromEvent, merge, of, Subscription, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

const MOUSE_LEFT_BUTTON = 0;
@Directive({
  selector: '[bizyLongPress]',
})
export class BizyLongPressDirective implements AfterViewInit, OnDestroy {
  readonly #elementRef = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  @Input() bizyLongPressThreshold = 750;
  @Output() bizyLongPress = new EventEmitter<void>();
  
  #subscription: Subscription;

  ngAfterViewInit() {
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'cursor', 'pointer');

    const mousedown = fromEvent<MouseEvent>(this.#elementRef.nativeElement, 'mousedown').pipe(
      filter((event) => event.button === MOUSE_LEFT_BUTTON),
      map(() => true) // turn on delay counter
    );

    const touchstart = fromEvent(this.#elementRef.nativeElement, 'touchstart').pipe(map(() => true));

    const touchEnd = fromEvent(this.#elementRef.nativeElement, 'touchend').pipe(map(() => false));
    
    const mouseup = fromEvent<MouseEvent>(window, 'mouseup').pipe(
      filter((event) => event.button === MOUSE_LEFT_BUTTON),
      map(() => false) // reset delay counter
    );

    this.#subscription = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        switchMap(state => (state ? timer(this.bizyLongPressThreshold) : of(null))),
        filter(value => value !== null)
      )
      .subscribe(() => this.bizyLongPress.emit());
  }
  
  ngOnDestroy(): void {
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }
}
