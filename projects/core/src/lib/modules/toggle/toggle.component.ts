import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ElementRef, inject } from '@angular/core';
@Component({
  selector: 'bizy-toggle',
  templateUrl: './toggle.html',
  styleUrls: ['./toggle.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyToggleComponent {
  readonly #elementRef = inject(ElementRef);

  @Input() id: string = `bizy-toggle-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();
  @Output() selectedChange = new EventEmitter<boolean>();

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.selectedChange.emit(!this.selected);
    this.onSelect.emit(event);
  }

  getNativeElement = () => this.#elementRef?.nativeElement;
}