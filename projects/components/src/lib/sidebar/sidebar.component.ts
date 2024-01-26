import { ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'bizy-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

}