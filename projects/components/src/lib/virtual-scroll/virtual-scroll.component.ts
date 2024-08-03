import { debounceTime, skip } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { Component, ContentChild, Input, Inject, ChangeDetectorRef, OnInit, ElementRef, ChangeDetectionStrategy, Renderer2, ViewChild } from '@angular/core';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { DOCUMENT } from '@angular/common';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

const MIN_VIRTUAL_SCROLL_WIDTH = 300; // px
const GRID_GAP = 10; // px
@Component({
  selector: 'bizy-virtual-scroll',
  templateUrl: './virtual-scroll.html',
  styleUrls: ['./virtual-scroll.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyVirtualScrollComponent implements OnInit {
  @ContentChild(BizyVirtualScrollNgForDirective) virtualFor: BizyVirtualScrollNgForDirective;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @Input() itemMinHeight: number | string;
  @Input() itemMinWidth: number | string;
  @Input() viewportHeight: string; // css height value  

  virtualScrollItems: Array<any> = [];
  itemsByRow: number;
  items: Array<any>;
  _itemMinHeight: number;
  bizyVirtualScrollWidth: number;
  notifier$ = new Subject<void>();
  #fontSize: number = 0;
  #columns: string = '1fr';
  #listeningScroll = false;

  #resizeObserver: ResizeObserver;
  #mutationObserver: MutationObserver;
  #subscription = new Subscription();
  #scrollSubscription = new Subscription();

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
      const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
      this.#fontSize = fontSize ? Number(fontSize.split('px')[0]) : 14; // 14 font size aprox;
      this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * this.#fontSize;
    } else {
      this._itemMinHeight = this.itemMinHeight as number;
    }

    this.#mutationObserver = new MutationObserver(() => {
      const virtualScrollWidth = this.elementRef.nativeElement.offsetWidth || this.elementRef.nativeElement.firstChild.offsetWidth;
      if (!virtualScrollWidth) {
        return;
      }

      this.bizyVirtualScrollWidth = virtualScrollWidth;
      this.#subscription.add(this.virtualFor.items.subscribe(items => {
        if (!items) {
          return;
        }

        if (items.length > 0) {
          this.items = items;
          this.#fillVirtualScroll();

          if (!this.#resizeObserver) {
            this.#resizeObserver = new ResizeObserver(() => this.notifier$.next());
            this.#resizeObserver.observe(this.elementRef.nativeElement.parentElement?.parentElement as HTMLElement);
            this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
              if (this.elementRef.nativeElement?.firstChild?.firstChild?.clientWidth) {
                this.bizyVirtualScrollWidth = this.elementRef.nativeElement.firstChild.firstChild.clientWidth;
                this.#fillVirtualScroll();
              }
            }));
            this.notifier$.next();
          }
        } else {
          this.#listeningScroll = false;
          this.#scrollSubscription.unsubscribe();
          this.virtualScrollItems = [];
          this.ref.detectChanges();
        }
      }));

      this.#mutationObserver.disconnect();
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  #fillVirtualScroll = () => {
    if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
      this.itemsByRow = 1;
    } else {
      const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
      this.#fontSize = fontSize ? Number(fontSize.split('px')[0]) : GRID_GAP;
      let itemMinWidth: number = 10 * this.#fontSize;
      if (this.#isString(this.itemMinWidth) && this.itemMinWidth.includes('rem')) {
        itemMinWidth = Number(this.itemMinWidth.split('rem')[0]) * this.#fontSize;
      } else if (!this.#isString(this.itemMinWidth)) {
        itemMinWidth = this.itemMinWidth
      }

      const count = Math.trunc(this.bizyVirtualScrollWidth / (itemMinWidth));
      if (Math.round((GRID_GAP * (count - 1)) + (itemMinWidth * count)) <= (this.bizyVirtualScrollWidth)) {
        this.itemsByRow = count;
      } else {
        this.itemsByRow = count - 1;
      }
    }

    this.#columns = '1fr';
    for (let i = 1; i < this.itemsByRow; i++) {
      this.#columns += ' 1fr';
    }

    const array: Array<any> = [];
    const itemsLength = this.items.length;
    for (let i = 0; i < itemsLength; i++) {
      array.push(this.items.slice(i, i + this.itemsByRow));
      i += this.itemsByRow - 1;
    }

    this.virtualScrollItems.length = 0;
    this.virtualScrollItems = array;
    this.ref.detectChanges();

    this.#setGridStyles();

    if (this.viewport && !this.#listeningScroll) {
      this.#scrollSubscription = new Subscription();
      this.#scrollSubscription.add(this.viewport.elementScrolled().pipe(debounceTime(100)).subscribe(() => {
        this.#setGridStyles();
      }));
      this.#listeningScroll = true;
    }
  }

  #isString(string: unknown): string is string {
    return typeof string === 'string' || string instanceof String;
  }

  #setGridStyles = () => {
    const gridElements = this.elementRef.nativeElement.querySelectorAll('[virtual-scroll-grid]');
    if (!gridElements || gridElements.length === 0) {
      return;
    }

    gridElements.forEach(_grid => {
      this.renderer.setStyle(_grid, 'display', 'grid');
      this.renderer.setStyle(_grid, 'gap', `${GRID_GAP}px`);
      this.renderer.setStyle(_grid, 'marginBottom', `${GRID_GAP}px`);
      this.renderer.setStyle(_grid, 'gridTemplateRows', `${this._itemMinHeight}px`);
      this.renderer.setStyle(_grid, 'gridTemplateColumns', this.#columns);
    });
  }


  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#scrollSubscription.unsubscribe();
    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }

    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }
}
