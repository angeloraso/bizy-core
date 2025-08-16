import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'bizy-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToolbarComponent {
  readonly #elementRef = inject(ElementRef);
  getNativeElement = () => this.#elementRef?.nativeElement;
}