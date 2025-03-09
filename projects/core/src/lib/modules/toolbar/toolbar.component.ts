import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bizy-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToolbarComponent {
}