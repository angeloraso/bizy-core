import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-table-column-arrows',
  templateUrl: './table-column-arrows.html',
  styleUrls: ['./table-column-arrows.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableColumnArrowsComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() order: 'asc' | 'desc' | null = null;
  @Input() show: boolean = false;
  @Input() customClass: string = '';

  getNativeElement = () => this.#elementRef?.nativeElement;
}