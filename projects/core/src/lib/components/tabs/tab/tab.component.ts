import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-tab',
  templateUrl: './tab.html',
  styleUrls: ['./tab.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabComponent {
  @Input() id: string = `bizy-tab-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() linePosition: 'bottom' | 'top' = 'bottom';
  @Input() customClass: string;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  constructor(@Inject(ElementRef) public elementRef: ElementRef) {}

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.selectedChange.emit(true);
    this.onSelect.emit(event);
  }
}