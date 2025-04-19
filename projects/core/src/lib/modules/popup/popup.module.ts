import { NgModule } from '@angular/core';
import { BizyPopupWrapperComponent } from './popup-wrapper/popup-wrapper.component';
import { BizyPopupService } from './popup.service';
import { BizyFullScreenPopupWrapperComponent } from './full-screen-popup-wrapper/full-screen-popup-wrapper.component';

const COMPONENTS = [
  BizyPopupWrapperComponent,
  BizyFullScreenPopupWrapperComponent
]
@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
  providers: [BizyPopupService]
})

export class BizyPopupModule {}
