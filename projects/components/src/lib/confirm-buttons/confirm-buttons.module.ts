import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyConfirmButtonsComponent } from './confirm-buttons.component';
import { BizyButtonModule } from '../button';

const COMPONENTS = [
  BizyConfirmButtonsComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, BizyButtonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyConfirmButtonsModule {}
