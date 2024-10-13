import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bizy-skeleton-card',
  templateUrl: './skeleton-card.html',
  styleUrls: ['./skeleton-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySkeletonCardComponent {
  @Input() id: string = `bizy-skeleton-card-${Math.random()}`;
  @Input() customClass: string = '';
  @Output() onSelect = new EventEmitter<PointerEvent>();
}