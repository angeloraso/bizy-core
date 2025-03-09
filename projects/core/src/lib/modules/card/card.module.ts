import { NgModule } from '@angular/core';
import { BizyCardComponent } from './card.component';

const COMPONENTS: Array<any> = [
  BizyCardComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyCardModule {}
