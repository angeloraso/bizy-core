import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-filter-section-search-option',
  templateUrl: './filter-section-search-option.html',
  styleUrls: ['./filter-section-search-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionSearchOptionComponent {
  @Input() id: string = String(Math.random());
  @Input() value: string | number = '';
  @Input() customClass: string = '';
  @Output() onChange = new EventEmitter<string | number>();
  @Output() valueChange = new EventEmitter<string | number>();


  setValue(value) {
    this.valueChange.emit(value);
    this.onChange.emit(value);
  }

  getId = (): string => {
    return this.id;
  }

  isActivated = (): boolean => {
    return Boolean(this.value);
  }
}