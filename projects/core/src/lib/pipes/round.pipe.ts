import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyRound'
})
export class BizyRoundPipe implements PipeTransform {
  transform(value: number, mode: 'ceil' | 'floor' | 'round' = 'round'): number {
    if (typeof value !== 'number') {
      return value;
    }

    switch (mode) {
      case 'ceil':
        return Math.ceil(value);
      case 'floor':
        return Math.floor(value);
      default:
        return Math.round(value);
    }
  }
}
