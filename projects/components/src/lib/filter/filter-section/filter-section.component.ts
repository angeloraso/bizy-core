import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject, ContentChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { BizyFilterSectionRangeOptionComponent } from '../filter-section-range-option/filter-section-range-option.component';
import { BizyFilterSectionCheckboxOptionComponent } from '../filter-section-checkbox-option/filter-section-checkbox-option.component';
import { BizyFilterSectionSearchOptionComponent } from '../filter-section-search-option/filter-section-search-option.component';

@Component({
  selector: 'bizy-filter-section',
  templateUrl: './filter-section.html',
  styleUrls: ['./filter-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionComponent {
  @ContentChildren(BizyFilterSectionCheckboxOptionComponent) private checkboxOptions: QueryList<BizyFilterSectionCheckboxOptionComponent>;
  @ContentChild(BizyFilterSectionRangeOptionComponent) private rangeOption: BizyFilterSectionRangeOptionComponent;
  @ContentChild(BizyFilterSectionSearchOptionComponent) private searchOption:BizyFilterSectionSearchOptionComponent;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<boolean>();

  #subscription = new Subscription();

  #mutationObserver: MutationObserver;
  #checkboxOptions: Array<BizyFilterSectionCheckboxOptionComponent> = [];
  _activated: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.#mutationObserver = new MutationObserver(() => {
      if (this.checkboxOptions && (this.#checkboxOptions.length !== 0 || this.checkboxOptions.length !== 0) && !this.#optionsAreEqual(this.#checkboxOptions, this.checkboxOptions.toArray())) {
        
        this.#checkboxOptions = this.checkboxOptions.toArray();

        const selectedOptions = this.checkboxOptions.filter(_option => _option.getSelected() === true);
        this._activated = selectedOptions.length !== this.checkboxOptions.length;
        this.onSelect.emit(this._activated);
        this.ref.detectChanges();
  
        this.checkboxOptions.forEach(_option => {

          this.#subscription.add(_option.onChange.subscribe(() => {
            const selectedOptions = this.checkboxOptions.filter(_option => _option.getSelected() === true);
            this._activated = selectedOptions.length !== this.checkboxOptions.length;
            this.onSelect.emit(this._activated);
            this.ref.detectChanges();
          }));
        });
      } else if (this.rangeOption) {
        this._activated = this.rangeOption.isActivated();
        this.ref.detectChanges();

        this.#subscription.add(this.rangeOption.onChange.subscribe(() => {
          this._activated = this.rangeOption.isActivated();
          this.onSelect.emit(this._activated);
          this.ref.detectChanges();
        }));
        this.#mutationObserver.disconnect();
      } else if (this.searchOption) {
        this._activated = this.searchOption.isActivated();
        this.ref.detectChanges();

        this.#subscription.add(this.searchOption.onChange.subscribe(() => {
          this._activated = this.searchOption.isActivated();
          this.onSelect.emit(this.searchOption.isActivated());
          this.ref.detectChanges();
        }));
        this.#mutationObserver.disconnect();
      }
    });

    this.#mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  _onSelect = (selected: boolean) => {
    if (this.disabled || this.rangeOption) {
      return;
    }

    this.checkboxOptions.forEach(_option => {
      _option.onSelect(selected);
    })
  }

  onClear = () => {
    if (!this.rangeOption) {
      return;
    }

    this.rangeOption.onClear();
  }

  isActivated = () => {
    return this._activated;
  }

  getId = () => {
    return this.id;
  }

  #optionsAreEqual(arr1: Array<BizyFilterSectionCheckboxOptionComponent>, arr2: Array<BizyFilterSectionCheckboxOptionComponent>) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    arr1.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    arr2.sort((a, b) => String(a.id).localeCompare(String(b.id)));

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
    this.#mutationObserver.disconnect();
  }
}