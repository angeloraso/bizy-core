import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-list',
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizyListComponent {
  @Input() id: string = `bizy-list-${Math.random()}`;
}