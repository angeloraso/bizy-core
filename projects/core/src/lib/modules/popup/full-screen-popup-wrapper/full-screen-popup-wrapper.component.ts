import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BizyPopupService } from '../popup.service';

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

  readonly #data: {component: ComponentType<T>, disableClose: boolean, disableDrag: boolean} = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #popup = inject(BizyPopupService);
  readonly #ref = inject(ChangeDetectorRef);

  disabled: boolean = false;

  disableClose: boolean = false;
  disableDrag: boolean = false;

  ngOnInit() {
    if (this.#data) {
      if (this.#data.disableClose) {
          this.disableClose = this.#data.disableClose;
      }
  
      if (this.#data.disableDrag) {
        this.disableDrag = this.#data.disableDrag;
      }
    }
  }

  ngAfterViewInit() {
    this.loadDynamicComponent();
  }

  loadDynamicComponent = () => {
    if (this.#data && this.#data.component) {
      this.dynamicComponentContainer.clear();
      this.dynamicComponentContainer.createComponent(this.#data.component);

      this.#ref.detectChanges();
    }
  }

  async close() {
    this.disabled = true;
    this.#popup.close({id: this.#dialogRef.id});
  }
}