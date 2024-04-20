import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-floating-option-title',
  templateUrl: './sidebar-floating-option-title.html',
  styleUrls: ['./sidebar-floating-option-title.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarFloatingOptionTitleComponent {
  @Input() customClass: string = '';
}