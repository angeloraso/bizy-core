import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyCardComponent {
  readonly #elementRef = inject(ElementRef);

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

  getNativeElement = () => this.#elementRef?.nativeElement;
}