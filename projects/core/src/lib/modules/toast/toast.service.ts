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

  static toasts: Array<{ref: DialogRef<BizyToastWrapperComponent>, element: HTMLElement | null}> = [];

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

    let container: HTMLElement | null = null;
    let tries: number = 3;
    const interval = setInterval(() => {
      if (tries <= 0) {
        BizyToastService.toasts.push({ref: toastRef, element: null});
        clearInterval(interval);
      }

      container = this.#document.getElementById(id) as HTMLElement;
      if (!container || !container.parentElement) {
        tries--;
        return;
      }

      const offset = this.#calculateOffset();
      container.parentElement.style.top = `${offset}px`;
      BizyToastService.toasts.push({ref: toastRef, element: container.parentElement});

      tries = 0;
      clearInterval(interval);
    }, 300);
  }

  #calculateOffset = (): number => {
    let offset = 10;
    for (const toast of BizyToastService.toasts) {
      if (toast.element) {
        offset += toast.element.offsetHeight + 10;
      }
    }
    return offset;
  }

  #repositionToasts = () => {
    let offset = 10;
    for (const toast of BizyToastService.toasts) {
      if (toast.element) { 
        toast.element.style.top = `${offset}px`;
        offset += toast.element.offsetHeight + 10;
      }
    }
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

  debug(data: string | {title: string, msg?: string, duration?: number} = this.defaultDebugTitle) {
    this.#open({type: TOAST.DEBUG, data});
  }

  info(data: string | {title: string, msg?: string, duration?: number} = this.defaultInfoTitle) {
    this.#open({type: TOAST.INFO, data});
  }

  success(data: string | {title: string, msg?: string, duration?: number} = this.defaultSuccessTitle) {
    this.#open({type: TOAST.SUCCESS, data});
  }

  warning(data: string | {title: string, msg?: string, duration?: number} = this.defaultWarningTitle) {
    this.#open({type: TOAST.WARNING, data});
  }

  danger(data: string | {title: string, msg?: string, duration?: number} = this.defaultDangerTitle) {
    this.#open({type: TOAST.DANGER, data});
  }

  close = (id: string) => {
    if (!BizyToastService.toasts || BizyToastService.toasts.length === 0) {
      return;
    } 

    let toast = BizyToastService.toasts.find(_toastRef => _toastRef.ref.id === id);

    if (!toast) {
      toast = BizyToastService.toasts[BizyToastService.toasts.length - 1];
    }

    if (toast.ref) {
      toast.ref.removePanelClass('bizy-toast--in');
      toast.ref.addPanelClass('bizy-toast--out');

      setTimeout(() => {
        toast.ref.close();
        BizyToastService.toasts = BizyToastService.toasts.filter(t => t.ref !== toast.ref);
        this.#repositionToasts();
      }, 500);
    }
  }
}