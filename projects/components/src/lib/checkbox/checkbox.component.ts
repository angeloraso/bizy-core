import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyCheckboxComponent {
  @Input() id: string = `bizy-checkbox-${Math.random()}`;
  @Input() name: string;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _checkboxId = `bizy-input-checkbox-${Math.random()}`;

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.selectedChange.emit(!this.selected);
    this.onSelect.emit(event)
  }
}