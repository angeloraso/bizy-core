import { inject, Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';
import { DeviceDetectorService } from 'ngx-device-detector';
import { fromEvent, map, startWith } from 'rxjs';

export interface IWindowSize {
  height: number,
  width: number
}

export enum BIZY_DEVICE_OS {
  IOS = 'iOS',
  MAC = 'Mac',
  ANDROID = 'Android',
  WINDOWS = 'Windows',
  LINUX = 'Linux'
}

export enum BIZY_DEVICE_BROWSER {
  CHROME = 'CHROME',
  SAFARI = 'SAFARI',
  EDGE = 'EDGE',
  OPERA = 'OPERA',
  FIREFOX = 'FIREFOX',
  UNKNOWN = 'UNKNOWN',
}

@Injectable({ providedIn: 'root' })
export class BizyDeviceService {
  readonly #device = inject(DeviceDetectorService);

  readonly windowSizeChange$ = fromEvent(window, 'resize').pipe(
    map((event: any) => <IWindowSize>{
      width: event.currentTarget.innerWidth,
      height: event.currentTarget.innerHeight
    }),
    startWith({
      width: window.innerWidth,
      height: window.innerHeight
    })
  );

  async getUserAgent() {
    try {
      const userAgent = await getUserAgent([
        'architecture',
        'bitness',
        'model',
        'platformVersion',
        'uaFullVersion',
        'fullVersionList'
      ]);
      return userAgent;
    } catch {
      return window.navigator.userAgent;
    }
  }

  getWindowSize = (): IWindowSize => { 
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };

  getWindowWidth = (): number => window.innerWidth

  getWindowHeight = (): number => window.innerHeight

  isMobile = (): boolean => this.#device.isMobile();

  isTablet = (): boolean => this.#device.isTablet();

  isDesktop = (): boolean => this.#device.isDesktop();

  isPortrait = (): boolean => this.#device.orientation() === 'portrait';

  isLandscape = (): boolean => this.#device.orientation() === 'landscape'

  isIOS = (): boolean => this.#device.os() === BIZY_DEVICE_OS.IOS;

  isAndroid = (): boolean => this.#device.os() === BIZY_DEVICE_OS.ANDROID;

  isMacintosh = (): boolean => this.#device.os() === BIZY_DEVICE_OS.MAC;

  isWindows = (): boolean => this.#device.os() === BIZY_DEVICE_OS.WINDOWS;

  isLinux = (): boolean => this.#device.os() === BIZY_DEVICE_OS.LINUX;

  getOS = (): BIZY_DEVICE_OS => this.#device.os() as BIZY_DEVICE_OS;

  getBrowser = (): BIZY_DEVICE_BROWSER => {
    const browser = this.#device.browser();
    if (browser.indexOf('Chrome') !== -1) {
      return BIZY_DEVICE_BROWSER.CHROME;
    }

    if (browser.indexOf('Firefox') !== -1) {
      return BIZY_DEVICE_BROWSER.FIREFOX;
    }

    if (browser.indexOf('Safari') !== -1) {
      return BIZY_DEVICE_BROWSER.SAFARI;
    }

    if (browser.indexOf('Edge') !== -1) {
      return BIZY_DEVICE_BROWSER.EDGE;
    }

    if (browser.indexOf('Opera') !== -1 || browser.indexOf('OPR') !== -1) {
      return BIZY_DEVICE_BROWSER.OPERA;
    }

    return BIZY_DEVICE_BROWSER.UNKNOWN;
  }
}