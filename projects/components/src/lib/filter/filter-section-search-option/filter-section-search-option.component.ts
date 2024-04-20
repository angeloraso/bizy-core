import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'bizy-filter-section-search-option',
  templateUrl: './filter-section-search-option.html',
  styleUrls: ['./filter-section-search-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionSearchOptionComponent implements OnInit, OnDestroy {
  @Input() id: string = String(Math.random());
  @Input() customClass: string = '';
  @Output() onChange = new EventEmitter<Array<string>>();
  @Output() searchChange = new EventEmitter<Array<string>>();

  _control = new FormControl('');

  #subscription = new Subscription();

  ngOnInit() {
    this.#subscription.add(this._control.valueChanges.pipe(debounceTime(250)).subscribe(value => {
      this.searchChange.emit([value]);
      this.onChange.emit([value]);
    }));
  }

  @Input() set search(search: Array<string>) {
    if (!search) {
      return;
    }

    this._control.setValue('');
    search.forEach(value => {
      this._control.setValue(`${this._control.value}${this._control.value ? ` ${value}` : value}`);
    })
  }

  getId = (): string => {
    return this.id;
  }

  isActivated = (): boolean => {
    return Boolean(this._control.value);
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}