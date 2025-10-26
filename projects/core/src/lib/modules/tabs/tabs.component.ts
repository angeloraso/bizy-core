import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, inject, Input, QueryList, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { BizyTabComponent } from './tab/tab.component';


@Component({
  selector: 'bizy-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabsComponent implements AfterViewInit, AfterContentInit {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

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
        this.#initialScroll = this.tabs.get(i).getNativeElement().offsetLeft;
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
    this.#ref.detectChanges();
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    this.#resizeObserver.disconnect();
  }
}