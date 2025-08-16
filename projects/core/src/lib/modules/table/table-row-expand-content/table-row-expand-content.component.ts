import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'bizy-table-row-expand-content',
  templateUrl: './table-row-expand-content.html',
  styleUrls: ['./table-row-expand-content.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableRowExpandContentComponent {
  readonly #elementRef = inject(ElementRef);
  getNativeElement = () => this.#elementRef?.nativeElement;
}