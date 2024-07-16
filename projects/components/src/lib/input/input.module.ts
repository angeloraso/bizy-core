import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyInputComponent } from './input.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyInputOptionComponent } from './input-option/input-option.component';

const COMPONENTS = [BizyInputComponent, BizyInputOptionComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyInputModule {}
