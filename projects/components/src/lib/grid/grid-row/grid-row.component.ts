import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'bizy-grid-row',
  templateUrl: './grid-row.html',
  styleUrls: ['./grid-row.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyGridRowComponent {
  @Input() rowHeight: number = 100; // Px

  @Input() set itemsPerRow(itemsPerRow: number) {
    if (!this.elementRef.nativeElement) {
      return;
    }

    if (!itemsPerRow) {
      itemsPerRow = 1;
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateRows', `${this.rowHeight}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'gridTemplateColumns', `repeat(${itemsPerRow}, minmax(0, 1fr)`);    this.ref.detectChanges();
  }

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}
}
