import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { BizyCheckboxComponent } from '../../checkbox/checkbox.component';

@Component({
  selector: 'bizy-filter-section-checkbox-option',
  templateUrl: './filter-section-checkbox-option.html',
  styleUrls: ['./filter-section-checkbox-option.css'],
  imports: [BizyCheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyFilterSectionCheckboxOptionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @Input() id: string = `bizy-filter-section-checkbox-option-${Math.random()}`;
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

  onSelect = (selected: boolean) => {
    if (this.disabled) {
      return;
    }

    this._selected = selected;
    this.onChange.emit(selected);
    this.#ref.detectChanges();
  }

  getSelected = () => {
    return this._selected;
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  getId = () => {
    return this.id;
  }
}