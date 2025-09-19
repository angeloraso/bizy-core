
import { Directive, Input, ElementRef, HostListener, Renderer2, Inject, OnDestroy, inject, DOCUMENT } from '@angular/core';

@Directive({
  selector: '[bizyTooltip]'
})
export class BizyTooltipDirective implements OnDestroy {
  @Input() tooltipCustomClass: string = '';
  @Input() tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() tooltipDelay: number = 0; // Milliseconds
  @Input() showTooltip: boolean = true;
  @Input() tooltipLongPressDuration: number = 500; // Milliseconds

  readonly #elementRef = inject(ElementRef);
  readonly #renderer = inject(Renderer2);
  readonly #document = inject(DOCUMENT);  

  #tooltip: HTMLElement | null;
  #hiding: boolean;
  #longPressTimeout: any = null;
  #lineClamp: number = 0;
  #text: string | null = null;

  @Input() set tooltipLineClamp(lineClamp: number) {
    if (!lineClamp && lineClamp <= 0) {
      return;
    }

    this.#lineClamp = lineClamp;

    const computedStyle = window.getComputedStyle(this.#elementRef.nativeElement);
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'width', '100%');
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'min-width', '0');
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'overflow', 'hidden');
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'text-overflow', 'ellipsis');

    if (lineClamp === 1) {
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'white-space', 'nowrap');
    } else {
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'display', '-webkit-box');
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'line-clamp', this.#lineClamp);
      this.#renderer.setStyle(this.#elementRef.nativeElement, '-webkit-line-clamp', this.#lineClamp);
      this.#renderer.setStyle(this.#elementRef.nativeElement, '-webkit-box-orient', 'vertical');
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'max-height', `calc(${this.#lineClamp} * ${computedStyle.lineHeight})`);
    }

  }

  @Input('bizyTooltip') set tooltipText(tooltipText: string) {
    if (!tooltipText) {
      return;
    }

    this.#text = tooltipText;
  }

  // Deprecated
  @Input() set placement(placement: 'top' | 'right' | 'bottom' | 'left') {
    if (!placement) {
      return;
    }

    this.tooltipPlacement = placement;
  }

  // Deprecated
  @Input() set delay(delay: number) {
    if (typeof delay === 'undefined' || delay === null ) {
      return;
    }

    this.tooltipDelay = delay;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.#tooltip) {
      
      if (!this.#text) {
        this.#text = this.#elementRef.nativeElement.textContent;
      }

      if (!this.#text) {
        return;
      }

      this.#hiding = false;
      this.#show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.#longPressTimeout) {
      clearTimeout(this.#longPressTimeout);
    }

    if (this.#tooltip && !this.#hiding) {
      if (!this.#text) {
        return;
      }

      this.#hiding = true;
      this.#hide();
    }

    // Fix fixed tooltips
    this.#document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
      this.#renderer.removeChild(this.#document.body, element);
    });
  }

  @HostListener('mouseup') onMouseUp() {
    if (this.#longPressTimeout) {
      clearTimeout(this.#longPressTimeout);
    }
  }

  @HostListener('click') onClick() {
    if (this.#tooltip && !this.#hiding) {
      this.#hiding = true;
      this.#hide();
      return;
    }


    if (!this.#text) {
      this.#text = this.#elementRef.nativeElement.textContent;
    }

    if (!this.#tooltip && this.#text) {
      this.#longPressTimeout = setTimeout(() => {
        this.#hiding = false;
        this.#show();
      }, this.tooltipLongPressDuration);
    }
  }

  #show() {
    if (!this.showTooltip || (this.#lineClamp > 0 && !this.#isTextTruncated(this.#elementRef.nativeElement))) {
      return;
    }

    this.#create();
    this.#setPosition();
    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-identify');
    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip--show');
    if (this.tooltipCustomClass) {
      this.#renderer.addClass(this.#tooltip, this.tooltipCustomClass);
    }
  }

  #hide() {
    this.#renderer.removeClass(this.#tooltip, 'bizy-tooltip--show');
    window.setTimeout(() => {
      this.#renderer.removeChild(this.#document.body, this.#tooltip);
      this.#tooltip = null;
    }, this.tooltipDelay);
  }

  #create() {
    this.#tooltip = this.#renderer.createElement('span');

    const sentences = String(this.#text).split('</br>');
    sentences.forEach(_sentence => {
      this.#renderer.appendChild(
        this.#tooltip,
        this.#renderer.createText(_sentence)
      );
      this.#renderer.appendChild(
        this.#tooltip,
        this.#renderer.createElement('br')
      );
    });

    this.#renderer.appendChild(this.#document.body, this.#tooltip);

    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip');
    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-' + this.tooltipPlacement);

    if (this.tooltipDelay > 0) {
      this.#renderer.setStyle(this.#tooltip, '-webkit-transition', 'opacity ' + this.tooltipDelay + 'ms');
      this.#renderer.setStyle(this.#tooltip, '-moz-transition', 'opacity ' + this.tooltipDelay + 'ms');
      this.#renderer.setStyle(this.#tooltip, '-o-transition', 'opacity ' + this.tooltipDelay + 'ms');
      this.#renderer.setStyle(this.#tooltip, 'transition', 'opacity ' + this.tooltipDelay + 'ms');
    }
  }

  #setPosition() {
    const elRefPosition = this.#elementRef.nativeElement.getBoundingClientRect();

    const tooltipPos = this.#tooltip?.getBoundingClientRect();

    const scrollPos = window.pageYOffset || this.#document.documentElement.scrollTop || this.#document.body.scrollTop || 0;

    let top;
    let left;

    if (this.tooltipPlacement === 'top') {
      // @ts-ignore
      top = elRefPosition.top - tooltipPos.height - 10;
      // @ts-ignore
      left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
    } else if (this.tooltipPlacement === 'right') {
      // @ts-ignore
      top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
      left = elRefPosition.right + 10;
    } else if (this.tooltipPlacement === 'bottom') {
      top = elRefPosition.bottom + 10;
      // @ts-ignore
      left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
    } else if (this.tooltipPlacement === 'left') {
      // @ts-ignore
      top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
      // @ts-ignore
      left = elRefPosition.left - tooltipPos.width - 10;
    }

    this.#renderer.setStyle(this.#tooltip, 'top', (top + scrollPos) + 'px');
    this.#renderer.setStyle(this.#tooltip, 'left', left + 'px');
  }

  #isTextTruncated = (element: HTMLElement) => {
    const { scrollHeight, clientHeight } = element;
    return scrollHeight > clientHeight;
  }

  ngOnDestroy() {
    this.#document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
      this.#renderer.removeChild(this.#document.body, element);
    });
  }
}
