import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';

@Component({
  selector: 'bizy-table-row',
  templateUrl: './table-row.html',
  styleUrls: ['./table-row.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableRowComponent {
  @Input() id: string = `bizy-table-row-${Math.random()}`;
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() opened: boolean = false;
  @Input() selectable: boolean | null = null;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() onOpen = new EventEmitter<PointerEvent>();

  marginRight = 0;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onOpen(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.openedChange.emit(!this.opened);
    this.onOpen.emit(event);
  }

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
    this.selectedChange.emit(selected);
    this.ref.detectChanges();
  }

  setMarginRight(margin: number) {
    this.marginRight = margin - 5;
    this.ref.detectChanges();
  }
}