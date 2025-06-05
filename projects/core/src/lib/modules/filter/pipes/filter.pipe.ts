import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyFilter'
})
export class BizyFilterPipe implements PipeTransform {
  transform<T>(
    items: Array<T>,
    property: string,
    states?: string | number | boolean | Array<{ id: string | number | boolean; selected: boolean }>,
  ): Array<T> {
    if (!items || items.length === 0) {
      return [];
    }

    if (!property || typeof states === 'undefined' || states === null) {
      return items;
    }

    if (!Array.isArray(states)) {
      return items.filter(_item => _item[property] === states);
    }

    if (states.length === 0) {
      return items;
    }
    const _selected = states.filter(_state => _state.selected);
    if (_selected.length === states.length) {
      return items;
    }

    let output: Array<T> = [];
    states.forEach(state => {
      if (!state.selected) {
        return;
      }

      const res = items.filter(_item => {
        let _state: T = _item;
        const nestedProperty = property.split('.');
        nestedProperty.forEach(_property => {
          _state = _state[_property];
        });

        if (typeof state.id === 'boolean') {
          return Boolean(_state) === state.id;
        }

        if (Array.isArray(_state)) {
          return _state.includes(state.id);
        }

        return _state === state.id;
      });
      output = output.concat(res);
    });

    function safeStringify(obj: unknown): string {
      const seen = new WeakSet();

      function replacer(_key: string, value: unknown) {
        // Handle circular references
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return '[Circular]';
          seen.add(value);
        }

        // Handle BigInt
        if (typeof value === 'bigint') return value.toString() + 'n';

        // Handle Symbol and Function
        if (typeof value === 'symbol') return value.toString();
        if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`;

        // Preserve Dates
        if (value instanceof Date) return `__DATE__:${value.toISOString()}`;

        return value;
      }

      return JSON.stringify(obj, replacer);
    }

    function uniqueObjects<T>(items: T[]): T[] {
      const seen = new Set<string>();
      const result: T[] = [];

      for (const item of items) {
        const str = safeStringify(item);
        if (!seen.has(str)) {
          seen.add(str);
          result.push(item);
        }
      }

      return result;
    }

    return uniqueObjects(output);
  }
}
