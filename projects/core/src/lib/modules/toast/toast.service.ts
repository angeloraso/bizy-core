import { inject, Injectable, DOCUMENT } from '@angular/core';
import { BizyToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';


export enum TOAST {
  DEBUG = 'debug',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

@Injectable()
export class BizyToastService {
  readonly #document = inject(DOCUMENT);
  readonly #dialog = inject(Dialog);

  static toasts = new Set<DialogRef<BizyToastWrapperComponent>>();
  
  duration: number = 3000;
  defaultDebugTitle = 'Ha sucedido un evento';
  defaultInfoTitle = 'Observación';
  defaultSuccessTitle = 'Operación exitosa';
  defaultWarningTitle = 'Advertencia';
  defaultDangerTitle = 'Hubo un problema';

  #open(data: {type: TOAST, data: string | {title: string, msg?: string, duration?: number} }) {

    if (typeof data.data !== 'string' && data.data.duration) {
      this.duration = data.data.duration;
      this.#document.documentElement.style.setProperty('--bizy-toast-duration', `${data.data.duration}ms`);
    }

    const id = `bizy-toast-${Math.random()}`;
    const toastRef = this.#dialog.open(BizyToastWrapperComponent, ({
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

  config(data: {
    defaultDebugTitle?: string,
    defaultInfoTitle?: string,
    defaultSuccessTitle?: string,
    defaultWarningTitle?: string,
    defaultDangerTitle?: string,
    duration?: number
  }) {
    if (!data) {
      return;
    }

    if (data.defaultDebugTitle) {
      this.defaultDebugTitle = data.defaultDebugTitle;
    }

    if (data.defaultInfoTitle) {
      this.defaultInfoTitle = data.defaultInfoTitle;
    }

    if (data.defaultSuccessTitle) {
      this.defaultSuccessTitle = data.defaultSuccessTitle;
    }

    if (data.defaultWarningTitle) {
      this.defaultWarningTitle = data.defaultWarningTitle;
    }

    if (data.defaultDangerTitle) {
      this.defaultDangerTitle = data.defaultDangerTitle;
    }

    if (data.duration) {
      this.duration = data.duration;
      this.#document.documentElement.style.setProperty('--bizy-toast-duration', `${data.duration}ms`);
    }
  }

  debug(data: string | {title: string, msg?: string, duration?: number}) {
    this.#open({type: TOAST.DEBUG, data});
  }

  info(data: string | {title: string, msg?: string, duration?: number}) {
    this.#open({type: TOAST.INFO, data});
  }

  success(data: string | {title: string, msg?: string, duration?: number} = this.defaultSuccessTitle) {
    this.#open({type: TOAST.SUCCESS, data});
  }

  warning(data: string | {title: string, msg?: string, duration?: number}) {
    this.#open({type: TOAST.WARNING, data});
  }

  danger(data: string | {title: string, msg?: string, duration?: number} = this.defaultDangerTitle) {
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