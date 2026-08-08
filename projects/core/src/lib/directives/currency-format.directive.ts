import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import type AutoNumeric from 'autonumeric';

@Directive({
  selector: '[bizyCurrencyFormat]'
})
export class BizyCurrencyFormatDirective implements OnInit, OnDestroy {
  @Input('bizyCurrencyFormat') bizyCurrencyFormat: boolean = false;
  @Input('bizyCurrencyOptions') options: AutoNumeric.Options = {};

  #autoNumericInstance: AutoNumeric | null = null;
  #destroyed = false;

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof this.bizyCurrencyFormat === 'undefined' || this.bizyCurrencyFormat === null || this.bizyCurrencyFormat === false) {
      return
    }

    const { default: AutoNumericConstructor } = await import('autonumeric');
    if (this.#destroyed) {
      return;
    }

    this.#autoNumericInstance = new AutoNumericConstructor(this.elementRef.nativeElement, this.options);
    this.elementRef.nativeElement.getValue = this.getValue;
    this.elementRef.nativeElement.setValue = this.setValue;
  }

  ngOnDestroy(): void {
    this.#destroyed = true;
    if (this.#autoNumericInstance) {
      this.#autoNumericInstance.remove();
    }
  }

  getValue = (): number => {
    return this.#autoNumericInstance?.getNumber() ?? 0;
  }

  setValue = (value: number): void => {
    this.#autoNumericInstance?.set(value);
  }
}
