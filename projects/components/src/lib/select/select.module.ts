import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizySelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySelectOptionComponent } from './select-option/select-option.component';
import { BizyInputModule } from '../input';

const COMPONENTS = [
  BizySelectComponent,
  BizySelectOptionComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizySelectModule {}
