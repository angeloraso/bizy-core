import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, inject, Input, QueryList } from '@angular/core';
import { BizyTableColumnComponent } from '../table-column/table-column.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-table-footer',
  templateUrl: './table-footer.html',
  styleUrls: ['./table-footer.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableFooterComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @ContentChildren(BizyTableColumnComponent) columns: QueryList<BizyTableColumnComponent>;
  @Input() id: string = `bizy-table-footer-${Math.random()}`;
  @Input() customClass: string = '';

  marginRight = 0;

  _selectable: boolean = false;

  getId = (): string => {
    return this.id;
  }

  setSelectable = (selectable: boolean): void => {
    this._selectable = selectable;
    this.#ref.detectChanges();
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

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