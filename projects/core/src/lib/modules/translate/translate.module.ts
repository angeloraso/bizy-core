import { NgModule } from '@angular/core';
import { BizyTranslatePipe } from './translate.pipe';
import { BizyTranslateService } from './translate.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [BizyTranslatePipe],
  exports: [BizyTranslatePipe],
  providers: [BizyTranslateService]
})

export class BizyTranslateModule {
  static forRoot = TranslateModule.forRoot; 
}
