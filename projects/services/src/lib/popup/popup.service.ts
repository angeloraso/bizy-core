import { ComponentType } from "@angular/cdk/portal";
import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { PopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Injectable()
export class PopupService {
  #dialogs = new Set<DialogRef<unknown, PopupWrapperComponent<unknown>>>();
  
  #data: unknown;

  constructor(@Inject(Dialog) private dialog: Dialog) { }


  open<R>(data: {component: ComponentType<unknown>, data?: unknown, customClass?: string, disableClose?: boolean, id?: string}, callback?: (res: R) => void) {
    this.#data = data.data;
    const dialogRef = this.dialog.open(PopupWrapperComponent, ({
      id: data.id,
      data: data.component,
      autoFocus: true,
      hasBackdrop: true,
      disableClose: data.disableClose ?? false,
      panelClass: ['bizy-popup', data.customClass] 
    }));

    this.#dialogs.add(dialogRef);

    dialogRef.closed.pipe(take(1)).subscribe(response => {
      this.#dialogs.delete(dialogRef);
      if (callback) {
        callback(response as R);
      }
    });
  }

  getData<D>() {
    return this.#data as D;
  }

  close(data?: {id?: string, response?: unknown}) {
    let dialogRef: DialogRef<unknown, PopupWrapperComponent<unknown>> | null = null;
    if (data && data.id) {
      dialogRef = Array.from(this.#dialogs).find(_dialogRef => _dialogRef.id === data.id);
    } else {
      dialogRef = Array.from(this.#dialogs).pop();
    }

    if (dialogRef) {
      dialogRef.close(data ? data.response : null);
      this.#dialogs.delete(dialogRef);
    }
  }

  closeAll() {
    Array.from(this.#dialogs).forEach(_dialogRef => {
      _dialogRef.close();
    });
    this.#dialogs.clear();
  }

  openedPopups(): number {
    return this.#dialogs.size;
  }
}