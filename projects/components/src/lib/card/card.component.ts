import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyCardComponent {
  @Input() id: string = `bizy-card-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
  }
}