import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-timeline-event',
  templateUrl: './timeline-event.html',
  styleUrls: ['./timeline-event.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    '[class]': 'customClass'
  }
})
export class BizyTimelineEventComponent {
  @Input() id: string = `bizy-timeline-event-${Math.random()}`;
  @Input() customClass: string = '';
  @Input() showLine: boolean = true;
  @Input() disabled: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _focused: boolean = false;

  _onSelect(event: PointerEvent) {
    if (this.disabled || !this._focused) {
      return;
    }

    this.onSelect.emit(event);
  }
}
