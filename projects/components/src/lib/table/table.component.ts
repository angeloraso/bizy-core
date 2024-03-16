import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList, ContentChild, Inject, ChangeDetectorRef, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { TableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { TableScrollingDirective } from './table-scrolling/table-scrolling.directive';

@Component({
  selector: 'bizy-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterContentInit {
  @ViewChild(TableScrollingComponent) viewport: TableScrollingComponent;
  @ContentChild(TableScrollingDirective) virtualFor: TableScrollingDirective;
  @ContentChild(TableHeaderComponent) header: TableHeaderComponent;
  @ContentChildren(TableRowComponent) rows: QueryList<TableRowComponent>;
  @ContentChild(TableFooterComponent) footer: TableFooterComponent;

  #selectableMutationObserver: MutationObserver;
  #rowScrollingMutationObserver: MutationObserver;
  #afterViewInitObserver: MutationObserver;
  #subscription = new Subscription();
  marginRight: number = 0;

  @Input() set selectable(selectable: boolean) {
    this.#selectableMutationObserver = new MutationObserver(() => {
      if (!this.rows || this.rows.length === 0) {
        return;
      }

      this.rows.forEach(_row => {
        _row.setSelectable(selectable);
        _row.setMarginRight(this.marginRight);
      });

      if (this.header) {
        this.header.setSelectable(selectable);
      }

      if (this.footer) {
        this.footer.setSelectable(selectable);
      }

      this.ref.detectChanges();      
    });

    this.#selectableMutationObserver.observe(this.document.body, { childList: true, subtree: true });
  };

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(ElementRef) private elementRef: ElementRef
  ) {}

  ngAfterContentInit() {
    this.#rowScrollingMutationObserver = new MutationObserver(() => {
      if (!this.virtualFor) {
        return;
      }

      this.viewport.attachView(this.virtualFor);
      this.#rowScrollingMutationObserver.disconnect();
  
      this.ref.detectChanges();     
      
      this.#afterViewInitObserver = new MutationObserver(() => {
        if (!this.elementRef.nativeElement.offsetWidth) {
          return;
        }
  
        this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
        this.rows.forEach(_row => {
            _row.setMarginRight(this.marginRight);
        });

        if (this.header) {
          this.header.setMarginRight(this.marginRight);
        }

        if (this.footer) {
          this.footer.setMarginRight(this.marginRight);
        }

        this.#subscription.add(fromEvent(this.elementRef.nativeElement, 'scroll', { capture: true }).subscribe(() => {
          this.marginRight = (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft;
          this.rows.forEach(_row => {
            _row.setMarginRight(this.marginRight);
          });
          
          if (this.header) {
            this.header.setMarginRight(this.marginRight);
          }
  
          if (this.footer) {
            this.footer.setMarginRight(this.marginRight);
          }
        }));
  
        this.#afterViewInitObserver.disconnect();   
        this.ref.detectChanges();   
      });

      this.#afterViewInitObserver.observe(this.document.body, { childList: true, subtree: true });
    });

    this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    if (this.#selectableMutationObserver) {
      this.#selectableMutationObserver.disconnect();
    }

    if (this.#rowScrollingMutationObserver) {
      this.#rowScrollingMutationObserver.disconnect();
    }

    if (this.#afterViewInitObserver) {
      this.#afterViewInitObserver.disconnect();
    }
  }
}
