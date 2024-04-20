import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-table-column',
  templateUrl: './table-column.html',
  styleUrls: ['./table-column.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableColumnComponent {
  @Input() id: string = String(Math.random());
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<PointerEvent>();

  getId = (): string => {
    return this.id;
  }
}