import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-tab',
  templateUrl: './tab.html',
  styleUrls: ['./tab.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabComponent {
  @Input() id: string = `bizy-tab-${Math.random()}`;
  @Input() selected: boolean = false;
  @Input() linePosition: 'bottom' | 'top' = 'top';
  @Input() customClass: string;
  @Output() onSelect = new EventEmitter<void>();
}