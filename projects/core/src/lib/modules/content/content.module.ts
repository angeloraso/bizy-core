import { NgModule } from '@angular/core';
import { BizyContentComponent } from './content.component';

const COMPONENTS: Array<any> = [
  BizyContentComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyContentModule {}
