import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, inject, Input, QueryList } from '@angular/core';
import { BizyStackedBarChartSegmentComponent } from './stacked-bar-chart-segment/stacked-bar-chart-segment.component';
import { ANURA_STACKED_BAR_CHART_LEGEND_POSITION, IBizyStackedBarChartLegends } from './stacked-bar-chart.types';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

const DEFAULT_LEGENDS: IBizyStackedBarChartLegends = {
  show: true,
  position: ANURA_STACKED_BAR_CHART_LEGEND_POSITION.BOTTOM
};

@Component({
  selector: 'bizy-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.html',
  styleUrls: ['./stacked-bar-chart.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id',
  }
})
export class BizyStackedBarChartComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-stacked-bar-chart-${Math.random()}`;

  @ContentChildren(BizyStackedBarChartSegmentComponent) segments: QueryList<BizyStackedBarChartSegmentComponent> | null = null;

  _total: number = 0;
  _forcedTotal: number = 0;
  _legends: IBizyStackedBarChartLegends = DEFAULT_LEGENDS;

  #segmentSubscription = new Subscription();
  #segmentValueSubscription = new Subscription();

  readonly ANURA_STACKED_BAR_CHART_LEGEND_POSITION = ANURA_STACKED_BAR_CHART_LEGEND_POSITION;

  getNativeElement = () => this.#elementRef?.nativeElement;

  ngAfterContentInit(): void {
    if (!this.segments || this.segments.length === 0) {
      return;
    }

    this.#segmentSubscription = new Subscription();
    this.#segmentSubscription.add(this.segments.changes.subscribe(_segments => {

      this.#segmentValueSubscription.unsubscribe();
      this.#segmentValueSubscription = new Subscription();
      
      _segments.forEach(_segment => {
        this.#segmentValueSubscription.add(_segment.value$.subscribe(_value => {
          this.#calculateWidth();
        }))
      });
    }));

    this.segments.forEach(_segment => {
      this.#segmentValueSubscription.add(_segment.value$.subscribe(_value => {
        this.#calculateWidth();
      }))
    });
  }

  @Input() set legends(legends: IBizyStackedBarChartLegends) {
    if (!legends) {
      return;
    }

    this._legends = {
      ...legends,
      show: typeof legends.show !== 'undefined' && legends.show !== null ? legends.show : DEFAULT_LEGENDS.show,
      position: legends.position || DEFAULT_LEGENDS.position
    }
  }

  @Input() set total(total: number) {
    if (!total) {
      return;
    }

    this._forcedTotal = total;

    this.#calculateWidth();
  }

  #calculateWidth() {
    if (!this.segments) {
      return;
    }

    let _total = this._forcedTotal || this.total || 0;

    if (!_total) {
      _total = 0;
      for (let i = 0; i < this.segments.length; i++) {
        _total += this.segments.get(i)._getValue() || 0;
      }
    }

    if (_total) {
      for (let i = 0; i < this.segments.length; i++) {
        this.segments.get(i)._setWidth(`${(this.segments.get(i)._getValue() / _total) * 100}%`);
      }
    }
  }

  ngOnDestroy() {
    this.#segmentSubscription.unsubscribe();
    this.#segmentValueSubscription.unsubscribe();
  }
}