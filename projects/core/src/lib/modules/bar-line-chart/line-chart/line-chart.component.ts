import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { IBizyBarLineChartAxis, IBizyBarLineChartValue } from '../bar-line-chart.types';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';

const DEFAULT_AXIS: IBizyBarLineChartAxis = {
  show: false
};

@Component({
  selector: 'bizy-line-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyLineChartComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);

  @Input() values: Array<IBizyBarLineChartValue> = [];
  @Input() discrete: boolean = false;
  @Input() name: string | null = null;
  @Input() yAxis: IBizyBarLineChartAxis = DEFAULT_AXIS;
  @Input() xAxis: IBizyBarLineChartAxis = DEFAULT_AXIS;

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

  getColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-line-chart-color');
  getMinHeight = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-line-chart-min-height');

  getYAxisColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-line-chart-y-axis-color');
  getYAxisWidth = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-line-chart-y-axis-width');

  getXAxisColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-line-chart-x-axis-color');
  getXAxisWidth = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-line-chart-x-axis-width');
}
