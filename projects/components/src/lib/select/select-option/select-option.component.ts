import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'bizy-select-option',
  templateUrl: './select-option.html',
  styleUrls: ['./select-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySelectOptionComponent {
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

    this.onSelect.emit();
    this.ref.detectChanges();
  }

  getId = (): string => {
    return this.id;
  }

  getSelected = (): boolean => {
    return this.selected;
  }

  getValue = (): string => {
    const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
    return value ?? '';
  }
}