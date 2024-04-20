import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, Input, Output, QueryList } from '@angular/core';
import { BizySidebarOptionComponent } from '../sidebar-option/sidebar-option.component';

@Component({
  selector: 'bizy-sidebar-floating-option',
  templateUrl: './sidebar-floating-option.html',
  styleUrls: ['./sidebar-floating-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarFloatingOptionComponent {
  @ContentChildren(BizySidebarOptionComponent) options!: QueryList<BizySidebarOptionComponent>;
  @Input() id: string = String(Math.random());
  @Input() disabled: boolean = false;
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 0;
  @Input() customClass: string = '';
  @Input() selected: boolean = false;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  constructor(@Inject(ChangeDetectorRef) private ref: ChangeDetectorRef) {}

  _onSelect(event: any) {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit(event);

    this.selected = !this.selected;
  }

  close = (event: PointerEvent & {target: {id: string}}) => {
    if (event && event.target && event.target.id && event.target.id === this.id) {
      return;
    }

    this.selected = false;
    this.ref.detectChanges();
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