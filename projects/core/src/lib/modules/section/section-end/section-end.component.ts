
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-section-end',
  templateUrl: './section-end.html',
  styleUrls: ['./section-end.css'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizySectionEndComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-section-end-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;
}