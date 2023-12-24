import { AutoFocusDirective } from './auto-focus.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { TooltipDirective } from './tooltip.directive';
import { NgModule } from '@angular/core';
import { LoadingDirective } from './loading.directive';
import { OnlyPhoneDigitsDirective } from './only-phone-digits.directive';

const DIRECTIVES = [
  TooltipDirective,
  OnlyNumbersDirective,
  AutoFocusDirective,
  LoadingDirective,
  OnlyPhoneDigitsDirective
];
@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule {}
