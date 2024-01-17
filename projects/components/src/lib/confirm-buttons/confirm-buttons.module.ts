import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmButtonsComponent } from './confirm-buttons.component';
import { ButtonModule } from '../button';

const COMPONENTS = [
  ConfirmButtonsComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, ButtonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ConfirmButtonsModule {}
