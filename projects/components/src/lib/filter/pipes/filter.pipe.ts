import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyFilter'
})
export class FilterPipe implements PipeTransform {
  transform<T>(
    items: Array<T>,
    property: string,
    states: Array<{ id: string; selected: boolean }>
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

        return _state === state.id;
      });
      output = output.concat(res);
    });

    return output;
  }
}
