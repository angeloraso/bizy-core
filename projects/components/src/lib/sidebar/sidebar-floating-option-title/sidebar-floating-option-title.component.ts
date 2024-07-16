import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-floating-option-title',
  templateUrl: './sidebar-floating-option-title.html',
  styleUrls: ['./sidebar-floating-option-title.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarFloatingOptionTitleComponent {
  @Input() id: string = `bizy-sidebar-floating-option-title-${Math.random()}`;
  @Input() customClass: string = '';
}