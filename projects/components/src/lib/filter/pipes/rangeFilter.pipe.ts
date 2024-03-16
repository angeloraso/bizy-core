import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyRangeFilter'
})
export class RangeFilterPipe implements PipeTransform {
  transform<T>(
    items: Array<T>,
    property: string,
    range: { min: number | null; max: number | null }
  ): Array<T> {
    if (!items || items.length === 0) {
      return [];
    }

    if (!property || !range) {
      return items;
    }

    const min = range.min ?? null;
    const max = range.max ?? null;

    const output = items.filter(_item => {
      let _value: any = _item;
      const nestedProperty = property.split('.');
      nestedProperty.forEach(_property => {
        _value = _value[_property];
      });

      if (isNaN(_value)) {
        return false;
      }

      return (min === null || _value >= min) && (max === null || _value <= max);
    });

    return output;
  }
}
