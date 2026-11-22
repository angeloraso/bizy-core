
import { getClosestCssVariable } from '../utils/css';
import { Directive, Input, ElementRef, HostListener, Renderer2, RendererStyleFlags2, OnDestroy, inject, DOCUMENT } from '@angular/core';

export enum BIZY_TOOLTIP_PLACEMENT {
  ANY = 'any',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

@Directive({
  selector: '[bizyTooltip]'
})
export class BizyTooltipDirective implements OnDestroy {
  @Input() tooltipCustomClass: string = '';
  @Input() tooltipPlacement: BIZY_TOOLTIP_PLACEMENT | `${BIZY_TOOLTIP_PLACEMENT}` = BIZY_TOOLTIP_PLACEMENT.ANY;
  @Input() tooltipDelay: number = 0; // Milliseconds
  @Input() showTooltip: boolean = true;
  @Input() tooltipLongPressDuration: number = 500; // Milliseconds

  readonly #elementRef = inject(ElementRef);
  readonly #renderer = inject(Renderer2);
  readonly #document = inject(DOCUMENT);  

  #tooltip: HTMLElement | null = null;
  #hiding: boolean = false;
  #hideTimeout: number | null = null;
  #longPressTimeout: any = null;
  #lineClamp: number = 0;
  #text: string | null = null;
  #removePositionListeners: (() => void) | null = null;

  @Input() set tooltipLineClamp(lineClamp: number) {
    if (!lineClamp && lineClamp <= 0) {
      return;
    }

    this.#lineClamp = lineClamp;

    const lineHeight = getClosestCssVariable(this.#elementRef.nativeElement, 'line-height');
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
      this.#renderer.setStyle(this.#elementRef.nativeElement, 'max-height', `calc(${this.#lineClamp} * ${lineHeight})`);
    }

  }

  @Input('bizyTooltip') set tooltipText(tooltipText: string) {
    if (!tooltipText) {
      return;
    }

    this.#text = tooltipText;
  }

  // Deprecated
  @Input() set delay(delay: number) {
    if (typeof delay === 'undefined' || delay === null ) {
      return;
    }

    this.tooltipDelay = delay;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.#tooltip || this.#hiding) {
      
      if (!this.#text) {
        this.#text = this.#elementRef.nativeElement.textContent;
      }

      if (!this.#text) {
        return;
      }

      this.#show();
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    if (this.#longPressTimeout) {
      clearTimeout(this.#longPressTimeout);
    }

    if (event.relatedTarget instanceof Node && this.#tooltip?.contains(event.relatedTarget)) {
      return;
    }

    if (this.#tooltip && !this.#hiding) {
      if (!this.#text) {
        return;
      }

      this.#hiding = true;
      this.#hide();
    }

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

    if (this.#hideTimeout !== null) {
      window.clearTimeout(this.#hideTimeout);
      this.#hideTimeout = null;
    }
    if (this.#tooltip) {
      this.#renderer.removeChild(this.#document.body, this.#tooltip);
    }
    this.#hiding = false;
    this.#create();
    this.#setPosition();
    this.#listenForPositionChanges();
    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip-identify');
    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip--show');
  }

  #hide() {
    if (!this.#tooltip || this.#hideTimeout !== null) {
      return;
    }
    this.#hiding = true;
    this.#removePositionListeners?.();
    this.#removePositionListeners = null;
    this.#renderer.removeClass(this.#tooltip, 'bizy-tooltip--show');
    this.#hideTimeout = window.setTimeout(() => {
      this.#renderer.removeChild(this.#document.body, this.#tooltip);
      this.#tooltip = null;
      this.#hideTimeout = null;
    }, this.tooltipDelay);
  }

  #create() {
    this.#tooltip = this.#renderer.createElement('span');
    const content = this.#renderer.createElement('span');
    this.#renderer.addClass(content, 'bizy-tooltip-content');
    this.#renderer.setStyle(content, 'display', 'block');
    this.#renderer.setStyle(content, 'overflow', 'auto');
    this.#renderer.appendChild(this.#tooltip, content);

    const sentences = String(this.#text).split('</br>');
    sentences.forEach(_sentence => {
      this.#renderer.appendChild(
        content,
        this.#renderer.createText(_sentence)
      );
      this.#renderer.appendChild(
        content,
        this.#renderer.createElement('br')
      );
    });

    this.#renderer.appendChild(this.#document.body, this.#tooltip);

    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip');
    this.#tooltip!.addEventListener('mouseleave', event => {
      if (event.relatedTarget instanceof Node && this.#elementRef.nativeElement.contains(event.relatedTarget)) {
        return;
      }
      this.#hide();
    });
    this.#renderer.setStyle(this.#tooltip, 'width', 'max-content');
    if (this.tooltipCustomClass) {
      this.#renderer.addClass(this.#tooltip, this.tooltipCustomClass);
    }

    if (this.tooltipDelay > 0) {
      this.#renderer.setStyle(this.#tooltip, '-webkit-transition', 'opacity ' + this.tooltipDelay + 'ms');
      this.#renderer.setStyle(this.#tooltip, '-moz-transition', 'opacity ' + this.tooltipDelay + 'ms');
      this.#renderer.setStyle(this.#tooltip, '-o-transition', 'opacity ' + this.tooltipDelay + 'ms');
      this.#renderer.setStyle(this.#tooltip, 'transition', 'opacity ' + this.tooltipDelay + 'ms');
    }
  }

  #setPosition() {
    if (!this.#tooltip) {
      return;
    }

    const viewport = this.#document.defaultView;
    if (!viewport) {
      return;
    }

    const elRefPosition = this.#elementRef.nativeElement.getBoundingClientRect();
    const placements = [
      BIZY_TOOLTIP_PLACEMENT.TOP,
      BIZY_TOOLTIP_PLACEMENT.RIGHT,
      BIZY_TOOLTIP_PLACEMENT.BOTTOM,
      BIZY_TOOLTIP_PLACEMENT.LEFT
    ];
    const viewportWidth = this.#document.documentElement.clientWidth;
    const viewportHeight = this.#document.documentElement.clientHeight;
    const automatic = this.tooltipPlacement === BIZY_TOOLTIP_PLACEMENT.ANY;
    const candidates = automatic ? placements : [this.tooltipPlacement];
    const content = this.#tooltip.firstElementChild as HTMLElement;

    // Start each recalculation with the natural size, so a previous constraint
    // does not prevent the tooltip from expanding when more space is available.
    this.#renderer.removeClass(this.#tooltip, 'bizy-tooltip--constrained');
    this.#renderer.removeStyle(this.#tooltip, 'max-width');
    this.#renderer.removeStyle(this.#tooltip, 'max-height');
    this.#renderer.removeStyle(this.#tooltip, 'box-sizing');
    this.#renderer.removeStyle(content, 'max-height');
    this.#renderer.removeStyle(content, 'max-width');
    this.#renderer.removeStyle(content, 'overflow-wrap');
    this.#renderer.removeStyle(this.#tooltip, '--bizy-tooltip-arrow-x', RendererStyleFlags2.DashCase);
    this.#renderer.removeStyle(this.#tooltip, '--bizy-tooltip-arrow-y', RendererStyleFlags2.DashCase);

    for (const placement of candidates) {
      const bounds = this.#positionTooltip(placement, elRefPosition);
      if (bounds.top >= 0 && bounds.left >= 0 && bounds.right <= viewportWidth && bounds.bottom <= viewportHeight) {
        return;
      }
    }

    if (!automatic) {
      return;
    }

    const margin = 8;
    const availableWidth = Math.max(0, viewportWidth - margin * 2);
    const availableHeight = Math.max(0, viewportHeight - margin * 2);
    const naturalStyle = viewport.getComputedStyle(this.#tooltip);
    const naturalMaxWidth = naturalStyle.maxWidth;
    const horizontalInset = parseFloat(naturalStyle.paddingLeft) + parseFloat(naturalStyle.paddingRight)
      + parseFloat(naturalStyle.borderLeftWidth) + parseFloat(naturalStyle.borderRightWidth);
    const verticalInset = parseFloat(naturalStyle.paddingTop) + parseFloat(naturalStyle.paddingBottom)
      + parseFloat(naturalStyle.borderTopWidth) + parseFloat(naturalStyle.borderBottomWidth);
    const constrain = (width: number, height: number) => {
      this.#renderer.setStyle(this.#tooltip, 'max-width', naturalMaxWidth === 'none'
        ? width + 'px'
        : `min(${naturalMaxWidth}, ${width}px)`);
      this.#renderer.setStyle(this.#tooltip, 'max-height', height + 'px');
      // Constrain the scrolling element itself. Limiting only the outer span
      // can leave its child at the full text height and paint outside the box.
      this.#renderer.setStyle(content, 'max-height', Math.max(0, height - verticalInset) + 'px');
      this.#renderer.setStyle(content, 'max-width', Math.max(0, width - horizontalInset) + 'px');
    };
    this.#renderer.addClass(this.#tooltip, 'bizy-tooltip--constrained');
    this.#renderer.setStyle(this.#tooltip, 'box-sizing', 'border-box');
    this.#renderer.setStyle(content, 'overflow-wrap', 'anywhere');
    constrain(availableWidth, availableHeight);

    // Prefer TOP with a horizontal adjustment before changing direction.
    let placement = BIZY_TOOLTIP_PLACEMENT.TOP;
    let bounds = this.#positionTooltip(placement, elRefPosition);
    if (bounds.top < margin) {
      const spaces = [
        { placement, width: availableWidth, height: Math.min(availableHeight, Math.max(0, elRefPosition.top - 10 - margin)) },
        { placement: BIZY_TOOLTIP_PLACEMENT.RIGHT, width: Math.min(availableWidth, Math.max(0, viewportWidth - elRefPosition.right - 10 - margin)), height: availableHeight },
        { placement: BIZY_TOOLTIP_PLACEMENT.BOTTOM, width: availableWidth, height: Math.min(availableHeight, Math.max(0, viewportHeight - elRefPosition.bottom - 10 - margin)) },
        { placement: BIZY_TOOLTIP_PLACEMENT.LEFT, width: Math.min(availableWidth, Math.max(0, elRefPosition.left - 10 - margin)), height: availableHeight }
      ];
      const usableArea = (space: { width: number; height: number }) =>
        Math.max(0, space.width - horizontalInset) * Math.max(0, space.height - verticalInset);
      const best = spaces.reduce((current, candidate) =>
        usableArea(candidate) > usableArea(current) ? candidate : current);
      placement = best.placement;
      // A host that covers the viewport can leave no usable side at all.
      // In that case allow overlap so the content can still be read.
      if (usableArea(best) > 0) {
        constrain(best.width, best.height);
      }
      bounds = this.#positionTooltip(placement, elRefPosition);
    }

    const left = Math.max(margin, Math.min(bounds.left, viewportWidth - margin - bounds.width));
    const top = Math.max(margin, Math.min(bounds.top, viewportHeight - margin - bounds.height));
    this.#renderer.setStyle(this.#tooltip, 'left', (left + viewport.scrollX) + 'px');
    this.#renderer.setStyle(this.#tooltip, 'top', (top + viewport.scrollY) + 'px');
    const arrowX = Math.max(10, Math.min(elRefPosition.left + elRefPosition.width / 2 - left, bounds.width - 10));
    const arrowY = Math.max(10, Math.min(elRefPosition.top + elRefPosition.height / 2 - top, bounds.height - 10));
    this.#renderer.setStyle(this.#tooltip, '--bizy-tooltip-arrow-x', arrowX + 'px', RendererStyleFlags2.DashCase);
    this.#renderer.setStyle(this.#tooltip, '--bizy-tooltip-arrow-y', arrowY + 'px', RendererStyleFlags2.DashCase);
  }

  #positionTooltip(placement: `${BIZY_TOOLTIP_PLACEMENT}`, host: DOMRect): DOMRect {
    const tooltip = this.#tooltip!;
    const viewport = this.#document.defaultView!;
    for (const direction of [BIZY_TOOLTIP_PLACEMENT.TOP, BIZY_TOOLTIP_PLACEMENT.RIGHT, BIZY_TOOLTIP_PLACEMENT.BOTTOM, BIZY_TOOLTIP_PLACEMENT.LEFT]) {
      this.#renderer.removeClass(tooltip, 'bizy-tooltip-' + direction);
    }
    this.#renderer.addClass(tooltip, 'bizy-tooltip-' + placement);
    const { width, height } = tooltip.getBoundingClientRect();
    let top = host.top - height - 10;
    let left = host.left + (host.width - width) / 2;
    switch (placement) {
      case BIZY_TOOLTIP_PLACEMENT.RIGHT:
        top = host.top + (host.height - height) / 2;
        left = host.right + 10;
        break;
      case BIZY_TOOLTIP_PLACEMENT.BOTTOM:
        top = host.bottom + 10;
        break;
      case BIZY_TOOLTIP_PLACEMENT.LEFT:
        top = host.top + (host.height - height) / 2;
        left = host.left - width - 10;
        break;
    }
    this.#renderer.setStyle(tooltip, 'top', (top + viewport.scrollY) + 'px');
    this.#renderer.setStyle(tooltip, 'left', (left + viewport.scrollX) + 'px');
    return tooltip.getBoundingClientRect();
  }

  #listenForPositionChanges() {
    const viewport = this.#document.defaultView;
    if (!viewport || this.#removePositionListeners) {
      return;
    }

    const reposition = (event: Event) => {
      // Scrolling the tooltip's content must preserve its size and scroll offset.
      if (event.target instanceof Node && this.#tooltip?.contains(event.target)) {
        return;
      }
      this.#setPosition();
    };
    // Capture also receives scroll events from nested scroll containers.
    viewport.addEventListener('scroll', reposition, { capture: true, passive: true });
    viewport.addEventListener('resize', reposition);
    this.#removePositionListeners = () => {
      viewport.removeEventListener('scroll', reposition, true);
      viewport.removeEventListener('resize', reposition);
    };
  }

  #isTextTruncated = (element: HTMLElement) => {
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = element;
    return this.#lineClamp === 1 ? scrollWidth > clientWidth : scrollHeight > clientHeight;
  }

  ngOnDestroy() {
    this.#removePositionListeners?.();
    if (this.#longPressTimeout !== null) {
      clearTimeout(this.#longPressTimeout);
    }
    if (this.#hideTimeout !== null) {
      window.clearTimeout(this.#hideTimeout);
    }
    if (this.#tooltip) {
      this.#renderer.removeChild(this.#document.body, this.#tooltip);
      this.#tooltip = null;
    }
  }
}
