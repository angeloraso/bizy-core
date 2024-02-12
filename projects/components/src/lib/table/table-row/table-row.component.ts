import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';

@Component({
  selector: 'bizy-table-row',
  templateUrl: './table-row.html',
  styleUrls: ['./table-row.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
  @Input() id: string = String(Math.random());
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() selectable: boolean | null = null;
  @Output() onSelect = new EventEmitter<boolean>();

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  getId = (): string => {
    return this.id;
  }

  getSelected = (): boolean => {
    return this.selected;
  }

  setSelectable = (selectable: boolean): void => {
    if (this.selectable === false) {
      return;
    }

    this.selectable = selectable;
    this.ref.detectChanges();
  }

  setSelected = (selected: boolean): void => {
    if (this.selectable === false) {
      return;
    }
    
    this.selected = selected;
    this.onSelect.emit(selected);
    this.ref.detectChanges();
  }
}