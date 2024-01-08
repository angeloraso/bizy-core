import { OnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';
import { LoadingDirective } from './loading.directive';
import { OnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { NgForTrackByIdDirective } from './track-by-id.directive';
import { LongPressDirective } from './long-press.directive';

const DIRECTIVES = [
  LoadingDirective,
  LongPressDirective,
  OnlyNumbersDirective,
  OnlyPhoneDigitsDirective,
  NgForTrackByIdDirective,
];
@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
export class DirectivesModule {}
