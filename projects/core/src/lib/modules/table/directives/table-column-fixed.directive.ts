import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  inject,
} from '@angular/core';
import { getClosestCssVariable } from '../../../utils/css';

@Directive({
  selector: '[bizyTableColumnFixed]',
})
export class BizyTableColumnFixedDirective {
  readonly #elementRef = inject(ElementRef);
  readonly #renderer = inject(Renderer2);
  #originalBoxShadow: string = '';
  #originalBackgroundColor: string = '';
  #originalZIndex: string = '';
  #originalPosition: string = '';
  
  ngAfterViewInit() {
    const element = this.#elementRef.nativeElement;
    this.#originalBoxShadow = getClosestCssVariable(element, 'box-shadow') ?? '';
    this.#originalZIndex = getClosestCssVariable(element, 'z-index') ?? '';
    this.#originalBackgroundColor = getClosestCssVariable(element, 'background-color') ?? '';
    this.#originalPosition = getClosestCssVariable(element, 'position') ?? '';
  }


  @Input('bizyTableColumnFixed') set tableColumnFixed(value: boolean) {
      if (typeof value === 'undefined' || value === null) {
        return;
      }

      if (value) {
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', '1');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'backgroundColor', 'inherit');
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'position', 'relative');

        this.#elementRef.nativeElement.setMarginLeft = this.setMarginLeft;
      } else {
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', this.#originalZIndex);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'position', this.#originalPosition);
        this.#renderer.setStyle(this.#elementRef.nativeElement, 'backgroundColor', this.#originalBackgroundColor);
        this.#elementRef.nativeElement.setMarginLeft = null;
      }
  }

  setMarginLeft = (marginLeft: number): void => {
    if (marginLeft > 0) {
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', '16px 0px 15px -5px rgba(0,0,0,0.37)');
    } else {
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'zIndex', '0');
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'boxShadow', this.#originalBoxShadow);
    }

    this.#renderer.setStyle(this.#elementRef.nativeElement, 'left', `${marginLeft - 5}px`);
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'paddingLeft', '5px');
  }
}
