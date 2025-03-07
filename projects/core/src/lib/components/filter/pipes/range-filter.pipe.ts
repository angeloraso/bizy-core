import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyRangeFilter'
})
export class BizyRangeFilterPipe implements PipeTransform {
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

    let itemsWithoutProperty: Array<T> = [];

    const output = items.filter(_item => {
      let _value: any = _item;
      const nestedProperty = property.split('.');
      for (let i = 0; i < nestedProperty.length; i++) {
        const _property = nestedProperty[i];
        if (typeof _value[_property] === 'undefined' || _value[_property] === null) {
          itemsWithoutProperty.push(_item);
          return false;
        }

        _value = _value[_property];
      }

      if (isNaN(_value)) {
        return false;
      }

      return (min === null || _value >= min) && (max === null || _value <= max);
    });

    return itemsWithoutProperty.length === items.length ? items : output;
  }
}
