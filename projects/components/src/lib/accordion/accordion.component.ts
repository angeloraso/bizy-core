import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bizy-accordion',
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyAccordionComponent {
  @Input() customClass: string;
  @Input() opened: boolean = false;
  @Output() onOpen = new EventEmitter<boolean>();
}