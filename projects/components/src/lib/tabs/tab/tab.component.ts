import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'bizy-tab',
  templateUrl: './tab.html',
  styleUrls: ['./tab.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTabComponent {
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() linePosition: 'bottom' | 'top' = 'top';
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<void>();

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onSelect(): void {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit();
  }

  setSelected = (selected: boolean): void => {
    this.selected = selected;
    this.selectedChange.emit(selected);
    this.ref.detectChanges();
  }

  getId = (): string  => {
    return this.id;
  }

  getSelected = (): boolean  => {
    return this.selected;
  }
}