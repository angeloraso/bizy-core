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
    '[style.top]': 'position && position.top ? position.top : position ? "" : "50%"',
    '[style.right]': 'position && position.right ? position.right : position ? "" : "50%"',
    '[style.bottom]': 'position && position.bottom ? position.bottom : position ? "" : "50%"',
    '[style.left]': 'position && position.left ? position.left : position ? "" : "50%"',
    '[style.transform]': 'position ? "" : "translate(-50%, -50%)"'
  }
})
export class BizyPopupWrapperComponent<T> {
  readonly #elementRef = inject(ElementRef);
  readonly #data: {component: ComponentType<T>, disableClose: boolean, disableDrag: boolean, position?: {top: string, right: string, bottom: string, left: string}} = inject(DIALOG_DATA);
  readonly #dialogRef: DialogRef<void> = inject(DialogRef);
  readonly #popup = inject(BizyPopupService);
  readonly #ref = inject(ChangeDetectorRef);

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  disabled: boolean = false;

  disableClose: boolean = false;
  disableDrag: boolean = false;
  position: {top: string, right: string, bottom: string, left: string} | null = null;

  ngOnInit() {
    if (this.#data) {
      if (this.#data.position) {
        this.position = this.#data.position;
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