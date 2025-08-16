import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    '[class]': 'customClass'
  }
})
export class BizyTimelineComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-timeline-${Math.random()}`;
  @Input() customClass: string = '';

  getNativeElement = () => this.#elementRef?.nativeElement;
}
