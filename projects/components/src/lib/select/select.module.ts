import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizySelectComponent } from './select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySelectOptionComponent } from './select-option/select-option.component';
import { BizyInputModule } from '../input';
import { PortalModule } from '@angular/cdk/portal';

const COMPONENTS = [
  BizySelectComponent,
  BizySelectOptionComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, BizyInputModule, OverlayModule, PortalModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizySelectModule {}
