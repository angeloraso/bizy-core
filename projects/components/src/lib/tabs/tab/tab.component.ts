import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-tab',
  templateUrl: './tab.html',
  styleUrls: ['./tab.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @Input() id: string = `bizy-tab-${Math.random()}`;
  @Input() selected: boolean = false;
  @Input() customClass: string;
  @Output() onSelect = new EventEmitter<void>();
}