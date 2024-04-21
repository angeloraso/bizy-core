import { ChangeDetectionStrategy, Component, Input, ContentChildren, QueryList, Inject, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizyTabComponent } from './tab/tab.component';

@Component({
  selector: 'bizy-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabsComponent {
  @ContentChildren(BizyTabComponent) tabs!: QueryList<BizyTabComponent>;
  @Input() customClass: string

  #subscription = new Subscription();
  #mutationObserver: MutationObserver;
  #tabs: Array<BizyTabComponent> = [];

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (this.tabs && (this.#tabs.length !== 0 || this.tabs.length !== 0) && !this.#tabsAreEqual(this.#tabs, this.tabs.toArray())) {
        this.#tabs = this.tabs.toArray();

        this.#listenTabChanges(this.tabs.toArray());
      }
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  #listenTabChanges = (tabs: Array<BizyTabComponent>) => {
    tabs.forEach(_tab => {
      this.#subscription.add(_tab.onSelect.subscribe(() => {
          this.tabs.toArray().forEach(_tab => {
            _tab.setSelected(false);
          });
          _tab.setSelected(true);
          this.ref.detectChanges();
      }));
    });
  }

  #tabsAreEqual(arr1: Array<BizyTabComponent>, arr2: Array<BizyTabComponent>) {
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