import { BizySelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, QueryList, ContentChildren, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bizy-select',
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySelectComponent implements AfterViewInit {
  @ContentChildren(BizySelectOptionComponent) options: QueryList<BizySelectOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() onOpen = new EventEmitter<PointerEvent>();

  _selectWidth: number;
  _optionValue: string = '';

  #options: Array<BizySelectOptionComponent> = [];

  #subscription = new Subscription();
  #mutationObserver: MutationObserver;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (!this.options || (this.#options.length === 0 && this.options.length === 0)) {
        return;
      }

      if (this.#optionsAreEqual(this.#options, this.options.toArray())) {
        return;
      }

      this.#options = this.options.toArray();

      this._optionValue = '';

      const option = this.#options.find(_option => _option.getSelected());

      if (option) {
        this._optionValue = option.getValue();
      }

      this.ref.detectChanges();      
      this.#listenOptionChanges();
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  _onOpen(event: any) {
    if (this.disabled) {
      return;
    }

    this.opened = !this.opened;
    this.onOpen.emit(event);

    if (!this.opened) {
      return;
    }
    
    if (event && event.srcElement && event.srcElement.offsetWidth) {
      this._selectWidth =  event.srcElement.offsetWidth; 
    }

    this.ref.detectChanges();
  }

  close = (event: PointerEvent & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this.opened = false;
    this.ref.detectChanges();
  }

  #listenOptionChanges = () => {
    this.options.forEach(_option => {
      this.#subscription.add(_option.onSelect.subscribe(() => {
        this._optionValue = _option.getValue();
        this.close(null);
        this.ref.detectChanges();
      }));
    });
  }

  #optionsAreEqual(arr1: Array<BizySelectOptionComponent>, arr2: Array<BizySelectOptionComponent>) {
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