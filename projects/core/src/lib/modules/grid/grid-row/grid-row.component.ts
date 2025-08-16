import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, inject } from '@angular/core';

@Component({
  selector: 'bizy-grid-row',
  templateUrl: './grid-row.html',
  styleUrls: ['./grid-row.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyGridRowComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #renderer = inject(Renderer2);

  @Input() rowHeight: number = 100; // Px

  @Input() set itemsPerRow(itemsPerRow: number) {
    if (!this.#elementRef.nativeElement) {
      return;
    }

    if (!itemsPerRow) {
      itemsPerRow = 1;
    }

    this.#renderer.setStyle(this.#elementRef.nativeElement, 'gridTemplateRows', `${this.rowHeight}px`);
    this.#renderer.setStyle(this.#elementRef.nativeElement, 'gridTemplateColumns', `repeat(${itemsPerRow}, minmax(0, 1fr)`);
    this.#ref.detectChanges();
  }

  getNativeElement = () => this.#elementRef?.nativeElement;
}
