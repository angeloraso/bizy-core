import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bizy-error',
  templateUrl: './error.html',
  styleUrls: ['./error.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyErrorComponent {}