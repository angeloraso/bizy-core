
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-section-start',
  templateUrl: './section-start.html',
  styleUrls: ['./section-start.css'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySectionStartComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-section-start-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;
}