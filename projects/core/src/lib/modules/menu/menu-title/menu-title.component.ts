import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'bizy-menu-title',
  templateUrl: './menu-title.html',
  styleUrls: ['./menu-title.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id',
    '[class]': 'customClass'
  }
})
export class BizyMenuTitleComponent {
  @Input() id: string = `bizy-menu-title-${Math.random()}`;
  @Input() customClass: string = '';
}