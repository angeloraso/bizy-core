import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BIZY_ANIMATION, BizyAnimationService } from '../../../services';

@Component({
  selector: 'bizy-full-screen-popup-wrapper',
  templateUrl: './full-screen-popup-wrapper.html',
  styleUrls: ['./full-screen-popup-wrapper.css'],
  imports: [CommonModule, DialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    'class': 'animated slide-in-up'
  }
})
export class BizyFullScreenPopupWrapperComponent<T> {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  readonly #animation = inject(BizyAnimationService);
  readonly #elementRef = inject(ElementRef);
  readonly #component: ComponentType<T> = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #ref = inject(ChangeDetectorRef);

  loading: boolean = false;

  ngAfterViewInit() {
    this.loadDynamicComponent();
  }

  loadDynamicComponent() {
    if (this.#component) {
      this.dynamicComponentContainer.clear();
      this.dynamicComponentContainer.createComponent(this.#component);

      this.#ref.detectChanges();
    }
  }

  async close() {
    try {
      this.loading = true;
      await this.#animation.setAnimation(this.#elementRef.nativeElement, BIZY_ANIMATION.SLIDE_OUT_DOWN);
      this.#dialogRef.close();
    } finally {
      this.loading = false;
    }
  }
}