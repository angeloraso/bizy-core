import { DOCUMENT } from '@angular/common';
import {
  Directive,
  Input,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';

type LoadingType = 'spinner' | 'card' | 'item';

@Directive({
  selector: '[bizyLoading]'
})
export class BizyLoadingDirective {
  @Input() set bizyLoading(value: boolean) {
    if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
      const mutationObserver = new MutationObserver(() => {
        if ((this.elementRef.nativeElement && (this.elementRef.nativeElement.offsetWidth === 0 || this.elementRef.nativeElement.offsetHeight === 0) && !this.#originalElement)) {
          return;
        }

        this.#setLoading(value);

        mutationObserver.disconnect();
      });

      mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    } else {
      this.#setLoading(value);
    }
  }

  @Input() type: LoadingType = 'spinner';

  #loadingElement: any;
  #originalElement: HTMLElement;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  #setLoading(value: boolean) {
    if (value) {
      this.#originalElement = this.elementRef.nativeElement;
      const loadingWrapper = this.renderer.createElement('span');
      this.renderer.setStyle(loadingWrapper, 'width', `${this.elementRef.nativeElement.offsetWidth}px`);
      this.renderer.setStyle(loadingWrapper, 'height', `${this.elementRef.nativeElement.offsetHeight}px`);
      this.renderer.setStyle(loadingWrapper, 'display', 'grid');
      this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
      const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
      this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
      this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
      
      const loading = this.renderer.createElement('span');
      this.renderer.addClass(loading, `bizy-loading--${this.type}`);
      const minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
      this.renderer.setStyle(loading, 'width', `${minSize * 0.8}px`);
      this.renderer.setStyle(loading, 'height', `${minSize * 0.8}px`);
      this.renderer.setStyle(loading, 'maxWidth', '15vmax');
      this.renderer.setStyle(loading, 'maxHeight', '15vmax');

      this.renderer.appendChild(loadingWrapper, loading);

      this.#loadingElement = loadingWrapper;
        
      this.renderer.insertBefore(this.#originalElement.parentNode,this.#loadingElement,this.#originalElement);
      this.renderer.removeChild(this.#originalElement.parentNode, this.#originalElement);
    } else if (this.#loadingElement && this.#originalElement && value === false) {
      this.renderer.insertBefore(this.#loadingElement.parentNode, this.#originalElement, this.#loadingElement);
      this.renderer.removeChild(this.#loadingElement.parentNode, this.#loadingElement);
    }
  }
}
