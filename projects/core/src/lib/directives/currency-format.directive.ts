import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import AutoNumeric from 'autonumeric';

@Directive({
  selector: '[bizyCurrencyFormat]'
})
export class BizyCurrencyFormatDirective implements OnInit, OnDestroy {
  @Input('bizyCurrencyFormat') bizyCurrencyFormat: boolean = false;
  @Input('bizyCurrencyOptions') options: AutoNumeric.Options = {};

  #autoNumericInstance!: AutoNumeric;

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (typeof this.bizyCurrencyFormat === 'undefined' || this.bizyCurrencyFormat === null || this.bizyCurrencyFormat === false) {
      return
    }

    this.#autoNumericInstance = new AutoNumeric(this.elementRef.nativeElement, this.options);
    this.elementRef.nativeElement.getValue = this.getValue;
    this.elementRef.nativeElement.setValue = this.setValue;
  }

  ngOnDestroy(): void {
    if (this.#autoNumericInstance) {
      this.#autoNumericInstance.remove();
    }
  }

  getValue = (): number => {
    return this.#autoNumericInstance.getNumber();
  }

  setValue = (value: number): void => {
    this.#autoNumericInstance.set(value);
  }
}
