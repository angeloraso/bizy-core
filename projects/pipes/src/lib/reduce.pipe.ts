import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyReduce'
})
export class BizyReducePipe implements PipeTransform {
  transform(items: Array<unknown>, key: string, fixedTo: number = 2): number {
    if (!items || items.length === 0) {
      return 0;
    }

    if (!key) {
      const reduce = (<Array<number>>items).reduce((acc, value) => acc + value, 0);
      return Number(reduce.toFixed(fixedTo));
    }

    const reduce = (<Array<number>>items.map(_d => _d[key])).reduce((acc, value) => acc + value, 0);

    return Number(reduce.toFixed(fixedTo));
  }
}
