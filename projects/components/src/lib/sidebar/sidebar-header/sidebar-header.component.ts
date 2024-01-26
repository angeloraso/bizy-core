import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-header',
  templateUrl: './sidebar-header.html',
  styleUrls: ['./sidebar-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarHeaderComponent {
  @Input() customClass: string;
  @Output() onSelect = new EventEmitter<void>();
}