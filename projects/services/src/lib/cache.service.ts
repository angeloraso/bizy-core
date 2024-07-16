import { Inject, Injectable } from '@angular/core';
import { BizyRouterService } from './router.service';
@Injectable()
export class BizyCacheService {
  readonly CACHE_PREFIX = 'BIZY-CACHE';
  constructor(@Inject(BizyRouterService) private router: BizyRouterService) {}

  getData<T>(key?: string): T {
    if (!key) {
      key = this.router.getURL();
    }

    const data = sessionStorage.getItem(`${this.CACHE_PREFIX}-${key}`);
    if (data) {
      const _data = JSON.parse(data) as {expiresAt: number, value: T}
      return Date.now() < _data.expiresAt ? _data.value : {} as T
    }

    return {} as T;
  }

  setData<T>(value: T, key?: string, expiresAt?: number) {
    if (!value) {
      return;
    }

    if (!key) {
      key = this.router.getURL();
    }

    if (!expiresAt) {
      const date = new Date();
      date.setHours(23, 59, 59);
      expiresAt = date.getTime();
    }

    const data = {
      expiresAt,
      value
    }

    sessionStorage.setItem(`${this.CACHE_PREFIX}-${key}`, JSON.stringify(data));
  }

  remove(key?: string) {
    if (!key) {
      key = this.router.getURL();
    }

    sessionStorage.removeItem(`${this.CACHE_PREFIX}-${key}`);
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
