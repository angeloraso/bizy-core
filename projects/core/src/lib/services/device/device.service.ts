import { inject, Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({ providedIn: 'root' })
export class BizyDeviceService {
  readonly #device = inject(DeviceDetectorService);

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

  isMobile = (): boolean => this.#device.isMobile();

  isTablet = (): boolean => this.#device.isTablet();

  isDesktop = (): boolean => this.#device.isDesktop();

  isPortrait = (): boolean => this.#device.orientation() === 'portrait';

  isLandscape = (): boolean => this.#device.orientation() === 'landscape';
}