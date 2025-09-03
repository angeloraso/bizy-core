import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BizyPopupService } from '../popup.service';

@Component({
  selector: 'bizy-popup-wrapper',
  templateUrl: './popup-wrapper.html',
  styleUrls: ['./popup-wrapper.css'],
  imports: [CommonModule, DialogModule, DragDropModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.top]': 'position.top',
    '[style.right]': 'position.right',
    '[style.bottom]': 'position.bottom',
    '[style.left]': 'position.left',
    '[style.transform]': 'position.transform'
  }
})
export class BizyPopupWrapperComponent<T> {
  readonly #elementRef = inject(ElementRef);
  readonly #data: {
    component: ComponentType<T>,
    disableClose: boolean,
    disableDrag: boolean,
    position: {top: string, right: string, bottom: string, left: string} | null,
    placement: 'top' | 'right' | 'bottom' | 'left' | null
  } = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #popup = inject(BizyPopupService);
  readonly #ref = inject(ChangeDetectorRef);

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  disabled: boolean = false;

  disableClose: boolean = false;
  disableDrag: boolean = false;
  position: {top: string, right: string, bottom: string, left: string, transform: string} | null = {
    top: '50%',
    right: '50%',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  ngOnInit() {
    if (this.#data) {
      if (this.#data.position) {
        this.position = {
          top: this.#data.position.top,
          right: this.#data.position.right,
          bottom: this.#data.position.bottom,
          left: this.#data.position.left,
          transform: '',
        }
      } else if (this.#data.placement) {
        this.position = {
          top: this.#data.placement === 'top' ? '2rem' : '',
          right: this.#data.placement === 'right' ? '2rem' : '',
          bottom: this.#data.placement === 'bottom' ? '2rem' : '',
          left: this.#data.placement === 'left' ? '2rem' : '',
          transform: this.#data.placement === 'top' || this.#data.placement === 'bottom' ? 'translateX(-50%)' : this.#data.placement === 'right' || this.#data.placement === 'left' ? 'translatey(-50%)' : '',
        }
      }

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

  getNativeElement = () => this.#elementRef?.nativeElement;

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