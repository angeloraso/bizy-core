import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FilterSectionRangeOptionComponent } from '../filter-section-range-option/filter-section-range-option.component';
import { FilterSectionCheckboxOptionComponent } from '../filter-section-checkbox-option/filter-section-checkbox-option.component';

@Component({
  selector: 'bizy-filter-section',
  templateUrl: './filter-section.html',
  styleUrls: ['./filter-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionComponent {
  @ContentChildren(FilterSectionCheckboxOptionComponent) private checkboxOptions: QueryList<FilterSectionCheckboxOptionComponent>;
  @ContentChild(FilterSectionRangeOptionComponent) private rangeOption: FilterSectionRangeOptionComponent;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = true;
  @Output() onSelect = new EventEmitter<Array<{id: string, selected: boolean}>>();
  @Output() onRange = new EventEmitter<{min: number | null, max: number | null}>();

  #subscription = new Subscription();

  _options: Array<{id: string, selected: boolean}> = [];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    const mutationObserver = new MutationObserver(() => {
      if (this.checkboxOptions && this.checkboxOptions.length > 0) {

        this.checkboxOptions.forEach(_option => {
          this._options.push({id: _option.getId(), selected: _option.getSelected()})
        });
        
        const selectedOptions = this._options.filter(_option => _option.selected === true);
        this.selected = selectedOptions.length === this._options.length;
  
        this.checkboxOptions.forEach(_option => {

          this.#subscription.add(_option.onSelect.subscribe(data => {
            const index = this._options.findIndex(_option => _option.id === data.id);
            if (index !== -1) {
              this._options[index] = data;
            } else {
              this._options.push(data);
            }

            const selectedOptions = this._options.filter(_option => _option.selected === true);
            this.selected = selectedOptions.length === this._options.length;

            this.onSelect.emit(this._options);
          }));
        });

        mutationObserver.disconnect();
      } else if (this.rangeOption) {
        this.#subscription.add(this.rangeOption.onChange.subscribe(data => {
          this.selected = this.rangeOption.getSelected();
          this.onRange.emit(data);
        }));
        mutationObserver.disconnect();
      }
    });

    mutationObserver.observe(this.document.body, { childList: true, subtree: true });
  }

  _onSelect() {
    if (this.disabled || this.rangeOption) {
      return;
    }

    this.selected = !this.selected;

    this._options = this._options.map(_option => {
      return {..._option, selected: this.selected};
    })

    this.checkboxOptions.forEach(_option => {
      _option.setSelect(this.selected);
    })
  }

  onClear() {
    if (!this.rangeOption) {
      return;
    }

    this.rangeOption.onClear();
  }

  getSelected() {
    return this.selected;
  }

  getId() {
    return this.id;
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}