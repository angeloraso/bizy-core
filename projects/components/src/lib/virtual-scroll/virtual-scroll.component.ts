import { debounceTime, skip } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { Component, ContentChild, Input, Inject, ChangeDetectorRef, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { BizyVirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';
import { DOCUMENT } from '@angular/common';

const MIN_VIRTUAL_SCROLL_WIDTH = 300;
@Component({
  selector: 'bizy-virtual-scroll',
  templateUrl: './virtual-scroll.html',
  styleUrls: ['./virtual-scroll.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyVirtualScrollComponent implements OnInit {
  @ContentChild(BizyVirtualScrollNgForDirective) virtualFor: BizyVirtualScrollNgForDirective;
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

  #resizeObserver: ResizeObserver;
  #mutationObserver: MutationObserver;
  #subscription = new Subscription();

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
      this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
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
            this.#resizeObserver.observe(this.elementRef.nativeElement as HTMLElement);
            this.#subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
              if (this.elementRef.nativeElement?.firstChild?.firstChild?.clientWidth) {
                this.bizyVirtualScrollWidth = this.elementRef.nativeElement.firstChild.firstChild.clientWidth;
                this.#fillVirtualScroll();
              }
            }));
            this.notifier$.next();
          }
        } else {
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
      if (!this.#fontSize) {
        const fontSize = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size');
        this.#fontSize = Number(fontSize.split('px')[0]);
      }
      const gridGap = this.#fontSize || 14;
      let itemMinWidth: number = 1;
      if (this.#isString(this.itemMinWidth)) {
        if (this.itemMinWidth.includes('rem')) {
          itemMinWidth = Number(this.itemMinWidth.split('rem')[0]) * gridGap;
        } else if (this.itemMinWidth.includes('em')) {
          itemMinWidth = Number(this.itemMinWidth.split('em')[0]) * gridGap;
        }
      } else {
        itemMinWidth = this.itemMinWidth
      }

      const count = Math.trunc(this.bizyVirtualScrollWidth / (itemMinWidth));
      if (((gridGap * (count - 1)) + (itemMinWidth * count)) <= (this.bizyVirtualScrollWidth)) {
        this.itemsByRow = count;
      } else {
        this.itemsByRow = count - 1;
      }
    }

    this.#setItems();
  }

  #setItems = () => {
    const array: Array<any> = [];
    const itemsLength = this.items.length;
    let i;
    for (i = 0; i < itemsLength; i++) {
      array.push(this.items.slice(i, i + this.itemsByRow));
      i += this.itemsByRow - 1;
    }

    this.virtualScrollItems.length = 0;
    this.virtualScrollItems = array;
    this.ref.detectChanges();
  }

  #isString(string: unknown): string is string {
    return typeof string === 'string' || string instanceof String;
  }


  ngOnDestroy() {
    this.#subscription.unsubscribe();
    if (this.#resizeObserver) {
      this.#resizeObserver.disconnect();
    }

    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }
}
