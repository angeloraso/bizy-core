import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-menu-title',
  templateUrl: './menu-title.html',
  styleUrls: ['./menu-title.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyMenuTitleComponent {
  @Input() customClass: string = '';
}