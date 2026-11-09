import { ModuleWithProviders, NgModule } from '@angular/core';
import { BizyTranslatePipe } from './translate.pipe';
import { BizyTranslateService } from './translate.service';
import { provideTranslateService, RootTranslateServiceConfig } from '@ngx-translate/core';

@NgModule({
  imports: [BizyTranslatePipe],
  exports: [BizyTranslatePipe],
  providers: [BizyTranslateService]
})

export class BizyTranslateModule {
  static forRoot(config?: RootTranslateServiceConfig): ModuleWithProviders<BizyTranslateModule> {
    return {
      ngModule: BizyTranslateModule,
      providers: provideTranslateService(config)
    };
  }
}
