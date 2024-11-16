import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[bizyOnlyNumbers]'
})
export class BizyOnlyNumbersDirective {
  @Input('bizyOnlyNumbers') public onlyNumbers: boolean;
  #regex: RegExp = new RegExp(/^-?\d+([.,]?\d+)*$/);
  #specialKeys = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];

  constructor(@Inject(ElementRef) private elementRef: ElementRef){}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
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
    if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
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

    // Allow numbers and decimals
    let current: string = this.elementRef.nativeElement.value;
    let next: string = current.concat(event.key);

    if (next && !String(next).match(this.#regex)) {
      event.preventDefault();
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

    // Ensure only one decimal separator
    const parts = newValue.split(/[,\.]/);
    if (parts.length > 2) {
      newValue = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    return newValue;
  }
}
