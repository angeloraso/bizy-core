import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-menu-option',
  templateUrl: './menu-option.html',
  styleUrls: ['./menu-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyMenuOptionComponent {
  @Input() id: string = String(Math.random());
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