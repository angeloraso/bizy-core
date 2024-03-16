import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'bizy-filter-section-checkbox-option',
  templateUrl: './filter-section-checkbox-option.html',
  styleUrls: ['./filter-section-checkbox-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionCheckboxOptionComponent {
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = true;
  @Output() onSelect = new EventEmitter<{id: string, selected: boolean}>();

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onSelect() {
    if (this.disabled) {
      return;
    }

    this.setSelect(!this.selected)
  }

  setSelect(selected: boolean) {
    this.selected = selected;
    this.onSelect.emit({id: this.id, selected: this.selected});
    this.ref.detectChanges();
  }

  getSelected() {
    return this.selected;
  }

  getId() {
    return this.id;
  }
}