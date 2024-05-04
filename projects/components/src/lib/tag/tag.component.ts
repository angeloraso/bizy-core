import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { TagType } from './tag.types';

@Component({
  selector: 'bizy-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyTagComponent {
  @Input() set type(type: TagType) {
    if (!type || !this.elementRef || !this.elementRef.nativeElement) {
      return;
    }

    this.renderer.setAttribute(this.elementRef.nativeElement, 'type', type);
  } 

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}
}
