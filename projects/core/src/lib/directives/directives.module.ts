import { NgModule } from '@angular/core';
import { BizyCopyToClipboardDirective } from './copy-to-clipboard.directive';
import { BizyCurrencyFormatDirective } from './currency-format.directive';
import { BizyLoadingDirective } from './loading.directive';
import { BizyLongPressDirective } from './long-press.directive';
import { BizyOnlyNumbersDirective } from './only-numbers.directive';
import { BizyOnlyPhoneDigitsDirective } from './only-phone-digits.directive';
import { BizyTextEllipsisDirective } from './text-ellipsis.directive';
import { BizyTooltipDirective } from './tooltip.directive';
import { BizyTrackByIdDirective } from './track-by-id.directive';
import { BizyAutoFocusDirective } from './auto-focus.directive';

const DIRECTIVES: Array<any> = [
  BizyCopyToClipboardDirective,
  BizyCurrencyFormatDirective,
  BizyLoadingDirective,
  BizyLongPressDirective,
  BizyOnlyNumbersDirective,
  BizyOnlyPhoneDigitsDirective,
  BizyTextEllipsisDirective,
  BizyTooltipDirective,
  BizyTrackByIdDirective,
  BizyAutoFocusDirective
]

@NgModule({
  imports: DIRECTIVES,
  exports: DIRECTIVES
})

export class BizyDirectivesModule {}
