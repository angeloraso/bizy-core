import { BehaviorSubject, Observable } from 'rxjs';
import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gridFor]',
})

export class BizyGridForDirective {
  readonly viewContainerRef = inject(ViewContainerRef);
  readonly templateRef = inject(TemplateRef);
  #items = new BehaviorSubject<Array<unknown>>([]);

  get items$(): Observable<Array<unknown>> {
    return this.#items.asObservable();
  }

  @Input('gridForOf') set gridForOf(items: Array<unknown>) {
    this.#items.next(items);
  }
}
