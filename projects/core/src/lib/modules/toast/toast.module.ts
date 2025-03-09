import { NgModule } from '@angular/core';
import { BizyToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { BizyToastService } from './toast.service';

@NgModule({
  imports: [BizyToastWrapperComponent],
  exports: [BizyToastWrapperComponent],
  providers: [BizyToastService]
})

export class BizyToastModule {}
