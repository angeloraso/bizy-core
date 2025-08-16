import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'bizy-filter-content',
  templateUrl: './filter-content.html',
  styleUrls: ['./filter-content.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterContentComponent {
  readonly #elementRef = inject(ElementRef);
  getNativeElement = () => this.#elementRef?.nativeElement;
}