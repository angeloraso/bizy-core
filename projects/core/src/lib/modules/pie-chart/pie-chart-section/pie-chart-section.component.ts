import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'bizy-pie-chart-section',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizyPieChartSectionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);

  @Input() id: string | number = `bizy-pie-chart-section-${Math.random()}` ;
  @Input() value: number | null = null ;
  @Input() name: string | null = null;
  @Input() metadata: Record<string, unknown> | null = null;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  readonly #changes = new Subject<void>();

  get changes$(): Observable<void> {
    return this.#changes.asObservable();
  }

  ngOnChanges() {
    this.#changes.next();
  }

  #getClosestCssVariable = (element, cssVariable) => {
    while (element) {
        const value = getComputedStyle(element).getPropertyValue(cssVariable).trim();
        if (value) {
            return value;
        }
        element = element.parentElement;
    }
    const rootValue = getComputedStyle(this.#document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
  };

  getColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-pie-chart-section-color');

  getNativeElement = () => this.#elementRef?.nativeElement;
}
