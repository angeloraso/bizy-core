import { ChangeDetectionStrategy, Component, Input, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'bizy-select-option',
  templateUrl: './select-option.html',
  styleUrls: ['./select-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySelectOptionComponent {
  @Input() id: string = `bizy-select-option-${Math.random()}`;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<void>();

  @Input() set selected(selected: boolean) {
    if (typeof selected === 'undefined' || selected === null) {
      return;
    }

    this.#selected.next(selected)
  }

  #selected = new BehaviorSubject<boolean>(false)

  get selected$(): Observable<boolean> {
    return this.#selected.asObservable();
  }

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
    return this.#selected.value;
  }

  getValue = (): string => {
    const value = this.elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
    return value ?? '';
  }
}