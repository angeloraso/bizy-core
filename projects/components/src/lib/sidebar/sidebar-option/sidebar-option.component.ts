import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, Inject, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bizy-sidebar-option',
  templateUrl: './sidebar-option.html',
  styleUrls: ['./sidebar-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarOptionComponent {
  @ContentChildren(BizySidebarOptionComponent) options: QueryList<BizySidebarOptionComponent>;
  @Input() id: string = `bizy-sidebar-option-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<PointerEvent>();

  _turnOn$ = new BehaviorSubject<boolean>(false);
  _selected: boolean = false;

  @Input() set selected(selected: boolean) {
    if (typeof selected === 'undefined' || selected === null) {
      return;
    }

    const turnOn = selected && selected !== this._selected;
    this._turnOn$.next(turnOn);
    this._selected = selected;
    this.ref.detectChanges();
  }

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef
  ) {}

  _onSelect(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    this.selectedChange.emit(!this._selected);
    this.onSelect.emit(event);
  }

  _setSelected(selected: boolean) {
    this._selected = selected;
  }

  getId = (): string  => {
    return this.id;
  }

  getSelected = (): boolean  => {
    return this._selected;
  }
}