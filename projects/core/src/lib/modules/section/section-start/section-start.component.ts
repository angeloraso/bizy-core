
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-section-start',
  templateUrl: './section-start.html',
  styleUrls: ['./section-start.css'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id',
    '(click)': 'onSelect.emit($event)',
    '(keydown.enter)': 'onSelect.emit($event)',
    'tabindex': '0',
    'role': 'button'
  }
})
export class BizySectionStartComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-section-start-${Math.random()}`;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  getNativeElement = () => this.#elementRef?.nativeElement;
}