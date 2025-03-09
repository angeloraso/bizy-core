import { NgModule } from '@angular/core';
import { BizyToggleComponent } from './toggle.component';

const COMPONENTS: Array<any> = [
  BizyToggleComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyToggleModule {}
