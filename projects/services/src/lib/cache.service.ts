import { Inject, Injectable } from '@angular/core';
import { RouterService } from './router.service';
@Injectable()
export class CacheService {
  readonly CACHE_PREFIX = 'BIZY-CACHE';
  constructor(@Inject(RouterService) private router: RouterService) {}

  getData<T>(key?: string): T {
    if (!key) {
      key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
    }

    const data = sessionStorage.getItem(key!);
    if (data) {
      return JSON.parse(data);
    }

    return {} as T;
  }

  setData<T>(value: T, key?: string) {
    if (!value) {
      return;
    }

    if (!key) {
      key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
    }

    sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(key?: string) {
    if (!key) {
      key = `${this.CACHE_PREFIX}-${this.router.getURL()}`;
    }

    sessionStorage.removeItem(key);
  }

  removeAll() {
    const cacheKeys = Object.keys(sessionStorage).filter(key => {
      return key.includes(this.CACHE_PREFIX);
    });
    cacheKeys.forEach(value => {
      sessionStorage.removeItem(value);
    });
  }
}
