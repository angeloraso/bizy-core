import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';

@Directive({
  selector: '[tableFor]',
})

export class BizyTableScrollingDirective {

  #items = new BehaviorSubject<Array<unknown>>([]);

  get items$(): Observable<Array<unknown>> {
    return this.#items.asObservable();
  }

  @Input()
  set tableForIn(value: Array<unknown>) {
    this.#items.next(value);
  }    

  constructor(
    @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) public template: TemplateRef<BizyTableRowComponent>,
    @Inject(ChangeDetectorRef) public ref: ChangeDetectorRef,
  ) { }
}
