import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyOderAlphabetically'
})
export class OrderAlphabeticallyPipe implements PipeTransform {
  transform<T>(elements: Array<T>, property: string = '', turnOff: boolean = false, order: 'asc' | 'desc' = 'asc'): Array<T> {
    if (turnOff) {
      return elements;
    }

    // No elements
    if (!elements || !order) {
      return elements;
    }

    // Array with only one item
    if (elements.length <= 1) {
      return elements;
    }

    if (property === '') {
      if (order === 'asc') {
        elements.sort();
        return [...elements];
      }

      elements.sort().reverse();
      return [...elements];
    }

    elements.sort((a: any, b: any) => {
      let aValue: any = a;
      let bValue: any = b;
      const nestedProperty = property.split('.');
      nestedProperty.forEach(_property => {
        aValue = aValue[_property];
        bValue = bValue[_property];
      });

      if (typeof aValue === 'undefined' && typeof bValue === 'undefined') {
        return 0;
      }

      if (typeof aValue === 'undefined' && typeof bValue !== 'undefined') {
        return order === 'desc' ? 1 : -1;
      }

      if (typeof aValue !== 'undefined' && typeof bValue === 'undefined') {
        return order === 'desc' ? -1 : 1;
      }

      if (aValue === bValue) {
        return 0;
      }

      if (order === 'desc') {
        return (aValue.toString().toLowerCase() > bValue.toString().toLowerCase() ? -1 : 1);
      }

      return (bValue.toString().toLowerCase() > aValue.toString().toLowerCase() ? -1 : 1);
    });
    return [...elements];
  }
}
