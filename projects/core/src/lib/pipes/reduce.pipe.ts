import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyReduce'
})
export class BizyReducePipe implements PipeTransform {
  transform(items: Array<unknown>, key: string, fixedTo: number = 2): number {
    if (!items || items.length === 0) {
      return 0;
    }

    let _items = key ? items.filter(_item => _item[key]).map(_d => _d[key]) : items;
    const reduce = _items.filter(v => Number.isFinite(Number(v))).reduce((acc, value) => acc +  Number(value), 0);
    return Number(reduce.toFixed(fixedTo));
  }
}
