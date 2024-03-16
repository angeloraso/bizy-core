import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { ITableRow } from '../table.types';

@Directive({
  selector: '[tableFor]',
})

export class TableScrollingDirective {

  #items = new BehaviorSubject<Array<ITableRow>>([]);

  get items$(): Observable<Array<ITableRow>> {
    return this.#items.asObservable();
  }

  @Input()
  set tableForIn(value: Array<ITableRow>) {
    this.#items.next(value);
  }    

  constructor(
    @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) public template: TemplateRef<TableRowComponent>,
    @Inject(ChangeDetectorRef) public ref: ChangeDetectorRef,
  ) { }
}
