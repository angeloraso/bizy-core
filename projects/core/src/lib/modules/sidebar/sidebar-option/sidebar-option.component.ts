import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BizyAccordionComponent } from '../../accordion/accordion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-sidebar-option',
  templateUrl: './sidebar-option.html',
  styleUrls: ['./sidebar-option.css'],
  imports: [CommonModule, BizyAccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySidebarOptionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

  @ContentChildren(BizySidebarOptionComponent) options: QueryList<BizySidebarOptionComponent>;
  @Input() id: string = `bizy-sidebar-option-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() selectable: boolean = true;
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
    this.#ref.detectChanges();
  }

  _onSelect(event: PointerEvent): void {
    if (this.disabled || !this.selectable) {
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

  getNativeElement = () => this.#elementRef?.nativeElement;

  getSelected = (): boolean  => {
    return this._selected;
  }
}