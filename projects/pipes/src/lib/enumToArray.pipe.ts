import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bizyEnumToArray'
})
export class BizyEnumToArrayPipe implements PipeTransform {
  transform(enumObj: any): { key: string; value: any }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key))) // Only keep the keys, not the reverse mappings in numeric enums
      .map(key => ({ key, value: enumObj[key] }));
  }
}