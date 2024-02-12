import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuOptionComponent } from './menu-option/menu-option.component';

const COMPONENTS = [
  MenuComponent,
  MenuOptionComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class MenuModule {}
