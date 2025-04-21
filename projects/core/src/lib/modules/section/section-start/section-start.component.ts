import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-section-start',
  templateUrl: './section-start.html',
  styleUrls: ['./section-start.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySectionStartComponent {
  @Input() id: string = `bizy-section-start-${Math.random()}`;
}