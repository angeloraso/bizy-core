import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'bizy-accordion',
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyAccordionComponent {
  @Input() id: string = `bizy-accordion-${Math.random()}`;
  @Input() customClass: string;
  @Input() disabled: boolean = false;
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.openedChange.emit(!this.opened);
    this.onSelect.emit(event);
    this.ref.detectChanges();
  }
}