import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-menu-option',
  templateUrl: './menu-option.html',
  styleUrls: ['./menu-option.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyMenuOptionComponent {
  @Input() id: string = `bizy-menu-option-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent & {target: {id: string}}>();

  _onSelect(event: PointerEvent & {target: {id: string}}) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
  }
}