import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { IBizyBarLineChartAxis, IBizyBarLineChartValue } from '../bar-line-chart.types';
import { DOCUMENT } from '@angular/common';

const DEFAULT_AXIS: IBizyBarLineChartAxis = {
  show: false
};

@Component({
  selector: 'bizy-bar-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBarChartComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #document = inject(DOCUMENT);

  @Input() values: Array<IBizyBarLineChartValue> = [];
  @Input() stack: string | null = null;
  @Input() name: string | null = null;
  @Input() yAxis: IBizyBarLineChartAxis = DEFAULT_AXIS;
  @Input() xAxis: IBizyBarLineChartAxis = DEFAULT_AXIS;


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

  getColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-color');
  getMinHeight = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-min-height');

  getYAxisColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-y-axis-color');
  getYAxisWidth = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-y-axis-width');

  getXAxisColor = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-x-axis-color');
  getXAxisWidth = (): string => this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-x-axis-width');

  getNativeElement = () => this.#elementRef?.nativeElement;
}
