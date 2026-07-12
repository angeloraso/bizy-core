import { Component, Input, ChangeDetectionStrategy, ContentChild, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef, Renderer2, TemplateRef, ViewContainerRef, OnDestroy, inject, EventEmitter, Output, NgZone } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject, Subscription, auditTime, debounceTime, fromEvent } from 'rxjs';
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
export class BizyGridComponent implements AfterViewInit, OnDestroy {
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #document = inject(DOCUMENT);
  readonly #renderer = inject(Renderer2);
  readonly #zone = inject(NgZone);

  @ViewChild('cdkVirtualScroll') private virtualScroll: CdkVirtualScrollViewport | null = null;
  @ViewChild('gridScrollingContent') content: TemplateRef<object> | null = null;
  @ContentChild(BizyGridForDirective) gridDirective: BizyGridForDirective | null = null;
  @Input() resizeRef: ElementRef<HTMLElement> | HTMLElement | null = null;
  @Input() scrollDisabled: boolean = false;
  @Input() set scrollResetKey(_value: string | number | null) {
    this.#wasAtEnd = false;
  }
  @Output() endReached = new EventEmitter<void>();

  readonly #bottomThreshold = 120;
  #resizeObserver: ResizeObserver | null = null;
  #subscription = new Subscription();
  #view: ViewContainerRef | null = null;
  #viewportCheckFrame: number | null = null;
  #scrollFrame: number | null = null;
  #wasAtEnd = false;
  #destroyed = false;
  notifier$ = new Subject<void>();
  
  rowHeight: number = 100;
  itemRows: Array<Array<unknown>> = [];
  items: Array<unknown> = [];
  itemTemplate: TemplateRef<unknown> | null = null;
  itemsPerRow: number = 1;

  getNativeElement = () => this.#elementRef?.nativeElement;

  ngAfterViewInit() {
    this.#listenToScroll();

    if (!this.gridDirective) {
      return;
    }

    this.#subscription.add(this.gridDirective.items$.subscribe(items => {
      if (this.items.length === 0 && items.length === 0) {
        this.#scheduleViewportCheck();
        return;
      }

      this.items = items;
      this.#updateView();
      this.#createScrollingContent();
    }));

    this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
    const resizeRef = this.#getResizeElement();
    this.#resizeObserver.observe(resizeRef);
    this.#subscription.add(this.notifier$.pipe(debounceTime(50)).subscribe(() => {
      this.#updateView(true);
    }));

    this.#scheduleViewportCheck();
  }

  #updateView = (resize?: boolean) => {
    if (!this.gridDirective) {
      return;
    }

    this.itemTemplate = this.gridDirective.templateRef;
    const firstChild = this.#elementRef.nativeElement.firstElementChild as HTMLElement | null;
    const rowWidth = this.#elementRef.nativeElement.offsetWidth || firstChild?.offsetWidth || 0;
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
    } else if (columnWidthParameter && columnWidthParameter.includes('%')) {
      columnWidth = (Number(columnWidthParameter.split('%')[0]) / 100) * rowWidth;
    }

    columnWidth += gap;

    let newItemsPerRow = 0;

    const count = Math.trunc(rowWidth / (columnWidth));
    if (Math.round((gap * (count - 1)) + (columnWidth * count)) <= (rowWidth)) {
      newItemsPerRow = count <= 0 ? 1 : count;
    } else {
      newItemsPerRow = (count - 1) <= 0 ? 1 : count - 1;
    }

    if (resize && newItemsPerRow === this.itemsPerRow) {
      this.#scheduleViewportCheck();
      return;
    }

    this.itemsPerRow = newItemsPerRow;
    const itemRows: Array<Array<unknown>> = [];
    for (let i = 0; i < this.items.length; i += this.itemsPerRow) {
      const row: Array<unknown> = this.items.slice(i, i + this.itemsPerRow);
      itemRows.push(row);
    }

    this.itemRows = itemRows;
    this.#ref.detectChanges();
    this.#scheduleViewportCheck();
  }

  #createScrollingContent = () => {
    if (this.#view || !this.content) {
      return;
    }

    if (this.gridDirective) {
      this.#view = this.gridDirective.viewContainerRef;
      this.#view.createEmbeddedView(this.content);
      this.#ref.detectChanges();
      this.#scheduleViewportCheck();
    }
  }

  #getResizeElement = (): HTMLElement => {
    if (this.resizeRef instanceof ElementRef) {
      return this.resizeRef.nativeElement;
    }

    if (this.resizeRef) {
      return this.resizeRef;
    }

    return this.#renderer.parentNode(this.#elementRef.nativeElement) || this.#elementRef.nativeElement;
  }

  #listenToScroll = () => {
    const windowRef = this.#document.defaultView;
    const listenToScroll = () => {
      this.#scrollFrame = null;

      if (this.#destroyed) {
        return;
      }

      const scrollElement = this.#getScrollElement();

      this.#subscription.add(
        fromEvent(scrollElement, 'scroll', { passive: true })
          .pipe(auditTime(150))
          .subscribe(() => this.#onScroll(scrollElement))
      );
    };

    this.#zone.runOutsideAngular(() => {
      if (windowRef?.requestAnimationFrame) {
        this.#scrollFrame = windowRef.requestAnimationFrame(listenToScroll);
        return;
      }

      listenToScroll();
    });
  }

  #onScroll = (scrollElement: HTMLElement) => {
    if (this.scrollDisabled) {
      return;
    }

    if (scrollElement.scrollTop <= this.#bottomThreshold) {
      return;
    }

    const distanceToBottom = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight;
    const atEnd = distanceToBottom <= this.#bottomThreshold;

    if (!atEnd) {
      this.#wasAtEnd = false;
      return;
    }

    if (this.#wasAtEnd) {
      return;
    }

    this.#wasAtEnd = true;
    this.#zone.run(() => this.endReached.emit());
  }

  #getScrollElement = (): HTMLElement => {
    return (
      this.#elementRef.nativeElement.querySelector<HTMLElement>('.cdk-virtual-scrollable') ??
      this.#elementRef.nativeElement.querySelector<HTMLElement>('cdk-virtual-scroll-viewport') ??
      this.#elementRef.nativeElement
    );
  }

  #scheduleViewportCheck = () => {
    if (this.#viewportCheckFrame !== null) {
      return;
    }

    const windowRef = this.#document.defaultView;
    const checkViewport = () => {
      this.#viewportCheckFrame = null;

      if (this.#destroyed) {
        return;
      }

      this.virtualScroll?.checkViewportSize();
    };

    if (windowRef?.requestAnimationFrame) {
      this.#viewportCheckFrame = windowRef.requestAnimationFrame(checkViewport);
      return;
    }

    checkViewport();
  }

  trackByRow(index: number, row: any[]): any {
    if (row && row.length > 0) {
      return row[0].id; 
    }

    return index;
  }

  scrollTo(index: number, behavior: 'auto' | 'instant' | 'smooth' = 'smooth') {
    if (!this.virtualScroll) {
      return;
    }

    this.virtualScroll.scrollToIndex(index, behavior);
  }

  ngOnDestroy() {
    this.#destroyed = true;
    this.#subscription.unsubscribe();

    if (this.#viewportCheckFrame !== null) {
      this.#document.defaultView?.cancelAnimationFrame(this.#viewportCheckFrame);
      this.#viewportCheckFrame = null;
    }

    if (this.#scrollFrame !== null) {
      this.#document.defaultView?.cancelAnimationFrame(this.#scrollFrame);
      this.#scrollFrame = null;
    }

    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }
  }
}
