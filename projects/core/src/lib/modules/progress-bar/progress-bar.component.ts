import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'bizy-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrls: ['./progress-bar.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[id]': 'id'
  }
})
export class BizyProgressBarComponent {
  readonly #elementRef = inject(ElementRef);
  @Input() id: string = `bizy-progress-bar-${Math.random()}`;
  @Input() progress: number | null = null;

  getNativeElement = () => this.#elementRef?.nativeElement;
}