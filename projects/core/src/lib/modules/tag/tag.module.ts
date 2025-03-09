import { NgModule } from '@angular/core';
import { BizyTagComponent } from './tag.component';

const COMPONENTS: Array<any> = [
  BizyTagComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyTagModule {}
