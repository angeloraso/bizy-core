import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BizyButtonModule } from '../../button';

@Component({
  selector: 'bizy-menu-bar-option',
  templateUrl: './menu-bar-option.html',
  styleUrls: ['./menu-bar-option.css'],
  imports: [CommonModule, BizyButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyMenuBarOptionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @Input() id: string = `bizy-menu-bar-option-${Math.random()}`;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  getNativeElement = () => this.#elementRef?.nativeElement;

  _onSelect(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
  }

  _setSelected = (selected: boolean) => {
    this.selected = selected;
    this.#ref.detectChanges();
  }

  _setDisabled = (disabled: boolean) => {
    this.disabled = disabled;
    this.#ref.detectChanges();
  }

  getId = (): string => this.id;
}
