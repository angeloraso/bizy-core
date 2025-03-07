import {
  Directive,
  ElementRef,
  AfterViewInit,
  Renderer2,
  inject,
  Input
} from '@angular/core';
import { debounceTime, skip, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[bizyTextEllipsis]',
})
export class BizyTextEllipsisDirective implements AfterViewInit {
  readonly #elementRef = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  @Input() resizeRef: ElementRef = null;

  #resizeObserver: ResizeObserver;
  notifier$ = new Subject<void>();
  #subscription = new Subscription();

  ngAfterViewInit() {
    this.#applyClamp();

    this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
    const resizeRef = this.resizeRef ? this.resizeRef : this.#renderer.parentNode(this.#elementRef.nativeElement) ? this.#renderer.parentNode(this.#elementRef.nativeElement) : this.#elementRef.nativeElement;
    this.#resizeObserver.observe(resizeRef);
    this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(150)).subscribe(() => {
      this.#applyClamp();
    }));
  }

  #applyClamp() {
    const parent = this.#elementRef.nativeElement.parentElement;
    const element = this.#elementRef.nativeElement;
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
    const parentHeight = parent.offsetHeight;

    if (lineHeight && parentHeight) {
      const lineClamp = Math.floor(parentHeight / lineHeight);
      this.#renderer.setStyle(element, 'display', '-webkit-box');
      this.#renderer.setStyle(element, 'text-overflow', 'ellipsis');
      this.#renderer.setStyle(element, '-webkit-box-orient', 'vertical');
      this.#renderer.setStyle(element, 'overflow', 'hidden');
      this.#renderer.setStyle(element, 'word-wrap', 'break-word');
      this.#renderer.setStyle(element, 'text-wrap', 'auto');
      this.#renderer.setStyle(element, 'white-space', 'pre-wrap');
      this.#renderer.setStyle(element, 'word-break', 'break-word');
      this.#renderer.setStyle(element, '-webkit-line-clamp', lineClamp ? lineClamp.toString() : '1');
    }
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }
}
