import { DOCUMENT } from '@angular/common';
import { Directive, Input, ElementRef, HostListener, Renderer2, Inject } from '@angular/core';

@Directive({
  selector: '[bizyTooltip]'
})
export class TooltipDirective {
  @Input('bizyTooltip') tooltipTitle: string = '';
  @Input() customClass: string;
  @Input() clickeable: boolean = false;
  @Input() placement: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() delay: string; // Milliseconds, Ej; 500, 1000, etc
  tooltip: HTMLElement | null;
  hiding: boolean;

  constructor(
    @Inject(ElementRef) private elRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      if (!this.tooltipTitle) {
        return;
      }

      this.hiding = false;
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip && !this.hiding) {
      if (!this.tooltipTitle) {
        return;
      }

      this.hiding = true;
      this.hide();
    }

    // Fix fixed tooltips
    this.document.querySelectorAll('.bizy-tooltip-identify').forEach(element => {
      this.renderer.removeChild(this.document.body, element);
    });
  }

  @HostListener('click') onClick() {
    if (this.tooltip && !this.hiding) {
      this.hiding = true;
      this.hide();
      return;
    }

    if (!this.tooltip && this.tooltipTitle && this.clickeable) {
      this.hiding = false;
      this.show();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'bizy-tooltip-identify');
    this.renderer.addClass(this.tooltip, 'bizy-tooltip--show');
    if (this.customClass) {
      this.renderer.addClass(this.tooltip, this.customClass);
    }
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'bizy-tooltip--show');
    window.setTimeout(() => {
      this.renderer.removeChild(this.document.body, this.tooltip);
      this.tooltip = null;
    }, Number(this.delay));
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    const sentences = String(this.tooltipTitle).split('</br>');
    sentences.forEach(_sentence => {
      this.renderer.appendChild(
        this.tooltip,
        this.renderer.createText(_sentence)
      );
      this.renderer.appendChild(
        this.tooltip,
        this.renderer.createElement('br')
      );
    });

    this.renderer.appendChild(this.document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'bizy-tooltip');
    this.renderer.addClass(this.tooltip, 'bizy-tooltip-' + this.placement);

    if (this.delay) {
      this.renderer.setStyle(this.tooltip, '-webkit-transition', 'opacity ' + this.delay + 'ms');
      this.renderer.setStyle(this.tooltip, '-moz-transition', 'opacity ' + this.delay + 'ms');
      this.renderer.setStyle(this.tooltip, '-o-transition', 'opacity ' + this.delay + 'ms');
      this.renderer.setStyle(this.tooltip, 'transition', 'opacity ' + this.delay + 'ms');
    }
  }

  setPosition() {
    const elRefPosition = this.elRef.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip?.getBoundingClientRect();

    const scrollPos = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    let top;
    let left;

    if (this.placement === 'top') {
      // @ts-ignore
      top = elRefPosition.top - tooltipPos.height - 10;
      // @ts-ignore
      left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
    } else if (this.placement === 'right') {
      // @ts-ignore
      top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
      left = elRefPosition.right + 10;
    } else if (this.placement === 'bottom') {
      top = elRefPosition.bottom + 10;
      // @ts-ignore
      left = elRefPosition.left + ((elRefPosition.width - tooltipPos.width) / 2);
    } else if (this.placement === 'left') {
      // @ts-ignore
      top = elRefPosition.top + ((elRefPosition.height - tooltipPos.height) / 2);
      // @ts-ignore
      left = elRefPosition.left - tooltipPos.width - 10;
    }

    this.renderer.setStyle(this.tooltip, 'top', (top + scrollPos) + 'px');
    this.renderer.setStyle(this.tooltip, 'left', left + 'px');
  }
}
