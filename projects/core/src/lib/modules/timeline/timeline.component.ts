import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  @Input() id: string = `bizy-timeline-${Math.random()}`;
  @Input() customClass: string = '';
}
