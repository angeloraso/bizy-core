import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import { BIZY_TAG_TYPE } from './tag.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bizy-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTagComponent {
  @Input() id: string = `bizy-tag-${Math.random()}`;
  @Input() customClass: string = '';
  @Input() type: BIZY_TAG_TYPE = BIZY_TAG_TYPE.DEFAULT;
  @Output() onSelect = new EventEmitter<PointerEvent>();
}
