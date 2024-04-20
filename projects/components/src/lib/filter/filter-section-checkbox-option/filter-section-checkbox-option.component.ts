import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'bizy-filter-section-checkbox-option',
  templateUrl: './filter-section-checkbox-option.html',
  styleUrls: ['./filter-section-checkbox-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionCheckboxOptionComponent {
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Output() onChange = new EventEmitter<boolean>();

  @Input() set selected(selected: boolean) {
    if (typeof selected === 'undefined' || selected === null) {
      return;
    }

    this._selected = selected;
    this.onSelect(selected);
  }

  _selected: boolean = true;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  onSelect = (selected: boolean) => {
    if (this.disabled) {
      return;
    }

    this._selected = selected;
    this.onChange.emit(selected);
    this.ref.detectChanges();
  }

  getSelected = () => {
    return this._selected;
  }

  getId = () => {
    return this.id;
  }
}