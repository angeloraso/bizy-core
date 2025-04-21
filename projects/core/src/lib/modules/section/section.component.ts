import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  @Input() id: string = `bizy-section-${Math.random()}`;
}