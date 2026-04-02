import { inject, Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';
import { DeviceDetectorService } from 'ngx-device-detector';
import { debounceTime, fromEvent, map, Observable, startWith } from 'rxjs';

interface WindowSize {
  height: number,
  width: number
}

@Injectable({ providedIn: 'root' })
export class BizyDeviceService {
  readonly #device = inject(DeviceDetectorService);

  get windowSizeChange$(): Observable<WindowSize> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(200),
      map((event: any) => <WindowSize>{
        width: event.currentTarget.innerWidth,
        height: event.currentTarget.innerHeight
      }),
      startWith({
          width: window.innerWidth,
          height: window.innerHeight
      })
    );
  }


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