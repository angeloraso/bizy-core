import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-option',
  templateUrl: './sidebar-option.html',
  styleUrls: ['./sidebar-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarOptionComponent {
  @Input() customClass: string;
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<void>();
}