import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { OverlayModule } from '@angular/cdk/overlay';

const COMPONENTS = [
  ButtonComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ButtonModule {}
