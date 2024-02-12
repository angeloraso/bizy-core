import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject } from '@angular/core';
import { FilterSectionOptionComponent } from '../filter-section-option/filter-section-option.component';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bizy-filter-section',
  templateUrl: './filter-section.html',
  styleUrls: ['./filter-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionComponent {
  @ContentChildren(FilterSectionOptionComponent) private options: QueryList<FilterSectionOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = true;
  @Output() onSelect = new EventEmitter<Array<{id: string, selected: boolean}>>();

  #subscription = new Subscription();

  _options: Array<{id: string, selected: boolean}> = [];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    if (this.options && this.options.length > 0) {

      this.options.forEach(_option => {
        this._options.push({id: _option.getId(), selected: _option.getSelected()})
      });
      
      const selectedOptions = this._options.filter(_option => _option.selected === true);
      this.selected = selectedOptions.length === this._options.length;

      this.#listenOptionChanges();
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (this.options && this.options.length > 0) {
          this.options.forEach(_option => {
            this._options.push({id: _option.getId(), selected: _option.getSelected()})
          });

          const selectedOptions = this._options.filter(_option => _option.selected === true);
          this.selected = selectedOptions.length === this._options.length;

          this.#listenOptionChanges();
          mutationObserver.disconnect();
        }
      });
  
      mutationObserver.observe(this.document.body, { childList: true, subtree: true });
    }
  }

  _onSelect() {
    if (this.disabled) {
      return;
    }

    this.selected = !this.selected;

    this._options = this._options.map(_option => {
      return {..._option, selected: this.selected};
    })

    this.options.forEach(_option => {
      _option.setSelect(this.selected);
    })
  }

  #listenOptionChanges = () => {
    if (!this.options) {
      return;
    }

    this.options.forEach(_option => {

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