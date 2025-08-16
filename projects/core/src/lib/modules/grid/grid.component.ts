import { Component, Input, ChangeDetectionStrategy, ContentChild, ChangeDetectorRef, ViewChild, AfterContentInit, ElementRef, Renderer2, TemplateRef, ViewContainerRef, DOCUMENT, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { BizyGridForDirective } from './grid.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BizyGridRowComponent } from './grid-row/grid-row.component';
@Component({
  selector: 'bizy-grid',
  templateUrl: './grid.html',
  styleUrls: ['./grid.css'],
  imports: [CommonModule, ScrollingModule, BizyGridRowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyGridComponent implements AfterContentInit {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #document = inject(DOCUMENT);
  readonly #renderer = inject(Renderer2);
  
  @ViewChild('cdkVirtualScroll') private virtualScroll: CdkVirtualScrollViewport;
  @ViewChild('gridScrollingContent') content: TemplateRef<object>;
  @ContentChild(BizyGridForDirective) gridDirective: BizyGridForDirective;
  @Input() resizeRef: ElementRef | null = null;

  #rowScrollingMutationObserver: MutationObserver;
  #resizeObserver: ResizeObserver;
  #subscription = new Subscription();
  #view: ViewContainerRef;
  notifier$ = new Subject<void>();
  
  rowHeight: number = 100;
  itemRows: Array<Array<unknown>> = [];
  items: Array<unknown> = [];
  itemTemplate: TemplateRef<unknown>;
  itemsPerRow: number = 1;

  ngAfterContentInit() {
    if (this.gridDirective) {
      this.#initView();
    } else {
      this.#rowScrollingMutationObserver = new MutationObserver(() => {
        if (!this.gridDirective) {
          return;
        }
  
        this.#initView();
  
        this.#rowScrollingMutationObserver.disconnect();
  
        this.#ref.detectChanges();
      });
  
      this.#rowScrollingMutationObserver.observe(this.#document.body, { childList: true, subtree: true });
    }
  }

  #initView = () => {
    this.#subscription.add(this.gridDirective.items$.subscribe(items => {
      if (this.items.length === 0 && items.length === 0) {
        return;
      }

      this.items = items;
      this.#updateView();
    }));

    if (!this.#view) {
      this.#view = this.gridDirective.viewContainerRef;
      this.#view.createEmbeddedView(this.content);
    }

    this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
    const resizeRef = this.resizeRef ? this.resizeRef : this.#renderer.parentNode(this.#elementRef.nativeElement) ? this.#renderer.parentNode(this.#elementRef.nativeElement) : this.#elementRef.nativeElement;
    this.#resizeObserver.observe(resizeRef);
    this.#subscription.add(this.notifier$.pipe(debounceTime(50)).subscribe(() => {
      this.#updateView();
    }));
  }

  #updateView = () => {
    this.itemTemplate = this.gridDirective.templateRef;
    const rowWidth = this.#elementRef.nativeElement.offsetWidth || this.#elementRef.nativeElement.firstChild.offsetWidth;
    let columnWidth = 100;
    const fontSize = Number(getComputedStyle(this.#elementRef.nativeElement).getPropertyValue('font-size').split('px')[0]);

    const rowHeightParameter = getComputedStyle(this.#elementRef.nativeElement).getPropertyValue('--bizy-grid-row-height');
    if (rowHeightParameter && rowHeightParameter.includes('rem')) {
      this.rowHeight = fontSize * Number(rowHeightParameter.split('rem')[0]);
    } else if (rowHeightParameter && rowHeightParameter.includes('px')) {
      this.rowHeight = Number(rowHeightParameter.split('px')[0]);
    }

    let gap = 10;
    const gapParameter = getComputedStyle(this.#elementRef.nativeElement).getPropertyValue('--bizy-grid-gap');
    if (gapParameter && gapParameter.includes('rem')) {
      gap = fontSize * Number(gapParameter.split('rem')[0]);
    } else if (gapParameter && gapParameter.includes('px')) {
      gap = Number(gapParameter.split('px')[0]);
    }

    const columnWidthParameter = getComputedStyle(this.#elementRef.nativeElement).getPropertyValue('--bizy-grid-column-width');
    if (columnWidthParameter && columnWidthParameter.includes('rem')) {
      columnWidth = fontSize * Number(columnWidthParameter.split('rem')[0]);
    } else if (columnWidthParameter && columnWidthParameter.includes('px')) {
      columnWidth = Number(columnWidthParameter.split('px')[0]);
    }

    columnWidth += gap;

    const count = Math.trunc(rowWidth / (columnWidth));
    if (Math.round((gap * (count - 1)) + (columnWidth * count)) <= (rowWidth)) {
      this.itemsPerRow = count <= 0 ? 1 : count;
    } else {
      this.itemsPerRow = (count - 1) <= 0 ? 1 : count - 1;
    }

    const itemRows: Array<Array<unknown>> = [];
    for (let i = 0; i < this.items.length; i += this.itemsPerRow) {
      const row: Array<unknown> = this.items.slice(i, i + this.itemsPerRow);
      itemRows.push(row);
    }

    this.itemRows = itemRows;
    this.#ref.detectChanges();
  }

  trackById(index: number, item: any): any {
    return item?.id ?? index;
  }

  scrollTo(index: number, behavior: 'auto' | 'instant' | 'smooth' = 'smooth') {
    this.virtualScroll.scrollToIndex(index, behavior);
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();

    if (this.#rowScrollingMutationObserver) {
      this.#rowScrollingMutationObserver.disconnect();
    }

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }

  getNativeElement = () => this.#elementRef?.nativeElement;
}
