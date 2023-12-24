import { takeUntil } from 'rxjs/operators';
import { Directive, ElementRef, Inject, AfterViewInit, Renderer2 } from '@angular/core';
import { interval, Subject } from 'rxjs';

@Directive({
  selector: '[virtualScrollGrid]'
})
export class VirtualScrollGridDirective implements AfterViewInit {
  constructor(
    @Inject(ElementRef) private elRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.elRef.nativeElement, 'gap', '1em');
    this.renderer.setStyle(this.elRef.nativeElement, 'marginBottom', '1em');

    const notifier = new Subject<void>();
    const check = interval(100);
    check.pipe(takeUntil(notifier)).subscribe(() => {
      if (this.elRef.nativeElement.offsetParent) {
        notifier.next();
        notifier.complete();
        const bizyVirtualScrollComponent = this.elRef.nativeElement.offsetParent.offsetParent.parentElement.parentElement;
        let itemMinHeight: string = bizyVirtualScrollComponent.getAttribute('itemminheight');
        if (!itemMinHeight.includes('em') && !itemMinHeight.includes('rem') && !itemMinHeight.includes('px')) {
          itemMinHeight = `${itemMinHeight}px`;
        }

        let itemMinWidth: string = bizyVirtualScrollComponent.getAttribute('itemminwidth');
        if (!itemMinWidth.includes('em') && !itemMinWidth.includes('rem') && !itemMinWidth.includes('px')) {
          itemMinWidth = `${itemMinWidth}px`;
        }

        if (itemMinWidth.includes('rem')) {
          const fontSize = window.getComputedStyle(this.elRef.nativeElement, null).getPropertyValue('font-size');
          if (fontSize) {
            itemMinWidth = `${Number(itemMinWidth.split('rem')[0])}em`;
          }
        }

        this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateColumns', `repeat(auto-fill, minmax(${itemMinWidth}, 1fr))`);
        this.renderer.setStyle(this.elRef.nativeElement, 'gridTemplateRows', itemMinHeight);
      }
    });
  }
}
