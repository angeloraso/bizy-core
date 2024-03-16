import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

const COMPONENTS = [
  SliderComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SliderModule {}
