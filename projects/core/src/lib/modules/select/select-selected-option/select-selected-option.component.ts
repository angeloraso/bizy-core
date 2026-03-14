import { ChangeDetectionStrategy, Component, Input, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'bizy-select-selected-option',
  templateUrl: './select-selected-option.html',
  styleUrls: ['./select-selected-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySelectSelectedOptionComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-select-selected-option-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;

  getId = (): string => {
    return this.id;
  }

  getValue = (): string => {
    const value = this.#elementRef?.nativeElement?.innerText;
    return value ?? '';
  }
}