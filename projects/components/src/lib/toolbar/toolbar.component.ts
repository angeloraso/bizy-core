import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bizy-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToolbarComponent {
}