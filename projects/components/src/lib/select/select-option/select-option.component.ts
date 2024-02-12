import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'bizy-select-option',
  templateUrl: './select-option.html',
  styleUrls: ['./select-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectOptionComponent {
  @Input() key: string | number;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<void>();

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onSelect(): void {
    if (this.disabled) {
      return;
    }

    this.selected = true;
    this.onSelect.emit();
    this.ref.detectChanges();
  }

  setSelected = (selected: boolean): void => {
    this.selected = selected;
    this.ref.detectChanges();
  }

  getKey = (): string | number => {
    return this.key;
  }

  getId = (): string => {
    return this.id;
  }

  getValue = (): string => {
    const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
    return value ?? '';
  }
}