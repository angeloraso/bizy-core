import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bizyUnique' })
export class BizyUniquePipe implements PipeTransform {
  transform<T>(items: Array<T>, property?: string): Array<T> {
    if (!items) {
      return [];
    }

    if (!Array.isArray(items) || items.length <= 1) {
      return items;
    }

    function getNestedValue(obj: T, path: string): T {
      return path.split('.').reduce((acc, key) => acc?.[key], obj);
    }

    const _items = new Set<any>();

    return items.filter(item => {
      const value = property ? getNestedValue(item, property) : item;

      if (_items.has(value)) {
        return false;
      }

      _items.add(value);
      return true;
    });
  }
}
