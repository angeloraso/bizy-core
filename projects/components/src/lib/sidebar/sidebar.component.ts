import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'bizy-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() opened: boolean = false;
  @Output() onOpen = new EventEmitter<boolean>(); 
}