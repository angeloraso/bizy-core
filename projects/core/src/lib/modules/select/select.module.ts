import { NgModule } from '@angular/core';
import { BizySelectComponent } from './select.component';
import { BizySelectOptionComponent } from './select-option/select-option.component';
import { BizySelectSelectedOptionComponent } from './select-selected-option/select-selected-option.component';

const COMPONENTS: Array<any> = [
  BizySelectComponent,
  BizySelectOptionComponent,
  BizySelectSelectedOptionComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySelectModule {}
