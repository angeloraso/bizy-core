import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, Input, QueryList, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { BizyTabComponent } from './tab/tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabsComponent implements AfterViewInit, AfterContentInit {
  @ContentChildren(BizyTabComponent) tabs!: QueryList<BizyTabComponent>;
  @ViewChild('bizyTabs') private bizyTabs: ElementRef; 
  @ViewChild('bizyTabsWrapper') private bizyTabsWrapper: ElementRef; 
  @Input() customClass: string

  #SCROLL_STEP = 50;

  showLeftButton: boolean = false; 
  showRightButton: boolean = false; 

  #resizeObserver: ResizeObserver | null = null;
  #subscription = new Subscription();
  #resize$ = new Subject<void>();
  #initialScroll: number = 0;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.bizyTabsWrapper.nativeElement.scrollLeft = this.#initialScroll;
    this.#resizeObserver = new ResizeObserver(() => this.#resize$.next());
    this.#resizeObserver.observe(this.bizyTabs.nativeElement);
    this.#subscription.add(this.#resize$.pipe(debounceTime(100)).subscribe(() => {
      this.#checkButtons();
    }));
  }

  ngAfterContentInit(): void {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs.get(i).selected) {
        this.#initialScroll = this.tabs.get(i).elementRef.nativeElement.offsetLeft;
        break;
      }
    }
  }

  onScrollLeft() {
    this.bizyTabsWrapper.nativeElement.scrollLeft = this.bizyTabsWrapper.nativeElement.scrollLeft - this.#SCROLL_STEP < 0 ? 0 : this.bizyTabsWrapper.nativeElement.scrollLeft - this.#SCROLL_STEP;
    this.#checkButtons();
  }

  onScrollRight() {
    this.bizyTabsWrapper.nativeElement.scrollLeft = (this.bizyTabsWrapper.nativeElement.scrollLeft + this.#SCROLL_STEP) > this.bizyTabsWrapper.nativeElement.scrollWidth  ? this.bizyTabsWrapper.nativeElement.scrollWidth : this.bizyTabsWrapper.nativeElement.scrollLeft + this.#SCROLL_STEP;
    this.#checkButtons();
  }

  #checkButtons() {
    this.showLeftButton = this.bizyTabsWrapper.nativeElement.scrollLeft > 0;
    this.showRightButton = (this.bizyTabsWrapper.nativeElement.scrollWidth - this.bizyTabs.nativeElement.offsetWidth) > 0 && (this.bizyTabsWrapper.nativeElement.scrollLeft < (this.bizyTabsWrapper.nativeElement.scrollWidth - this.bizyTabs.nativeElement.offsetWidth));
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#resizeObserver.disconnect();
  }
}