import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-section',
  templateUrl: './section.html',
  styleUrls: ['./section.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySectionComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-section-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;
}