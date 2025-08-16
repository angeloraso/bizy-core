import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'bizy-filter-sections',
  templateUrl: './filter-sections.html',
  styleUrls: ['./filter-sections.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionsComponent {
  readonly #elementRef = inject(ElementRef);
  getNativeElement = () => this.#elementRef?.nativeElement;
}