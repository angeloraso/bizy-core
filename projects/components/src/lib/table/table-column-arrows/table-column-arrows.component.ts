import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-table-column-arrows',
  templateUrl: './table-column-arrows.html',
  styleUrls: ['./table-column-arrows.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTableColumnArrowsComponent {
  @Input() order: 'asc' | 'desc' | null = null;
  @Input() show: boolean = false;
  @Input() customClass: string = '';
}