import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList, ContentChild, Inject, ChangeDetectorRef, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { BizyTableHeaderComponent } from './table-header/table-header.component';
import { BizyTableFooterComponent } from './table-footer/table-footer.component';
import { BizyTableRowComponent } from './table-row/table-row.component';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription, debounceTime, fromEvent, skip } from 'rxjs';
import { BizyTableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { BizyTableScrollingDirective } from './table-scrolling/table-scrolling.directive';

@Component({
  selector: 'bizy-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableComponent implements AfterContentInit {
  @ViewChild(BizyTableScrollingComponent) viewport: BizyTableScrollingComponent;
  @ContentChild(BizyTableScrollingDirective) virtualFor: BizyTableScrollingDirective;
  @ContentChild(BizyTableHeaderComponent) header: BizyTableHeaderComponent;
  @ContentChildren(BizyTableRowComponent) rows: QueryList<BizyTableRowComponent>;
  @ContentChild(BizyTableFooterComponent) footer: BizyTableFooterComponent;

  #selectableMutationObserver: MutationObserver;
  #rowScrollingMutationObserver: MutationObserver;
  #afterContentInitObserver: MutationObserver;
  #resizeObserver: ResizeObserver;
  notifier$ = new Subject<void>();
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
      
      this.#afterContentInitObserver = new MutationObserver(() => {
        if (!this.elementRef.nativeElement.offsetWidth) {
          return;
        }
  
        this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
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
          this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
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
  
        this.#afterContentInitObserver.disconnect();   
        this.ref.detectChanges();   
      });

      this.#afterContentInitObserver.observe(this.document.body, { childList: true, subtree: true });
    });

    this.#rowScrollingMutationObserver.observe(this.document.body, { childList: true, subtree: true });


    this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
    this.#resizeObserver.observe(this.elementRef.nativeElement);
    this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
      this.marginRight = this.elementRef.nativeElement.scrollWidth ? (this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.offsetWidth) - this.elementRef.nativeElement.scrollLeft : 0;
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
    this.notifier$.next();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    if (this.#selectableMutationObserver) {
      this.#selectableMutationObserver.disconnect();
    }

    if (this.#rowScrollingMutationObserver) {
      this.#rowScrollingMutationObserver.disconnect();
    }

    if (this.#afterContentInitObserver) {
      this.#afterContentInitObserver.disconnect();
    }

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }
}
