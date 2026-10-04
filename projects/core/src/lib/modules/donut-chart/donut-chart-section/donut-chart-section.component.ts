import { getClosestCssVariable } from '../../../utils/css';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'bizy-donut-chart-section',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizyDonutChartSectionComponent {
  readonly #elementRef = inject(ElementRef);

  @Input() id: string | number = `bizy-donut-chart-section-${Math.random()}` ;
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

  getColor = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-donut-chart-section-color');

  getNativeElement = () => this.#elementRef?.nativeElement;
}
