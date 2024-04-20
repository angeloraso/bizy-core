import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BizyTableRowComponent } from '../table-row/table-row.component';
import { IBizyTableRow } from '../table.types';

@Directive({
  selector: '[tableFor]',
})

export class BizyTableScrollingDirective {

  #items = new BehaviorSubject<Array<IBizyTableRow>>([]);

  get items$(): Observable<Array<IBizyTableRow>> {
    return this.#items.asObservable();
  }

  @Input()
  set tableForIn(value: Array<IBizyTableRow>) {
    this.#items.next(value);
  }    

  constructor(
    @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) public template: TemplateRef<BizyTableRowComponent>,
    @Inject(ChangeDetectorRef) public ref: ChangeDetectorRef,
  ) { }
}
