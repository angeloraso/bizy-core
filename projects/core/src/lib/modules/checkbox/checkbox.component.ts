import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bizy-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyCheckboxComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-checkbox-${Math.random()}`;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _checkboxId = `bizy-input-checkbox-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;

  _onSelect(event: PointerEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.selectedChange.emit(!this.selected);
    this.onSelect.emit(event)
  }
}
