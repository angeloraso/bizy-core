import { NgModule } from '@angular/core';
import { BizyFormComponent } from './form.component';

const COMPONENTS: Array<any> = [
  BizyFormComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyFormModule {}
