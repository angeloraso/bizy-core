import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[bizyOnlyNumbers]'
})
export class OnlyNumbersDirective {
  @Input('bizyOnlyNumbers') public onlyNumbers: boolean;
  regexStr = '^[0-9]*$';

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (typeof this.onlyNumbers === 'undefined' || this.onlyNumbers === null || this.onlyNumbers === false) {
      return
    }

    let e = <KeyboardEvent>event;
    const ignore = ['Backspace', 'backspace', 'delete', 'Delete', 'Tab', 'tab', 'Escape', 'escape', 'Enter', 'enter', 'Subtract', 'subtract'];
    if (ignore.indexOf(e.key) !== -1 ||
      // Allow: Ctrl+A
      (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // Let it happen, don't do anything
      return;
    }

    let regEx = new RegExp(this.regexStr);
    if (!regEx.test(e.key)) {
      e.preventDefault();
    }
  }
}
