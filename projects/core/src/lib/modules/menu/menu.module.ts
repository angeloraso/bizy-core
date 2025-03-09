import { NgModule } from '@angular/core';
import { BizyMenuComponent } from './menu.component';
import { BizyMenuOptionComponent } from './menu-option/menu-option.component';
import { BizyMenuTitleComponent } from './menu-title/menu-title.component';

const COMPONENTS: Array<any> = [
  BizyMenuComponent,
  BizyMenuOptionComponent,
  BizyMenuTitleComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyMenuModule {}
