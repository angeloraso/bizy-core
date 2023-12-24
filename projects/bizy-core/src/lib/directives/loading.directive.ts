import { Directive, Input, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { BehaviorSubject, filter, take } from 'rxjs';

@Directive({
  selector: '[bizyLoading]'
})
export class LoadingDirective implements AfterViewInit {
  @Input() fontSize: string;
  @Input() set bizyLoading(value: boolean) {
    this.currentValue = value;
    this.setSpinner();
  }

  #afterViewInit = new BehaviorSubject<boolean>(false);

  loading: boolean;
  loadingIcon: any;
  originalElement: HTMLElement;
  currentValue: boolean;

  constructor(@Inject(ElementRef) private elementRef: ElementRef, @Inject(Renderer2) private render: Renderer2) {}

  ngAfterViewInit() {
    this.#createSpinner();
    this.#afterViewInit.next(true);
  }

  setSpinner() {
    this.#afterViewInit.pipe(filter(status => status === true), take(1)).subscribe(() => {
      if (this.currentValue) {
        this.render.insertBefore(this.originalElement.parentNode, this.loadingIcon, this.originalElement);
        this.render.removeChild(this.originalElement.parentNode, this.originalElement);
        this.loading = true;
      } else if (typeof this.loading !== 'undefined') {
        this.render.insertBefore(this.loadingIcon.parentNode, this.originalElement, this.loadingIcon);
        this.render.removeChild(this.loadingIcon.parentNode, this.loadingIcon);
        this.loading = false;
      }
    })
  }

  #createSpinner() {
    this.loadingIcon = this.render.createElement('i');
    this.render.addClass(this.loadingIcon, 'fas');
    this.render.addClass(this.loadingIcon, 'fa-spinner');
    this.render.addClass(this.loadingIcon, 'fa-spin');
    this.render.setProperty(this.loadingIcon, 'aria-hidden', 'true');

    this.originalElement = this.elementRef.nativeElement;
    this.render.setStyle(this.loadingIcon, 'height', 'fit-content');
    this.render.setStyle(this.loadingIcon, 'width', 'fit-content');
    if (!this.fontSize) {
      this.render.setStyle(this.loadingIcon, 'font-size', '1rem');
    }
  }
}
