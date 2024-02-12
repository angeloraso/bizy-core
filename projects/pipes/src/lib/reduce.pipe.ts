import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyReduce'
})
export class ReducePipe implements PipeTransform {
  transform(items: Array<unknown>, key: string): number {
    if (!items) {
      return 0;
    }

    const reduce = items.map(_d => _d[key]).reduce((acc, value) => acc + value, 0);

    return reduce.toFixed(2);
  }
}
