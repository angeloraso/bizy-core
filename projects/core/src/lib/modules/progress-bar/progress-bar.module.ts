import { NgModule } from '@angular/core';
import { BizyProgressBarComponent } from './progress-bar.component';

const COMPONENTS = [
  BizyProgressBarComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class BizyProgressBarModule {}
