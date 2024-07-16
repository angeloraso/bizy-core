import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'bizy-input-option',
  templateUrl: './input-option.html',
  styleUrls: ['./input-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyInputOptionComponent {
  @Input() id: string = `bizy-input-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onSelect(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);
    this.ref.detectChanges();
  }

  getId = (): string => {
    return this.id;
  }

  getSelected = (): boolean => {
    return this.selected;
  }
}