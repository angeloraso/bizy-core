import { BehaviorSubject, Observable } from 'rxjs';
import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gridFor]',
})

export class BizyGridForDirective {
  #items = new BehaviorSubject<Array<unknown>>([]);

  get items$(): Observable<Array<unknown>> {
    return this.#items.asObservable();
  }

  @Input('gridForOf') set gridForOf(items: Array<unknown>) {
    this.#items.next(items);
  }

  constructor(
    @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) public templateRef: TemplateRef<unknown>
  ) { }
}
