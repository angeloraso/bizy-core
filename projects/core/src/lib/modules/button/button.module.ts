import { NgModule } from '@angular/core';
import { BizyButtonComponent } from './button.component';

const COMPONENTS: Array<any> = [
  BizyButtonComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyButtonModule {}
