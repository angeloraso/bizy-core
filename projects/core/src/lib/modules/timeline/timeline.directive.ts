import { Directive, inject, Input, signal, TemplateRef, TrackByFunction } from '@angular/core';

export interface BizyTimelineForContext<T> {
  $implicit: T;
  index: number;
  count: number;
  first: boolean;
  last: boolean;
  even: boolean;
  odd: boolean;
}

@Directive({
  selector: '[bizyTimelineFor]'
})
export class BizyTimelineForDirective<T> {
  readonly templateRef = inject<TemplateRef<BizyTimelineForContext<T>>>(TemplateRef);
  readonly items = signal<readonly T[]>([]);

  @Input('bizyTimelineForOf') set bizyTimelineForOf(items: readonly T[] | null | undefined) {
    this.items.set(items ?? []);
  }

  @Input('bizyTimelineForTrackBy') trackBy: TrackByFunction<T> = (_index, item) => item;

  static ngTemplateContextGuard<T>(
    _directive: BizyTimelineForDirective<T>,
    context: unknown
  ): context is BizyTimelineForContext<T> {
    return true;
  }
}
