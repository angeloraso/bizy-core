import { Inject, Injectable } from '@angular/core';
import { ToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';

export enum TOAST {
  DEFAULT = 'default',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

@Injectable()
export class ToastService {
  #toast: DialogRef<ToastWrapperComponent> | null = null;
  
  #closing: boolean = false;

  constructor(@Inject(Dialog) private dialog: Dialog) { }

  #open(data: {type: TOAST, title?: string, msg?: string }) {
    this.#toast = this.dialog.open<ToastWrapperComponent>(ToastWrapperComponent, ({
      data,
      autoFocus: true,
      hasBackdrop: false,
      disableClose: false,
      panelClass: ['bizy-toast', 'bizy-toast--in'] 
    } as DialogConfig<unknown, DialogRef<ToastWrapperComponent>>));

    setTimeout(() => {
      this.close();
    }, 3000);
  }

  default(data: {title?: string, msg?: string}) {
    this.#open({type: TOAST.DEFAULT, ...data});
  }

  info(data: {title?: string, msg?: string}) {
    this.#open({type: TOAST.INFO, ...data});
  }

  success(data: {title?: string, msg?: string}) {
    this.#open({type: TOAST.SUCCESS, ...data});
  }

  warning(data: {title?: string, msg?: string}) {
    this.#open({type: TOAST.WARNING, ...data});
  }

  danger(data: {title?: string, msg?: string}) {
    this.#open({type: TOAST.DANGER, ...data});
  }

  close = () => {
    if (!this.#toast || this.#closing) {
      return;
    }

    this.#closing = true;

    this.#toast.removePanelClass('bizy-toast--in');
    this.#toast.addPanelClass('bizy-toast--out');

    setTimeout(() => {
      this.#toast.close();
      this.#toast = null;
      this.#closing = false;
    }, 500);
  }
}