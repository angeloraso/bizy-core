import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyReduce'
})
export class BizyReducePipe implements PipeTransform {
  transform(items: Array<unknown>, key: string, fixedTo: number = 2): number {
    if (!items || items.length === 0) {
      return 0;
    }

    const _items = key ? items.map(item => item == null ? undefined : (Object(item) as Record<string, unknown>)[key]).filter(Boolean) : items;
    const reduce = _items.filter(v => Number.isFinite(Number(v))).reduce<number>((acc, value) => acc + Number(value), 0);
    return Number(reduce.toFixed(fixedTo));
  }
}
