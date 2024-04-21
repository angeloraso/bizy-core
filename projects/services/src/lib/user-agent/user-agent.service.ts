import { Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';

@Injectable({
  providedIn: 'root'
})
export class BizyUserAgentService {
  get() {
    return new Promise<string>(resolve => {
      getUserAgent([
        'architecture',
        'bitness',
        'model',
        'platformVersion',
        'uaFullVersion',
        'fullVersionList'
      ])
        .then(userAgent => {
          resolve(userAgent as string);
        })
        .catch(() => {
          resolve(window.navigator.userAgent);
        });
    });
  }
}
