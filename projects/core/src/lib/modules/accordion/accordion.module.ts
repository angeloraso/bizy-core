import { NgModule } from '@angular/core';
import { BizyAccordionComponent } from './accordion.component';

const COMPONENTS: Array<any> = [
  BizyAccordionComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyAccordionModule {}
