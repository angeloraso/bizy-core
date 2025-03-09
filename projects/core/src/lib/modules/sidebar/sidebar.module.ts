import { NgModule } from '@angular/core';
import { BizySidebarComponent } from './sidebar.component';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import { BizySidebarFloatingOptionTitleComponent } from './sidebar-floating-option-title/sidebar-floating-option-title.component';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';

const COMPONENTS: Array<any> = [
  BizySidebarComponent,
  BizySidebarFloatingOptionComponent,
  BizySidebarFloatingOptionTitleComponent,
  BizySidebarOptionComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySidebarModule {}
