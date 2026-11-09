
import { Component, ElementRef, inject, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'bizy-content',
  templateUrl: 'content.html',
  styleUrls: ['content.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: []
})
export class BizyContentComponent {
  readonly #elementRef = inject(ElementRef);
  getNativeElement = () => this.#elementRef?.nativeElement;
}
