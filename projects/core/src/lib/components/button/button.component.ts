import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyButtonComponent {
  @Input() id: string = `bizy-button-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _focused: boolean = false;

  _onSelect(event: PointerEvent) {
    if (this.disabled || !this._focused) {
      return;
    }

    this.onSelect.emit(event);
  }
}