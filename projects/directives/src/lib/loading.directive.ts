import {
  Directive,
  Input,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';

export enum LOADING_TYPE {
  SPINNER = 'spinner',
  BAR = 'bar'
}
@Directive({
  selector: '[bizyLoading]'
})
export class BizyLoadingDirective {
  @Input() set bizyLoading(value: boolean) {
    this.#setLoading(value);
  }

  @Input() bizyLoadingType: LOADING_TYPE = LOADING_TYPE.SPINNER;

  #loadingElement: any;
  #originalElement: HTMLElement;

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}

  #setLoading(value: boolean) {
    if (value) {
      this.#originalElement = this.elementRef.nativeElement;
      const width = this.elementRef.nativeElement.offsetWidth;
      const height = this.elementRef.nativeElement.offsetHeight;
      const loadingWrapper = this.renderer.createElement('span');
      this.renderer.setStyle(loadingWrapper, 'width', width ? `${this.elementRef.nativeElement.offsetWidth}px` : '1rem');
      this.renderer.setStyle(loadingWrapper, 'height', height ? `${this.elementRef.nativeElement.offsetHeight}px` : '1rem');
      this.renderer.setStyle(loadingWrapper, 'display', 'grid');
      this.renderer.setStyle(loadingWrapper, 'placeItems', 'center');
      const backgroundColor = window.getComputedStyle(this.elementRef.nativeElement, null).getPropertyValue('background-color');
      this.renderer.setStyle(loadingWrapper, 'backgroundColor', backgroundColor);
      this.renderer.setStyle(loadingWrapper, 'pointer-events', 'none');
      
      const loading = this.renderer.createElement('span');
      this.renderer.addClass(loading, `bizy-loading--${this.bizyLoadingType}`);

      if (this.bizyLoadingType === LOADING_TYPE.SPINNER) {
        let minSize = 0;
        if (this.elementRef.nativeElement.offsetWidth > 0 && this.elementRef.nativeElement.offsetHeight > 0) {
          minSize = Math.min(this.elementRef.nativeElement.offsetWidth, this.elementRef.nativeElement.offsetHeight);
        }
        this.renderer.setStyle(loading, 'width', minSize ? `${minSize}px` : '1rem');
        this.renderer.setStyle(loading, 'height', minSize ? `${minSize}px` : '1rem');
      }

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
