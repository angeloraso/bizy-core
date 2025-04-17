import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyExtractNumbers'
})
export class BizyExtractNumbersPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const numbers = value.match(/\d+/g);
    return numbers ? numbers.join('') : '';
  }
}
