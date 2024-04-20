import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject, ChangeDetectorRef, OnInit} from '@angular/core';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';

@Component({
  selector: 'bizy-sidebar-new',
  templateUrl: './sidebar-new.html',
  styleUrls: ['./sidebar-new.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarNewComponent implements OnInit {
  @ContentChildren(BizySidebarOptionComponent) options!: QueryList<BizySidebarOptionComponent>;
  @ContentChildren(BizySidebarFloatingOptionComponent) floatingOptions!: QueryList<BizySidebarFloatingOptionComponent>;
  @Input() toggle: boolean = false;
  @Output() onToggle = new EventEmitter<boolean>(); 

  #subscription = new Subscription();
  #mutationObserver: MutationObserver;
  #options: Array<BizySidebarOptionComponent> = [];
  #floatingOptions: Array<BizySidebarFloatingOptionComponent> = [];

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (this.options && (this.#options.length !== 0 || this.options.length !== 0) && !this.#optionsAreEqual(this.#options, this.options.toArray())) {
        this.#options = this.options.toArray();

        this.#listenOptionChanges(this.options.toArray());
      }

      if (this.floatingOptions && (this.#floatingOptions.length !== 0 || this.floatingOptions.length !== 0) && !this.#optionsAreEqual(this.#floatingOptions, this.floatingOptions.toArray())) {
        this.#floatingOptions = this.floatingOptions.toArray();

        this.#listenFloatingOptionChanges(this.floatingOptions.toArray());
      }

    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  #listenOptionChanges = (options: Array<BizySidebarOptionComponent>) => {
    options.forEach(_option => {
      this.#subscription.add(_option.onSelect.subscribe(() => {
        if (_option.getSelected()) {
          this.#select(this.options.toArray(), _option);
        } else {
          this.#unselect(this.options.toArray());
          this.#select(this.options.toArray(), _option);
        }
        this.ref.detectChanges();
      }));

      if (_option.options && _option.options.length > 0) {
        this.#listenOptionChanges(_option.options.toArray());
      }
    });
  }

  #listenFloatingOptionChanges = (options: Array<BizySidebarFloatingOptionComponent> | Array<BizySidebarOptionComponent>) => {
    options.forEach(_option => {
      this.#subscription.add(_option.onSelect.subscribe(() => {
        if (_option.getSelected()) {
          this.#select(this.floatingOptions.toArray(), _option);
        } else {
          this.#unselect(this.floatingOptions.toArray());
          this.#select(this.floatingOptions.toArray(), _option);
        }
        this.ref.detectChanges();
      }));

      if (_option.options && _option.options.length > 0) {
        this.#listenFloatingOptionChanges(_option.options.toArray());
      }
    });
  }

  #select = (options: Array<BizySidebarOptionComponent> | Array<BizySidebarFloatingOptionComponent>, option: BizySidebarOptionComponent | BizySidebarFloatingOptionComponent): boolean => {
    let optionSelected: boolean = false;
    options.forEach(_option => {
      if (_option.getId() === option.getId()) {
        if (_option.options && _option.options.length > 0) {
          option.setSelected(!_option.getSelected());
        } else {
          option.setSelected(true);
        }
        optionSelected = true;
        return;
      } else if (_option.options && _option.options.length > 0) {
        const _optionSelected = this.#select(_option.options.toArray(), option);
        if (_optionSelected) {
          optionSelected = true;
          _option.setSelected(true);
          return;
        }
      }
    });

    return optionSelected;
  };

  #unselect = (options: Array<BizySidebarOptionComponent> | Array<BizySidebarFloatingOptionComponent>) => {
    options.forEach(_option => {
      _option.setSelected(false);
      if (_option.options && _option.options.length > 0) {
        this.#unselect(_option.options.toArray());
      }
    });
  };

  #optionsAreEqual(arr1: Array<BizySidebarOptionComponent> | Array<BizySidebarFloatingOptionComponent>, arr2: Array<BizySidebarOptionComponent> | Array<BizySidebarFloatingOptionComponent>) {
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