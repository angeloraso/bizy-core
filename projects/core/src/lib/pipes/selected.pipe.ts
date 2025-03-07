import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizySelected',
})
export class BizySelectedPipe implements PipeTransform {
  transform<T>(items: Array<T & {selected: boolean}>): Array<T & {selected: boolean}> {
    if (!items || items.length === 0) {
      return [];
    }

    return items.filter((_item) => _item.selected === true);
  }
}
