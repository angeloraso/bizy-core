import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-radio',
  templateUrl: './radio.html',
  styleUrls: ['./radio.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyRadioComponent {
  @Input() id: string = `bizy-radio-${Math.random()}`;
  @Input() name: string;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.selectedChange.emit(!this.selected);
    this.onSelect.emit(event)
  }
}