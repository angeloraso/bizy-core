import { Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { fromEvent, merge, of, Subscription, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[bizyLongPress]',
})
export class BizyLongPressDirective implements OnDestroy {
  @Input() threshold = 500;
  @Output() press = new EventEmitter<void>();
  
  #event: Subscription;
  
  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    const mousedown = fromEvent<MouseEvent>(elementRef.nativeElement, 'mousedown').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => true) // turn on threshold counter
    );

    const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(map(() => true));

    const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(map(() => false));
    
    const mouseup = fromEvent<MouseEvent>(window, 'mouseup').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => false) // reset threshold counter
    );

    this.#event = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        switchMap(state => (state ? timer(this.threshold, 100) : of(null))),
        filter(value => Boolean(value))
      )
      .subscribe(() => this.press.emit());
  }

  ngOnDestroy(): void {
    if (this.#event) {
      this.#event.unsubscribe();
    }
  }
}
