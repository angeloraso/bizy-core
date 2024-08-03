import { BizySelectOptionComponent } from './select-option/select-option.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, QueryList, ContentChildren, AfterViewInit, ElementRef, ViewChild, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizyInputComponent } from '../input';

@Component({
  selector: 'bizy-select',
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySelectComponent implements AfterViewInit {
  @ContentChildren(BizySelectOptionComponent) options: QueryList<BizySelectOptionComponent>;
  @ContentChild(BizyInputComponent) bizyInput: BizyInputComponent;
  @Input() id: string = `bizy-select-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() onOpen = new EventEmitter<boolean>();

  _optionValue: string = '';
  touched: boolean = false;

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

  _onOpen(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.opened = !this.opened;
    this.onSelect.emit(event);
    this.openedChange.emit(this.opened);
    this.onOpen.emit(this.opened);

    if (this.bizyInput) {
      this.bizyInput.setFocus(true);
    }

    this.ref.detectChanges();
  }

  close = (event?: PointerEvent & {target: {id: string}}, select?: BizyInputComponent) => {
    if (select && event && event.target && event.target === select.bizyInputWrapper.nativeElement) {
      return;
    }

    this.opened = false;
    this.openedChange.emit(this.opened);
    this.onOpen.emit(this.opened);
    this.ref.detectChanges();
  }

  #listenOptionChanges = () => {
    this.#subscription.unsubscribe();
    this.#subscription = new Subscription();

    this.options.forEach(_option => {
      this.#subscription.add(_option.onSelect.subscribe(() => {
        this._optionValue = _option.getValue();
        this.close();
        this.ref.detectChanges();
      }));
    });
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }
}