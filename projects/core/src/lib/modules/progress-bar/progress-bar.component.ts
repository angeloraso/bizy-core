import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrls: ['./progress-bar.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizyProgressBarComponent {
  @Input() id: string = `bizy-progress-bar-${Math.random()}`;
  @Input() progress: number | null = null;
}