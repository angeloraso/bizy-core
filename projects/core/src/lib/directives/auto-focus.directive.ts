import { take } from 'rxjs/operators';
import { Directive, Input, ElementRef, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[bizyAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  @Input('bizyAutoFocus') public autoFocus: boolean;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (typeof this.autoFocus !== 'undefined' && this.autoFocus !== null && this.autoFocus !== false) {
      this.setFocus();
    }
  }

  setFocus() {
    const interval = setInterval(() => {
      this.elementRef.nativeElement.focus();
      this.ref.detectChanges();
    }, 300);

    fromEvent(this.elementRef.nativeElement, 'focus').pipe(take(1)).subscribe(() => {
      clearInterval(interval);
    });
  }
}
