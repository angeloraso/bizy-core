import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-list',
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizyListComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-list-${Math.random()}`;

  getNativeElement = () => this.#elementRef?.nativeElement;
}