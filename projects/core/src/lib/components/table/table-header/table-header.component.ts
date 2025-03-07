import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-table-header',
  templateUrl: './table-header.html',
  styleUrls: ['./table-header.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableHeaderComponent {
  @ContentChildren(BizyTableColumnComponent) columns: QueryList<BizyTableColumnComponent>;
  @Input() id: string = `bizy-table-header-${Math.random()}`;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Input() selectable: boolean | null = null;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  marginRight = 0;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(ElementRef) public elementRef: ElementRef
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

  setMarginRight(margin: number) {
    this.marginRight = margin - 5;
    this.ref.detectChanges();
  }

  setMarginLeft(margin: number) {
    if (this.columns.length === 0) {
      return;
    }

    this.columns.forEach(_column => {
      _column.setMarginLeft(margin);
      this.ref.detectChanges();
    })
  }
}