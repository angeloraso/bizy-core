import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { BizyCopyToClipboardService } from './copy-to-clipboard.service';

@Directive({
  selector: '[bizyCopyToClipboard]',
})
export class BizyCopyToClipboardDirective {
  @Output() onCopy = new EventEmitter<void>();
  #svgElement: HTMLElement;

  readonly #COPY_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/>
  </svg>`;

  readonly #CHECK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
  </svg>`;

  readonly #ERROR_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
  </svg>`

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(BizyCopyToClipboardService) private copyToClipboard: BizyCopyToClipboardService
  ) {
    this.#svgElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.#svgElement, 'position', 'absolute');
    this.renderer.setStyle(this.#svgElement, 'right', '0');
    this.renderer.setStyle(this.#svgElement, 'opacity', '0');
    this.renderer.setStyle(this.#svgElement, 'background', 'linear-gradient(to left, rgb(255, 255, 255), rgba(0, 0, 0, 0))');
    this.renderer.setStyle(this.#svgElement, 'paddingLeft', '5rem');
    this.renderer.setStyle(this.#svgElement, 'transition', 'opacity 0.2s ease-in-out');
    this.renderer.appendChild(this.elementRef.nativeElement, this.#svgElement);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.#svgElement.innerHTML = this.#COPY_ICON;
    this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-default-color)');
    const elementHeight = this.elementRef.nativeElement.offsetHeight - 4;
    this.renderer.setStyle(this.#svgElement, 'height', `${elementHeight}px`);
    const svg = this.#svgElement.querySelector('svg');
    if (svg) {
      this.renderer.setStyle(svg, 'height', '100%');
      this.renderer.setStyle(svg, 'width', 'auto');
      this.renderer.setStyle(svg, 'pointerEvents', 'none');
    }
    this.#setVisibility(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.#setVisibility(false);
  }

  @HostListener('click', ['$event']) onClick(event) {
    if (!this.elementRef.nativeElement.innerText){
        return;
    }

    event.stopPropagation();
    this.copyToClipboard.copy(this.elementRef.nativeElement.innerText.trim()).then(() => {
        this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-success-color)');
        this.#svgElement.innerHTML = this.#CHECK_ICON;
        this.onCopy.emit();
    }).catch(() => {
        this.renderer.setStyle(this.#svgElement, 'fill', 'var(--bizy-copy-to-clipboard-danger-color)');
        this.#svgElement.innerHTML = this.#ERROR_ICON;
    }).finally(() => {
        const elementHeight = this.elementRef.nativeElement.offsetHeight - 1;
        this.renderer.setStyle(this.#svgElement, 'height', `${elementHeight}px`);
        const svg = this.#svgElement.querySelector('svg');
        if (svg) {
            this.renderer.setStyle(svg, 'height', '100%');
            this.renderer.setStyle(svg, 'width', 'auto');
            this.renderer.setStyle(svg, 'pointerEvents', 'none');
        }
    })
  }

  #setVisibility(visible: boolean) {
    this.renderer.setStyle(this.#svgElement, 'opacity', visible ? '1' : '0');
  }
}
