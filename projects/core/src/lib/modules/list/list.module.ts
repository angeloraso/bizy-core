import { NgModule } from '@angular/core';
import { BizyListComponent } from './list.component';

const COMPONENTS: Array<any> = [
  BizyListComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyListModule {}
