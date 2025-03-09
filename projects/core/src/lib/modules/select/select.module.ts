import { NgModule } from '@angular/core';
import { BizySelectComponent } from './select.component';
import { BizySelectOptionComponent } from './select-option/select-option.component';

const COMPONENTS: Array<any> = [
  BizySelectComponent,
  BizySelectOptionComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySelectModule {}
