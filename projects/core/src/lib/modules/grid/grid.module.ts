import { BizyGridForDirective } from './grid.directive';
import { NgModule } from '@angular/core';
import { BizyGridComponent } from './grid.component';
import { BizyGridRowComponent } from './grid-row/grid-row.component';

const COMPONENTS: Array<any> = [
  BizyGridComponent,
  BizyGridRowComponent
];

const DIRECTIVES: Array<any> = [
  BizyGridForDirective,
];

@NgModule({
  imports: COMPONENTS.concat(DIRECTIVES),
  exports: COMPONENTS.concat(DIRECTIVES),
})

export class BizyGridModule {}
