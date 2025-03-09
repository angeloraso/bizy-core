import { NgModule } from '@angular/core';
import { BizyRadioComponent } from './radio.component';

const COMPONENTS: Array<any> = [
  BizyRadioComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyRadioModule {}
