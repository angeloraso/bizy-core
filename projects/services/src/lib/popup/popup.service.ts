import { ComponentType } from "@angular/cdk/portal";
import { Inject, Injectable } from "@angular/core";
import { Subject, take } from "rxjs";
import { PopupWrapperComponent } from "./popup-wrapper/popup-wrapper.component";
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';

@Injectable()
export class PopupService<T, R> {
  #dialogs = new Set<DialogRef<R, PopupWrapperComponent<T>>>();
  
  closed$ = new Subject<R>();

  #data: unknown;

  constructor(@Inject(Dialog) private dialog: Dialog) { }


  open(data: {component: ComponentType<T>, data?: unknown, customClass?: string, disableClose?: boolean, id?: string}) {
    this.#data = data.data;
    const dialogRef = this.dialog.open<R, unknown, PopupWrapperComponent<T>>(PopupWrapperComponent, ({
      id: data.id,
      data: data.component,
      autoFocus: true,
      hasBackdrop: true,
      disableClose: data.disableClose ?? false,
      panelClass: ['bizy-popup', data.customClass] 
    } as DialogConfig<unknown, DialogRef<R, PopupWrapperComponent<T>>>));

    this.#dialogs.add(dialogRef);

    dialogRef.closed.pipe(take(1)).subscribe(result => {
      this.#dialogs.delete(dialogRef);
      this.closed$.next(result);
    });
  }

  getData<S>() {
    return this.#data as S;
  }

  close(data?: {id?: string, data?: R}) {
    let dialogRef: DialogRef<R, PopupWrapperComponent<T>>;
    if (data && data.id) {
      dialogRef = Array.from(this.#dialogs).find(_dialogRef => _dialogRef.id === data.id);
    } else {
      dialogRef = Array.from(this.#dialogs).pop();
    }

    if (dialogRef) {
      dialogRef.close(data ? data.data : null);
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