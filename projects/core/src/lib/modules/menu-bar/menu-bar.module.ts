import { NgModule } from '@angular/core';
import { BizyMenuBarComponent } from './menu-bar.component';
import { BizyMenuBarOptionComponent } from './menu-bar-option/menu-bar-option.component';

const COMPONENTS: Array<any> = [
  BizyMenuBarComponent,
  BizyMenuBarOptionComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyMenuBarModule {}
