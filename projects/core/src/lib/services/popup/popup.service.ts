import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { BizyPopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root'
})
export class BizyPopupService {
  readonly #dialog = inject(Dialog);
  static dialogs = new Set<DialogRef<unknown, BizyPopupWrapperComponent<unknown>>>();
  static data: unknown = null;;
  
  open<R>(data: {component: ComponentType<unknown>, data?: unknown, customClass?: string, disableClose?: boolean, id?: string}, callback?: (res: R) => void) {
    BizyPopupService.data = data.data;
    const dialogRef = this.#dialog.open(BizyPopupWrapperComponent, ({
      id: data.id,
      data: data.component,
      autoFocus: true,
      hasBackdrop: true,
      disableClose: data.disableClose ?? false,
      panelClass: ['bizy-popup', data.customClass] 
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
    return BizyPopupService.data as D;
  }

  close(data?: {id?: string, response?: unknown}) {
    let dialogRef: DialogRef<unknown, BizyPopupWrapperComponent<unknown>> | null = null;
    if (data && data.id) {
      dialogRef = Array.from(BizyPopupService.dialogs).find(_dialogRef => _dialogRef.id === data.id);
    } else {
      dialogRef = Array.from(BizyPopupService.dialogs).pop();
    }

    if (dialogRef) {
      dialogRef.close(data ? data.response : null);
      BizyPopupService.dialogs.delete(dialogRef);
    }

    BizyPopupService.data = null;
  }

  closeAll() {
    Array.from(BizyPopupService.dialogs).forEach(_dialogRef => {
      _dialogRef.close();
    });
    BizyPopupService.dialogs.clear();
    BizyPopupService.data = null;
  }

  openedPopups(): number {
    return BizyPopupService.dialogs.size;
  }
}