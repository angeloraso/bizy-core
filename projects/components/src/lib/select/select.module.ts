import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectOptionComponent } from './select-option/select-option.component';

const COMPONENTS = [
  SelectComponent,
  SelectOptionComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SelectModule {}
