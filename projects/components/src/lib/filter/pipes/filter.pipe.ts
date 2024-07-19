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

      // Filter out duplicates by serializing objects to JSON
      output = output.filter((obj, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(obj)));
    });

    return output;
  }
}
