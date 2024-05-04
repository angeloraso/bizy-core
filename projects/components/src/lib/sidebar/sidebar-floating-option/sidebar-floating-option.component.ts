import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, OnInit, Output, QueryList } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bizy-sidebar-floating-option',
  templateUrl: './sidebar-floating-option.html',
  styleUrls: ['./sidebar-floating-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarFloatingOptionComponent implements OnInit {
  @ContentChildren(BizySidebarOptionComponent) options!: QueryList<BizySidebarOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 0;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _opened: boolean = false;

  #mutationObserver: MutationObserver;
  #subscription = new Subscription();
  #options: Array<BizySidebarOptionComponent> = [];

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
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  _onSelect(event: any) {
    if (this.disabled) {
      return;
    }

    this._opened = !this._opened;
    this.selected = true;
    this.onSelect.emit(event);
  }

  close = (event: PointerEvent & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this._opened = false;
    this.ref.detectChanges();
  }

  setSelected = (selected: boolean): void => {
    this.selected = selected;
    this.ref.detectChanges();
  }

  getId = (): string  => {
    return this.id;
  }

  getSelected = (): boolean  => {
    return this.selected;
  }

  #listenOptionChanges = (options: Array<BizySidebarOptionComponent>) => {
    options.forEach(_option => {
      this.#subscription.add(_option.onSelect.subscribe(() => {
        if (!_option.options || _option.options.length === 0) {
          this._opened = false;
          this.ref.detectChanges();
        }
      }));

      if (_option.options && _option.options.length > 0) {
        this.#listenOptionChanges(_option.options.toArray());
      }
    });
  }

  #optionsAreEqual(arr1: Array<BizySidebarOptionComponent>, arr2: Array<BizySidebarOptionComponent>) {
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
}