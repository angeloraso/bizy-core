
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, inject } from '@angular/core';

@Component({
  selector: 'bizy-grid-row',
  templateUrl: './grid-row.html',
  styleUrls: ['./grid-row.css'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyGridRowComponent {
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);
  #rowHeight: number = 100;

  @Input() set rowHeight(rowHeight: number) {
    this.#rowHeight = rowHeight;
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'gridTemplateRows', `${rowHeight}px`);
  }

  get rowHeight(): number {
    return this.#rowHeight;
  }

  @Input() set itemsPerRow(itemsPerRow: number) {
    if (!this.#elementRef.nativeElement) {
      return;
    }

    if (!itemsPerRow) {
      itemsPerRow = 1;
    }

    this.#renderer.setStyle(this.#elementRef.nativeElement, 'gridTemplateColumns', `repeat(${itemsPerRow}, minmax(0, 1fr))`);
    this.#ref.detectChanges();
  }

  getNativeElement = () => this.#elementRef?.nativeElement;
}
