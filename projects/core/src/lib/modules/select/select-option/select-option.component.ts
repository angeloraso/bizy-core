import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, Output, EventEmitter, ElementRef, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'bizy-select-option',
  templateUrl: './select-option.html',
  styleUrls: ['./select-option.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySelectOptionComponent {
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);

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

  _onSelect(): void {
    if (this.disabled) {
      return;
    }

    this.onSelect.emit();
    this.#ref.detectChanges();
  }

  getId = (): string => {
    return this.id;
  }

  getSelected = (): boolean => {
    return this.#selected.value;
  }

  getNativeElement = () => this.#elementRef?.nativeElement;

  getValue = (): string => {
    const value = this.#elementRef?.nativeElement?.firstChild?.children[0]?.innerText;
    return value ?? '';
  }
}