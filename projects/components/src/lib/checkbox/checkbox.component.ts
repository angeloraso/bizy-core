import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input() id: string = String(Math.random());
  @Input() name: string;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<boolean>();

  _checkboxId = String(Math.random());

  setSelected() {
    if (this.disabled) {
      return;
    }

    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
    this.onSelect.emit(this.selected)
  }
}