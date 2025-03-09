import { NgModule } from '@angular/core';
import { BizyInputComponent } from './input.component';
import { BizyInputOptionComponent } from './input-option/input-option.component';

const COMPONENTS: Array<any> = [
  BizyInputComponent,
  BizyInputOptionComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyInputModule {}
