import { Pipe, PipeTransform, Inject } from '@angular/core';
import { BizyTranslateService } from '../services/translate';

@Pipe({
  name: 'translate',
})
export class BizyTranslatePipe implements PipeTransform {
  constructor(@Inject(BizyTranslateService) private translate: BizyTranslateService) {}

  transform(label: string): string {
    return this.translate.get(label);
  }
}
