import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyOrderBy'
})
export class OrderByPipe implements PipeTransform {
  transform<T>(items: Array<T>, order: 'asc' | 'desc' | null = null, property: string = '', turnOff: boolean = false): Array<T> {
    if (turnOff) {
      return items;
    }

    // No items
    if (!items || !order) {
      return items;
    }

    // Array with only one item
    if (items.length <= 1) {
      return items;
    }

    let output: Array<T> = [...items];

    if (property === '') {
      if (order === 'asc') {
        output.sort();
        return output;
      }

      output.sort().reverse();
      return output;
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
      nestedProperty.forEach(_property => {
        if (_property) {
          value = value[_property];
        }
      });

      return value;
    }

    const index = output.findIndex(_item => {
      const value = getValue(_item);
      return typeof value !== 'undefined' && value !== null;
    });

    if (index === -1) {
      return output;
    }


    const value = getValue(output[index]);
    if (!isNaN(value as number)) {
      if (order === 'asc') {
        output = output.sort((a, b) => Number(getValue(a)) - Number(getValue(b)));
      } else {
        output = output.sort((a, b) => Number(getValue(b)) - Number(getValue(a)));
      }
      return output;
    } else if (isDate(value as string)) {
      output = output.sort((a, b) =>  {
        const aDate = parseDateString(getValue(a) as string)
        const bDate = parseDateString(getValue(b) as string)
        return order === 'asc' ? aDate.getTime() -  bDate.getTime() : bDate.getTime() -  aDate.getTime()
      });
      return output;
    } else {
      output.sort((a: any, b: any) => {
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
          return (aValue.toString().toLowerCase() > bValue.toString().toLowerCase() ? -1 : 1);
        }
  
        return (bValue.toString().toLowerCase() > aValue.toString().toLowerCase() ? -1 : 1);
      });
      return output;
    }
  }
}
