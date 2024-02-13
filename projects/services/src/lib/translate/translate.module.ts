import { NgModule } from '@angular/core';
import { TranslateModule as ngxTranslateModule } from '@ngx-translate/core';
import { TranslateService } from './translate.service';

@NgModule({
  imports: [ngxTranslateModule.forRoot()],
  providers: [TranslateService]
})

export class TranslateModule {}
