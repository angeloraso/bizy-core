import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToolbarComponent {
  @Input() id: string = `bizy-toolbar-${Math.random()}`;
  @Input() customClass: string = '';
}