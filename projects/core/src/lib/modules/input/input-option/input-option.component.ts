import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, Output, EventEmitter, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'bizy-input-option',
  templateUrl: './input-option.html',
  styleUrls: ['./input-option.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyInputOptionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @Input() id: string = `bizy-input-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _onSelect(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
    this.#ref.detectChanges();
  }

  getId = (): string => {
    return this.id;
  }

  getSelected = (): boolean => {
    return this.selected;
  }

  getNativeElement = () => this.#elementRef?.nativeElement;
}