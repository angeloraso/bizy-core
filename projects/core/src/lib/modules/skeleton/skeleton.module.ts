import { NgModule } from '@angular/core';
import { BizySkeletonComponent } from './skeleton.component';

const COMPONENTS: Array<any> = [
  BizySkeletonComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySkeletonModule {}
