import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BIZY_SKELETON_SHAPE } from './skeleton.types';

@Component({
  selector: 'bizy-skeleton',
  templateUrl: './skeleton.html',
  styleUrls: ['./skeleton.css'],
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