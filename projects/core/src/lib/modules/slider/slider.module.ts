import { NgModule } from '@angular/core';
import { BizySliderComponent } from './slider.component';

const COMPONENTS: Array<any> = [
  BizySliderComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySliderModule {}
