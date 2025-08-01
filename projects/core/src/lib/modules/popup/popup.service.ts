import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { BizyPopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { BizyFullScreenPopupWrapperComponent } from "./full-screen-popup-wrapper/full-screen-popup-wrapper.component";
import { BIZY_ANIMATION, BizyAnimationService, BizyValidatorService } from "../../services";

@Injectable()
export class BizyPopupService {
  readonly #animation = inject(BizyAnimationService);
  readonly #validator = inject(BizyValidatorService);
  readonly #dialog = inject(Dialog);
  static dialogs = new Set<DialogRef<unknown, any>>();
  #data: unknown = null;
  
  /**
   * 
   * @param data.disableClose Deprecated
   */
  open<R>(data: {component: ComponentType<unknown>, data?: unknown, customClass?: Array<string> | string, fullScreen?: boolean, disableClose?: boolean, disableBackdropClose?: boolean, id?: string, disableCloseButton?: boolean, disableDragButton?: boolean, position?: {top?: string, right?: string, bottom?: string, left?: string}}, callback?: (res: R) => void) {
    this.#data = data.data;
    const component: ComponentType<unknown> = data.fullScreen ? BizyFullScreenPopupWrapperComponent : BizyPopupWrapperComponent;
    const dialogRef = this.#dialog.open(component, ({
      id: data.id,
      data: {
        component: data.component,
        disableClose: data.disableCloseButton ?? false,
        disableDrag: data.disableDragButton ?? false,
        position: data.position,
      },
      autoFocus: true,
      hasBackdrop: true,
      disableClose: typeof data.disableBackdropClose !== 'undefined' && data.disableBackdropClose !== null ? data.disableBackdropClose : typeof data.disableClose !== 'undefined' && data.disableClose !== null ? data.disableClose : true,
      panelClass: Array.isArray(data.customClass) ? data.customClass : this.#validator.isString(data.customClass) ? [data.customClass] : []
    }));

    BizyPopupService.dialogs.add(dialogRef);

    dialogRef.closed.pipe(take(1)).subscribe(response => {
      BizyPopupService.dialogs.delete(dialogRef);
      if (callback) {
        callback(response as R);
      }
    });
  }

  getData<D>() {
    return this.#data as D;
  }

  async close(data?: {id?: string, response?: unknown}) {
    let dialogRef: DialogRef<unknown, any> | null = null;
    if (data && data.id) {
      dialogRef = Array.from(BizyPopupService.dialogs).find(_dialogRef => _dialogRef.id === data.id);
    } else {
      dialogRef = Array.from(BizyPopupService.dialogs).pop();
    }

    if (dialogRef) {
      if (dialogRef.componentInstance instanceof BizyFullScreenPopupWrapperComponent && dialogRef.overlayRef && dialogRef.overlayRef.overlayElement) {
        const nativeElement = dialogRef.overlayRef.overlayElement.querySelector('bizy-full-screen-popup-wrapper');
        await this.#animation.setAnimation(<HTMLElement>nativeElement, BIZY_ANIMATION.SLIDE_OUT_DOWN);
      }
      dialogRef.close(data ? data.response : null);
      BizyPopupService.dialogs.delete(dialogRef);
    }
  }

  closeAll() {
    Array.from(BizyPopupService.dialogs).forEach(_dialogRef => {
      _dialogRef.close();
    });
    BizyPopupService.dialogs.clear();
  }

  openedPopups(): number {
    return BizyPopupService.dialogs.size;
  }
}