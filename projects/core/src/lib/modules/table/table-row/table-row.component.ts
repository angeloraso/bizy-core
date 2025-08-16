import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, ContentChildren, QueryList, ElementRef, inject } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import { CommonModule } from '@angular/common';
import { BizyAccordionComponent } from '../../accordion/accordion.component';

@Component({
  selector: 'bizy-table-row',
  templateUrl: './table-row.html',
  styleUrls: ['./table-row.css'],
  imports: [CommonModule, BizyAccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableRowComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @ContentChildren(BizyTableColumnComponent) columns: QueryList<BizyTableColumnComponent>;
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

  getNativeElement = () => this.#elementRef?.nativeElement;

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
    this.#ref.detectChanges();
  }

  setSelected = (selected: boolean): void => {
    if (this.selectable === false) {
      return;
    }
    
    this.selected = selected;
    this.selectedChange.emit(selected);
    this.#ref.detectChanges();
  }

  setMarginRight(margin: number) {
    this.marginRight = margin - 5;
    this.#ref.detectChanges();
  }

  setMarginLeft(margin: number) {
    if (this.columns.length === 0) {
      return;
    }

    this.columns.forEach(_column => {
      _column.setMarginLeft(margin);
      this.#ref.detectChanges();
    })
  }
}