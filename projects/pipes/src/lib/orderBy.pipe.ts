import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyOrderBy'
})
export class BizyOrderByPipe implements PipeTransform {
  transform<T>(items: Array<T>, order: 'asc' | 'desc' | null = null, property: string = ''): Array<T> {
    // No items
    if (!items || !order) {
      return items;
    }

    // Array with only one item
    if (items.length <= 1) {
      return items;
    }

    const sortByString = (items: Array<T>, order: 'asc' | 'desc'): Array<T> => {
      return items.sort((a: any, b: any) => {
        let aValue: any = a;
        let bValue: any = b;
        const nestedProperty = property.split('.');
        nestedProperty.forEach(_property => {
          aValue = aValue[_property];
          bValue = bValue[_property];
        });
  
        if ((typeof aValue === 'undefined' || aValue === null) && (typeof bValue === 'undefined' || bValue === null)) {
          return 0;
        }
  
        if ((typeof aValue === 'undefined' || aValue === null) && (typeof bValue !== 'undefined' && bValue !== null)) {
          return order === 'desc' ? 1 : -1;
        }
  
        if ((typeof aValue !== 'undefined' && aValue !== null) && (typeof bValue === 'undefined' || bValue === null) ) {
          return order === 'desc' ? -1 : 1;
        }
  
        if (aValue === bValue) {
          return 0;
        }
  
        if (order === 'desc') {
          return (this.#removeAccentsAndDiacritics(String(aValue)).toLowerCase() > this.#removeAccentsAndDiacritics(String(bValue)).toLowerCase() ? -1 : 1);
        }
  
        return (this.#removeAccentsAndDiacritics(String(bValue)).toLowerCase() > this.#removeAccentsAndDiacritics(String(aValue)).toLowerCase() ? -1 : 1);
      });
    }

    const sortByNumber = (items: Array<T>, order: 'asc' | 'desc'): Array<T> => {
      if (order === 'asc') {
        return items.sort((a, b) => Number(getValue(a)) - Number(getValue(b)));
      } else {
        return items.sort((a, b) => Number(getValue(b)) - Number(getValue(a)));
      }
    }

    const sortByDate = (items: Array<T>, order: 'asc' | 'desc'): Array<T> => {
      return items.sort((a, b) =>  {
        const aDate = parseDateString(getValue(a) as string)
        const bDate = parseDateString(getValue(b) as string)
        return order === 'asc' ? aDate.getTime() -  bDate.getTime() : bDate.getTime() -  aDate.getTime()
      });
    }

    const isDate = (value: string) => {
      const ddMMYYYYhhmmss =  /^\d{1,2}\/\d{1,2}\/\d{4}( \d{1,2}:\d{1,2}(:\d{1,2})?)?$/;
      return ddMMYYYYhhmmss.test(value);
    }
  
    const parseDateString = (value: string) => {
      const [datePart, timePart] = value.split(' ');
      const separator = value.includes('/') ? '/' : '-';
  
      const [day, month, year] = datePart.split(separator).map(Number);
  
      let hours = 0, minutes = 0, seconds = 0;
  
      if (timePart) {
          const [hourStr, minuteStr, secondStr] = timePart.split(':').map(Number);
          hours = isNaN(hourStr) ? 0 : hourStr;
          minutes = isNaN(minuteStr) ? 0 : minuteStr;
          seconds = isNaN(secondStr) ? 0 : secondStr;
      }
  
      return new Date(year, month - 1, day, hours, minutes, seconds);
    }

    const getValue = (item: T) => {
      let value = item;
      const nestedProperty = property.split('.');

      for (let i = 0; i < nestedProperty.length; i++) {
        const property = nestedProperty[i];
        if (!property || typeof value[property] === 'undefined' || value[property] === null) {
          value = null;
          break;
        }

        value = value[property];
      }

      return value;
    }

    let output: Array<T> = [...items];

    if (property === '') {
      if (typeof output[0] === 'number' && !isNaN(output[0])) {
        return sortByNumber(output, order);
      } else if (isDate(output[0] as string)) {
        return sortByDate(output, order);
      } else {
        return sortByString(output, order);
      }
    }

    const index = output.findIndex(_item => {
      const value = getValue(_item);
      return typeof value !== 'undefined' && value !== null;
    });

    if (index === -1) {
      return output;
    }


    const value = getValue(output[index]);
    if (typeof value === 'number' && !isNaN(value)) {
      return sortByNumber(output, order);
    } else if (isDate(value as string)) {
      return sortByDate(output, order);
    } else {
      return sortByString(output, order);
    }
  }

  #removeAccentsAndDiacritics(search: string): string {
    if (!search) {
      return '';
    }

    return search.normalize('NFD')!.replace(/[\u0300-\u036f]/g, '');
  }
}
