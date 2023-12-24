import { Pipe, PipeTransform, Inject } from '@angular/core';
import { TranslateService } from '../translate/translate.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(TranslateService) private translate: TranslateService) {}

  transform(label: string): string {
    return this.translate.get(label);
  }
}
