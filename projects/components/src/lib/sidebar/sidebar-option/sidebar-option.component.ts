import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'bizy-sidebar-option',
  templateUrl: './sidebar-option.html',
  styleUrls: ['./sidebar-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarOptionComponent {
  @ContentChildren(BizySidebarOptionComponent) options: QueryList<BizySidebarOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
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
    this.ref.detectChanges();
  }

  getId = (): string  => {
    return this.id;
  }

  getSelected = (): boolean  => {
    return this.selected;
  }
}