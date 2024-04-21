import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BizyTranslateService } from './translate.service';

@NgModule({
  imports: [TranslateModule.forRoot()],
  providers: [BizyTranslateService]
})

export class BizyTranslateModule {}
