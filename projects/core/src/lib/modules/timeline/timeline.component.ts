
import { CommonModule, DOCUMENT } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, contentChild, ElementRef, inject, Input, viewChild } from '@angular/core';
import { BizyTimelineForDirective } from './timeline.directive';
import { getClosestCssVariable } from '../../utils/css';

@Component({
  selector: 'bizy-timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css'],
  imports: [CommonModule, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    '[class]': 'customClass'
  }
})
export class BizyTimelineComponent implements AfterViewInit {
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #changeDetector = inject(ChangeDetectorRef);
  readonly #document = inject(DOCUMENT);
  readonly timelineFor = contentChild(BizyTimelineForDirective);
  readonly viewport = viewChild(CdkVirtualScrollViewport);
  @Input() id: string = `bizy-timeline-${Math.random()}`;
  @Input() customClass: string = '';
  itemSize = 72;

  ngAfterViewInit(): void {
    if (!this.timelineFor()) {
      return;
    }

    const view = this.#document.defaultView;
    if (!view) {
      return;
    }

    const rootFontSize = Number.parseFloat(getClosestCssVariable(this.#document.documentElement, 'font-size') ?? '') || 16;
    const hostFontSize = Number.parseFloat(getClosestCssVariable(this.#elementRef.nativeElement, 'font-size') ?? '') || rootFontSize;
    const eventHeight = this.#toPixels(getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-timeline-event-height') || '4rem', rootFontSize, hostFontSize, 64);
    const rowGap = this.#toPixels(getClosestCssVariable(this.#elementRef.nativeElement, '--bizy-timeline-row-gap') || '0.5rem', rootFontSize, hostFontSize, 8);
    this.itemSize = eventHeight + rowGap;
    this.#changeDetector.detectChanges();
    this.viewport()?.checkViewportSize();
  }

  #toPixels(value: string, rootFontSize: number, hostFontSize: number, fallback: number): number {
    const size = Number.parseFloat(value);
    if (!Number.isFinite(size)) {
      return fallback;
    }

    if (value.trim().endsWith('rem')) {
      return size * rootFontSize;
    }

    if (value.trim().endsWith('em')) {
      return size * hostFontSize;
    }

    return size;
  }

  getNativeElement = () => this.#elementRef?.nativeElement;
}
