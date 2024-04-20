import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabsComponent {
  @Input() customClass: string
}