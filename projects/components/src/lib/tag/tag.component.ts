import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTagComponent {
  @Input() id?: string | number;
  @Input() customClass: string = '';
}
