import { Directive, Input, TemplateRef, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[virtualNgFor]'
})

export class BizyVirtualScrollNgForDirective {
  public _items = new BehaviorSubject<Array<unknown>>([]);

  get items() {
    return this._items.asObservable();
  }

  @Input()
  set virtualNgForIn(items: Array<unknown>) {
    this._items.next(items);
  }

  constructor(@Inject(TemplateRef) public template: TemplateRef<any>) {}
}
