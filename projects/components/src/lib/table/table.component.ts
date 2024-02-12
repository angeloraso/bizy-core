import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList, ContentChild, Inject, ChangeDetectorRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bizy-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @ContentChild(TableHeaderComponent) header: TableHeaderComponent;
  @ContentChildren(TableRowComponent) rows: QueryList<TableRowComponent>;
  @ContentChild(TableFooterComponent) footer: TableFooterComponent;

  #rows: Array<TableRowComponent> = [];
  #mutationObserver: MutationObserver;
  #subscription = new Subscription();

  @Input() set selectable(selectable: boolean) {
    if (!selectable) {
      return;
    }

    this.#mutationObserver = new MutationObserver(() => {
      if (!this.rows || (this.#rows.length === 0 && this.rows.length === 0)) {
        return;
      }

      if (this.#rowsAreEqual(this.#rows, this.rows.toArray())) {
        return;
      }

      this.#rows = this.rows.toArray();

      this.rows.forEach(_row => {
          _row.setSelectable(true);
      });

      if (this.header) {
        this.header.setSelectable(true);

        this.#subscription.add(this.header.onSelect.subscribe(selected => {
          this.rows.forEach(_row => {
            _row.setSelected(selected);
          })
        }));
      }

      if (this.footer) {
        this.footer.setSelectable(true);
      }

      this.#mutationObserver.disconnect();
      this.ref.detectChanges();      
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  };

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  #rowsAreEqual(arr1: Array<TableRowComponent>, arr2: Array<TableRowComponent>) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    arr1.sort((a, b) => a.id.localeCompare(b.id));
    arr2.sort((a, b) => a.id.localeCompare(b.id));

    for (let i = 0; i < arr1.length; i++) {
        for (let key in arr1[i]) {
            if (arr1[i][key] !== arr2[i][key]) {
                return false;
            }
        }
    }

    return true;
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }
}
