import { getClosestCssVariable } from '../../../utils/css';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
} from '@angular/core';
import { IBizyBarLineChartAxis, IBizyBarLineChartValue } from '../bar-line-chart.types';
import { Observable, Subject } from 'rxjs';

const DEFAULT_AXIS: IBizyBarLineChartAxis = {
  show: false
};

@Component({
  selector: 'bizy-bar-chart',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyBarChartComponent implements OnChanges {
  readonly #elementRef = inject(ElementRef);

  @Input() values: Array<IBizyBarLineChartValue> = [];
  @Input() stack: string | null = null;
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

  getColor = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-color');
  getMinHeight = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-min-height');

  getYAxisColor = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-y-axis-color');
  getYAxisWidth = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-y-axis-width');

  getXAxisColor = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-x-axis-color');
  getXAxisWidth = (): string => getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-bar-chart-x-axis-width');

  getNativeElement = () => this.#elementRef?.nativeElement;
}
