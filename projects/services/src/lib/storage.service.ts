import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BizyStorageService {

  get<T>(key: string): T {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      return item as T;
    }
  }

  set(key: string, value: unknown): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, String(value));
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}