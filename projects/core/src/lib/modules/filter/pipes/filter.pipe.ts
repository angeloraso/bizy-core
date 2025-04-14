import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyFilter'
})
export class BizyFilterPipe implements PipeTransform {
  transform<T>(
    items: Array<T>,
    property: string,
    states: Array<{ id: string | number | boolean; selected: boolean }>
  ): Array<T> {
    if (!items || items.length === 0) {
      return [];
    }

    if (!property || !states || states.length === 0) {
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

    function deepEqual(a, b, seen = new WeakMap()) {
      if (a === b) return true;
      if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
    
      // Circular reference check
      if (seen.has(a)) return seen.get(a) === b;
      seen.set(a, b);
    
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
    
      if (aKeys.length !== bKeys.length) return false;
    
      for (let key of aKeys) {
        if (!bKeys.includes(key)) return false;
        if (!deepEqual(a[key], b[key], seen)) return false;
      }
    
      return true;
    }
    
    function uniqueObjects(items: Array<T>) {
      return items.filter((obj, index, self) =>
        index === self.findIndex(other => deepEqual(obj, other))
      );
    }

    return uniqueObjects(output);
  }
}
