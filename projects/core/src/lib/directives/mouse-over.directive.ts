import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';

import { fromEvent, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[bizyMouseOver]'
})
export class BizyMouseOverDirective implements OnInit, OnDestroy {
  readonly #elementRef = inject(ElementRef<HTMLElement>);
  @Input() bizyMouseOverDelay = 150;
  @Output() bizyMouseOver = new EventEmitter<MouseEvent>();
  @Output() bizyMouseOut = new EventEmitter<MouseEvent>();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    const mouseEnter$ = fromEvent<MouseEvent>(this.#elementRef.nativeElement, 'mouseenter');
    const mouseLeave$ = fromEvent<MouseEvent>(this.#elementRef.nativeElement, 'mouseleave');

    mouseEnter$
      .pipe(
        switchMap(event =>
          timer(this.bizyMouseOverDelay).pipe(
            tap(() => this.bizyMouseOver.emit(event)),
            takeUntil(mouseLeave$)
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    mouseLeave$
      .pipe(
        tap(event => this.bizyMouseOut.emit(event)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
