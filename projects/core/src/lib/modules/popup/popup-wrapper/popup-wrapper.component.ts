import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BizyPopupService } from '../popup.service';

@Component({
  selector: 'bizy-popup-wrapper',
  templateUrl: './popup-wrapper.html',
  styleUrls: ['./popup-wrapper.css'],
  imports: [CommonModule, DialogModule, DragDropModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BizyPopupWrapperComponent<T> {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  readonly #component: ComponentType<T> = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #popup = inject(BizyPopupService);
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
    this.#popup.close({id: this.#dialogRef.id});
  }
}