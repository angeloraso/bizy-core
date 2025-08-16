import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-section-center',
  templateUrl: './section-center.html',
  styleUrls: ['./section-center.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySectionCenterComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-center-start-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;
}