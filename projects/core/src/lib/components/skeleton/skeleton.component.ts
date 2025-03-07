import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BIZY_SKELETON_SHAPE } from './skeleton.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-skeleton',
  templateUrl: './skeleton.html',
  styleUrls: ['./skeleton.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizySkeletonComponent {
  @Input() id: string = `bizy-skeleton-${Math.random()}`;
  @Input() shape: BIZY_SKELETON_SHAPE = BIZY_SKELETON_SHAPE.SQUARE;
  @Input() height: string;
  @Input() width: string;
  @Input() customClass: string = '';

  readonly BIZY_SKELETON_SHAPE = BIZY_SKELETON_SHAPE;
}