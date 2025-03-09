import { NgModule } from '@angular/core';
import { BizyToolbarComponent } from './toolbar.component';

const COMPONENTS: Array<any> = [
  BizyToolbarComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyToolbarModule {}
