import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-section-center',
  templateUrl: './section-center.html',
  styleUrls: ['./section-center.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id',
    '[class]': 'customClass'
  }
})
export class BizySectionCenterComponent {
  @Input() id: string = `bizy-center-start-${Math.random()}`;
  @Input() customClass: string = '';
}