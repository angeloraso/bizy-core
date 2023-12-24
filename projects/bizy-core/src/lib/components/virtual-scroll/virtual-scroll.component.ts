import { debounceTime, skip, takeUntil } from 'rxjs/operators';
import { Subscription, Subject, interval } from 'rxjs';
import { Component, ContentChild, Input, AfterViewInit, Inject, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { VirtualScrollNgForDirective } from './virtual-scroll-ng-for.directive';

const MIN_VIRTUAL_SCROLL_WIDTH = 300;
@Component({
  selector: 'bizy-virtual-scroll',
  templateUrl: './virtual-scroll.html',
  styleUrls: ['./virtual-scroll.css']
})
export class VirtualScrollComponent implements OnInit, AfterViewInit {
  @ContentChild(VirtualScrollNgForDirective) virtualFor: VirtualScrollNgForDirective;
  @ViewChild('bizyVirtualScroll') virtualScroll: CdkVirtualScrollViewport;
  @Input() itemMinHeight: number | string;
  @Input() itemMinWidth: number | string;
  @Input() emptyText: string = 'Sin elementos para mostrar';
  @Input() viewportHeight: string; // css height value  

  virtualScrollItems: Array<any>;
  itemsByRow: number;
  items: Array<any>;
  _itemMinHeight: number;
  bizyVirtualScrollWidth: number;
  notifier$ = new Subject<void>();

  private _resizeObserver: ResizeObserver;
  private _subscription = new Subscription();

  constructor(@Inject(ChangeDetectorRef) private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.#isString(this.itemMinHeight) && this.itemMinHeight.includes('rem')) {
      this._itemMinHeight = Number(this.itemMinHeight.split('rem')[0]) * 14; // 14 font size aprox
    } else {
      this._itemMinHeight = this.itemMinHeight as number;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const finishInterval$ = new Subject<void>();
      interval(50).pipe(takeUntil(finishInterval$)).subscribe(() => {
        const virtualScrollWidth = this.virtualScroll?.elementRef.nativeElement.offsetWidth;
        if (virtualScrollWidth) {
          finishInterval$.next();
          finishInterval$.complete();
          this.bizyVirtualScrollWidth = virtualScrollWidth;
          this._subscription.add(this.virtualFor.items.subscribe(items => {
            if (items) {
              if (items.length > 0) {
                this.items = items;
                this.fillVirtualScroll();

                if (!this._resizeObserver) {
                  this._resizeObserver = new ResizeObserver(() => this.notifier$.next());
                  this._resizeObserver.observe(this.virtualScroll?.elementRef?.nativeElement?.parentElement?.parentElement as HTMLElement);
                  this._subscription.add(this.notifier$.pipe(skip(1), debounceTime(100)).subscribe(() => {
                    if (this.virtualScroll?.elementRef.nativeElement.offsetWidth) {
                      this.bizyVirtualScrollWidth = this.virtualScroll?.elementRef.nativeElement.offsetWidth;
                      this.fillVirtualScroll();
                    }
                  }));
                }
              } else {
                this.virtualScrollItems = [];
              }
            }
          }));
        }
      });
    }, 1);
  }

  fillVirtualScroll = () => {
    if (this.bizyVirtualScrollWidth < MIN_VIRTUAL_SCROLL_WIDTH) {
      this.itemsByRow = 1;
    } else {
      const fontSize = window.getComputedStyle(this.virtualScroll?.elementRef.nativeElement).getPropertyValue('font-size');
      const gridGap = Number(fontSize.split('px')[0]) || 14;
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

    this.virtualScrollItems = [...array];
    this.ref.detectChanges();
  }

  #isString(string: unknown): string is string {
    return typeof string === 'string' || string instanceof String;
  }


  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
