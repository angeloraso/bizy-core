import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';

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

  readonly #component: ComponentType<T> = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #ref = inject(ChangeDetectorRef);

  disabled: boolean = false;

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
    this.disabled = true;
    this.#dialogRef.close();
  }
}