import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[bizyCurrencyFormat]'
})
export class BizyCurrencyFormatDirective {
  @Input('bizyCurrencyFormat') public currencyFormat: boolean;
  #specialKeys = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];

  constructor(@Inject(ElementRef) private elementRef: ElementRef){}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (typeof this.currencyFormat === 'undefined' || this.currencyFormat === null || this.currencyFormat === false) {
      return
    }
    
    const inputElement = this.elementRef.nativeElement as HTMLInputElement;
    const value = inputElement.value;

    // Format and validate input value
    const formattedValue = this.#formatValue(value);
    if (formattedValue !== value) {
      inputElement.value = formattedValue;
      event.stopImmediatePropagation();
    }
  }
  
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (typeof this.currencyFormat === 'undefined' || this.currencyFormat === null || this.currencyFormat === false) {
      return
    }

    // Allow special keys
    if (this.#specialKeys.indexOf(event.key) !== -1 ||
      // Allow: Ctrl+A
      (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+C
      (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+V
      (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+X
      (event.key === 'x' && (event.ctrlKey || event.metaKey)) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // Let it happen, don't do anything
      return;
    }
  }

  #formatValue(value: string): string {
    // Remove all non-numeric characters except . , and -
    let newValue = value.replace(/[^0-9.,-]/g, '');

    // Ensure that '-' is only at the beginning and only once
    if (newValue.indexOf('-') !== newValue.lastIndexOf('-') || (newValue.indexOf('-') !== 0)) {
      newValue = newValue.replace(/-+/g, ''); // Remove all '-' characters
    }

    // Ensure only one '-' at the beginning
    if (newValue.startsWith('-') && newValue.indexOf('-') > 0) {
      newValue = '-' + newValue.replace(/^-+/, ''); // Remove additional '-' characters
    }

    // Replace last . with ,
    if (newValue.length > 0 && newValue[newValue.length - 1] === '.') {
      newValue = newValue.slice(0, -1);
      if (!newValue.includes(',')) {
        newValue += ',';
      }
    }

    return newValue;
  }
}
