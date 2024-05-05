import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';

@Directive({
  selector: '[tableFor]',
})

export class BizyTableScrollingDirective<T> {

  #items = new BehaviorSubject<Array<T>>([]);

  get items$(): Observable<Array<T>> {
    return this.#items.asObservable();
  }

  @Input()
  set tableForIn(value: Array<T>) {
    this.#items.next(value);
  }    

  constructor(
    @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) public template: TemplateRef<BizyTableRowComponent>,
    @Inject(ChangeDetectorRef) public ref: ChangeDetectorRef,
  ) { }
}
