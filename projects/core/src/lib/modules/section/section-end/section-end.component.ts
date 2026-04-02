
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-section-end',
  templateUrl: './section-end.html',
  styleUrls: ['./section-end.css'],
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
export class BizySectionEndComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-section-end-${Math.random()}`;
  @Output() onSelect = new EventEmitter<PointerEvent>();

  getNativeElement = () => this.#elementRef?.nativeElement;
}