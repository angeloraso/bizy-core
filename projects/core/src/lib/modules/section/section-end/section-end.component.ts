import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-section-end',
  templateUrl: './section-end.html',
  styleUrls: ['./section-end.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySectionEndComponent {
  @Input() id: string = `bizy-section-end-${Math.random()}`;
}