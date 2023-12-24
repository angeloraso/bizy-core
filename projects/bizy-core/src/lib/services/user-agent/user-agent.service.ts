import { Injectable } from '@angular/core';
import { getUserAgent } from './uach-retrofill';

@Injectable()
export class UserAgentService {
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
          resolve(userAgent);
        })
        .catch(() => {
          resolve(window.navigator.userAgent);
        });
    });
  }
}
