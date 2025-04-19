import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { BizyPopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { BizyFullScreenPopupWrapperComponent } from "./full-screen-popup-wrapper/full-screen-popup-wrapper.component";
import { BIZY_ANIMATION, BizyAnimationService } from "../../services";

@Injectable()
export class BizyPopupService {
  readonly #animation = inject(BizyAnimationService);
  readonly #dialog = inject(Dialog);
  static dialogs = new Set<DialogRef<unknown, any>>();
  #data: unknown = null;
  
  open<R>(data: {component: ComponentType<unknown>, data?: unknown, customClass?: string, fullScreen?: boolean, disableClose?: boolean, id?: string}, callback?: (res: R) => void) {
    this.#data = data.data;
    const component: ComponentType<unknown> = data.fullScreen ? BizyFullScreenPopupWrapperComponent : BizyPopupWrapperComponent;
    const dialogRef = this.#dialog.open(component, ({
      id: data.id,
      data: data.component,
      autoFocus: true,
      hasBackdrop: true,
      disableClose: data.disableClose ?? true,
      panelClass: [data.fullScreen ? 'bizy-popup' : '', data.customClass] 
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
      const nativeElement = dialogRef.overlayRef.overlayElement;
      await this.#animation.setAnimation(nativeElement, BIZY_ANIMATION.SLIDE_OUT_DOWN);
      dialogRef.close(data ? data.response : null);
      BizyPopupService.dialogs.delete(dialogRef);
    }

    this.#data = null;
  }

  closeAll() {
    Array.from(BizyPopupService.dialogs).forEach(_dialogRef => {
      _dialogRef.close();
    });
    BizyPopupService.dialogs.clear();
    this.#data = null;
  }

  openedPopups(): number {
    return BizyPopupService.dialogs.size;
  }
}