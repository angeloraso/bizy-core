import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyButtonComponent {
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
  }
}