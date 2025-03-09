import { NgModule } from '@angular/core';
import { BizyPopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { BizyPopupService } from './popup.service';

@NgModule({
  imports: [BizyPopupWrapperComponent],
  exports: [BizyPopupWrapperComponent],
  providers: [BizyPopupService]
})

export class BizyPopupModule {}
