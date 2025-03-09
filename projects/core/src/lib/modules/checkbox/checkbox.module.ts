import { NgModule } from '@angular/core';
import { BizyCheckboxComponent } from './checkbox.component';

const COMPONENTS: Array<any> = [
  BizyCheckboxComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyCheckboxModule {}
