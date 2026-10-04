import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'bizy-stacked-bar-chart-segment',
  templateUrl: './stacked-bar-chart-segment.html',
  styleUrls: ['./stacked-bar-chart-segment.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: { 
    '[id]': 'id',
    '[style.width]': 'this._width',
  }
})
export class BizyStackedBarChartSegmentComponent implements AfterViewChecked {
  readonly #document = inject(DOCUMENT);
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-stacked-bar-chart-segment-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() name: string | null = null;
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() onLegendSelect = new EventEmitter<PointerEvent>();

  _width: string = '100%';

  readonly #color = new BehaviorSubject<string>('');
  get color$(): Observable<string> {
    return this.#color.asObservable();
  }

  readonly #value = new BehaviorSubject<number>(0);
  get value$(): Observable<number> {
    return this.#value.asObservable();
  }

  @Input() set value(value: number) {
    if (typeof value === 'undefined' || value === null) {
      return;
    }

    this.#value.next(value);
  }

  ngAfterViewChecked() {
    this.#color.next(this.#getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-stacked-bar-chart-color')!);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
  }

  _setWidth(width: string) {
    this._width = width;
  }

  _getValue = () => this.#value.value;

  #getClosestCssVariable = (element: HTMLElement, cssVariable: string): string | null => {
    while (element) {
      const value = getComputedStyle(element).getPropertyValue(cssVariable).trim();
      if (value) {
        return value;
      }

      element = element.parentElement as HTMLElement;
    }

    const rootValue = getComputedStyle(this.#document.documentElement).getPropertyValue(cssVariable).trim();
    return rootValue || null;
  }
}