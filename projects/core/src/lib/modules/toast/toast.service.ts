import { Inject, Injectable } from '@angular/core';
import { BizyToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';

export enum TOAST {
  DEFAULT = 'default',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

@Injectable()
export class BizyToastService {
  static toasts = new Set<DialogRef<BizyToastWrapperComponent>>();
  
  duration: number = 3000;
  defaultSuccessTitle = 'Operación exitosa';
  defaultDangerTitle = 'Hubo un problema';

  constructor(@Inject(Dialog) private dialog: Dialog) { }

  #open(data: {type: TOAST, data: string | {title: string, msg?: string} }) {

    const id = `bizy-toast-${Math.random()}`;
    const toastRef = this.dialog.open(BizyToastWrapperComponent, ({
      id,
      data: {
        type: data.type,
        duration: this.duration,
        id,
        title: typeof data.data === 'string' ? data.data : data.data.title,
        msg: typeof data.data === 'string' ? '' : data.data.msg
      },
      autoFocus: false,
      hasBackdrop: false,
      disableClose: false,
      panelClass: ['bizy-toast', 'bizy-toast--in'] 
    } as DialogConfig<unknown, DialogRef<BizyToastWrapperComponent>>));

    BizyToastService.toasts.add(toastRef);
  }

  config(data: {defaultSuccessTitle?: string, defaultDangerTitle?: string, duration?: number}) {
    if (!data) {
      return;
    }

    if (data.defaultSuccessTitle) {
      this.defaultSuccessTitle = data.defaultSuccessTitle;
    }

    if (data.defaultDangerTitle) {
      this.defaultDangerTitle = data.defaultDangerTitle;
    }

    if (data.duration) {
      this.duration = data.duration;
    }
  }

  default(data: string | {title: string, msg?: string}) {
    this.#open({type: TOAST.DEFAULT, data});
  }

  info(data: string | {title: string, msg?: string}) {
    this.#open({type: TOAST.INFO, data});
  }

  success(data: string | {title: string, msg?: string} = this.defaultSuccessTitle) {
    this.#open({type: TOAST.SUCCESS, data});
  }

  warning(data: string | {title: string, msg?: string}) {
    this.#open({type: TOAST.WARNING, data});
  }

  danger(data: string | {title: string, msg?: string} = this.defaultDangerTitle) {
    this.#open({type: TOAST.DANGER, data});
  }

  close = (id: string) => {
    if ( !id) {
      return;
    }

    let toastRef: DialogRef<BizyToastWrapperComponent> | null = null;
    toastRef = Array.from(BizyToastService.toasts).find(_toastRef => _toastRef.id === id);

    if (toastRef) {
      toastRef.removePanelClass('bizy-toast--in');
      toastRef.addPanelClass('bizy-toast--out');

      setTimeout(() => {
        toastRef.close();
        BizyToastService.toasts.delete(toastRef);
      }, 500);
    }
  }
}