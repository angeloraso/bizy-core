import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyRepeat'
})
export class BizyRepeatPipe implements PipeTransform {

  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i);
  }
}
