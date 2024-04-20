import { BizyOnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { BizyLoadingDirective } from './loading.directive';
import { BizyOnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { BizyNgForTrackByIdDirective } from './track-by-id.directive';
import { BizyLongPressDirective } from './long-press.directive';

const DIRECTIVES = [
  BizyLoadingDirective,
  BizyLongPressDirective,
  BizyOnlyNumbersDirective,
  BizyOnlyPhoneDigitsDirective,
  BizyNgForTrackByIdDirective,
];
@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
export class BizyDirectivesModule {}
