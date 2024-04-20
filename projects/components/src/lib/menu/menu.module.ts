import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyMenuComponent } from './menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { BizyMenuTitleComponent } from './menu-title/menu-title.component';

const COMPONENTS = [
  BizyMenuComponent,
  BizyMenuOptionComponent,
  BizyMenuTitleComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyMenuModule {}
