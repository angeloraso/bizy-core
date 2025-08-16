import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-radio',
  templateUrl: './radio.html',
  styleUrls: ['./radio.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyRadioComponent {
  readonly #elementRef = inject(ElementRef);
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

  getNativeElement = () => this.#elementRef?.nativeElement;
}