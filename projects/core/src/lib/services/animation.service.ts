import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export enum BIZY_ANIMATION {
  FADE_IN = 'fade-in',
  FADE_OUT = 'fade-out',
  FADE_IN_UP = 'fade-in-up',
  FADE_IN_RIGHT = 'fade-in-right',
  FADE_IN_DOWN = 'fade-in-down',
  FADE_IN_LEFT = 'fade-in-left',
  SLIDE_IN_UP = 'slide-in-up',
  SLIDE_IN_RIGHT = 'slide-in-right',
  SLIDE_IN_DOWN = 'slide-in-down',
  SLIDE_IN_LEFT = 'slide-in-left',
  SLIDE_OUT_UP = 'slide-out-up',
  SLIDE_OUT_DOWN = 'slide-out-down',
  SLIDE_OUT_RIGHT = 'slide-out-right',
  SLIDE_OUT_LEFT = 'slide-out-left',
}

@Injectable({
  providedIn: 'root'
})
export class BizyAnimationService {
  #renderer: Renderer2;

  constructor(@Inject(RendererFactory2) private rendererFactory: RendererFactory2) {
    this.#renderer = this.rendererFactory.createRenderer(null, null);
  }

  setAnimation(element: HTMLElement, animation: BIZY_ANIMATION) {
    return new Promise<void>(resolve => {
      if (!element || !animation || !this.#renderer) {
        return;
      }
  
      const root = this.#renderer.selectRootElement(':root', true);
      const animationTimeout = getComputedStyle(root).getPropertyValue('--bizy-animation-timeout').trim();
  
      this.#renderer.addClass(element, 'animated');
      this.#renderer.addClass(element, animation);
      setTimeout(() => {
        this.#renderer.removeClass(element, 'animated');
        this.#renderer.removeClass(element, animation);
        resolve();
      }, Number(animationTimeout.match(/\d/g).join('')))
    })
  }
}