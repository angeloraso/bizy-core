import { NgModule } from '@angular/core';
import { BizyCopyToClipboardService } from './copy-to-clipboard.service';
import { BizyCopyToClipboardDirective } from './copy-to-clipboard.directive';

const DIRECTIVES = [
  BizyCopyToClipboardDirective,
];

@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
  providers: [BizyCopyToClipboardService]
})
export class BizyCopyToClipboardModule {}
