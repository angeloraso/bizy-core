import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyFabButtonComponent } from './fab-button.component';

const COMPONENTS = [
  BizyFabButtonComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyFabButtonModule {}
