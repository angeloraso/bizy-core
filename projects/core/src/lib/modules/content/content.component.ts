import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
@Component({
  selector: 'bizy-content',
  templateUrl: 'content.html',
  styleUrls: ['content.css'],
  imports: [CommonModule]
})
export class BizyContentComponent {
  readonly #elementRef = inject(ElementRef);
  getNativeElement = () => this.#elementRef?.nativeElement;
}
