import { NgModule } from '@angular/core';
import { BizyDatePickerComponent } from './date-picker.component';

const COMPONENTS: Array<any> = [
  BizyDatePickerComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyDatePickerModule {}
