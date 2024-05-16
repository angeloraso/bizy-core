import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizySetToArray'
})
export class BizySetToArrayPipe implements PipeTransform {
  transform<T>(items: Set<T>): Array<T> {
    if (!items) {
      return [];
    }

    return Array.from(items);
  }
}
