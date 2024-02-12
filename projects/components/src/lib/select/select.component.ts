import { SelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, QueryList, ContentChildren, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bizy-select',
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {
  @ContentChildren(SelectOptionComponent) options: QueryList<SelectOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() onSelect = new EventEmitter<string | number>();
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() onOpen = new EventEmitter<PointerEvent>();

  @Input() set value(value: string | number) {
    if (typeof value === 'undefined' || value === null) {
      return;
    }

    this._value = value;
    this._optionValue = '';

    if (this.options && this.options.length > 0) {
      this.options.forEach(_option => {
        if (_option.getKey() === value) {
          _option.setSelected(true);
          this._optionValue = _option.getValue();
        } else {
          _option.setSelected(false);
        }
      })
    }

    this.ref.detectChanges();
  }


  _selectWidth: number;
  _value: string | number;
  _optionValue: string = '';

  #options: Array<SelectOptionComponent> = [];

  #subscription = new Subscription();
  #mutationObserver: MutationObserver;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (!this.options || (this.#options.length === 0 && this.options.length === 0)) {
        return;
      }

      if (this.#optionsAreEqual(this.#options, this.options.toArray())) {
        return;
      }

      this.#options = this.options.toArray();

      this._optionValue = '';

      if (this._value) {
        this.options.forEach(_option => {
          if (_option.getKey() === this._value) {
            _option.setSelected(true);
            this._optionValue = _option.getValue();
          } else {
            _option.setSelected(false);
          }
        });
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
    if (!this.options) {
      return;
    }

    this.options.forEach(_option => {

      this.#subscription.add(_option.onSelect.subscribe(() => {
        this.options.forEach(__option => {
          if (__option.getId() !== _option.getId()) {
            __option.setSelected(false);
          }
        })

        this._optionValue = _option.getValue();
        this.valueChange.emit(_option.getKey());
        this.onSelect.emit(_option.getKey());
        this.close(null);
        this.ref.detectChanges();
      }));
    });
  }

  #optionsAreEqual(arr1: Array<SelectOptionComponent>, arr2: Array<SelectOptionComponent>) {
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