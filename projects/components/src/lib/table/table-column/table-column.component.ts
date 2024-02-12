import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-table-column',
  templateUrl: './table-column.html',
  styleUrls: ['./table-column.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnComponent {
  @Input() id: string = String(Math.random());
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<void>();

  getId = (): string => {
    return this.id;
  }
}