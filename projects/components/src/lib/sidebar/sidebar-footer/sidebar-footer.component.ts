import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-footer',
  templateUrl: './sidebar-footer.html',
  styleUrls: ['./sidebar-footer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarFooterComponent {
  @Input() customClass: string;
  @Output() onSelect = new EventEmitter<void>();
}