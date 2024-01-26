import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarFooterComponent } from './sidebar-footer/sidebar-footer.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarOptionComponent } from './sidebar-option/sidebar-option.component';

const COMPONENTS = [
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarOptionComponent,
  SidebarFooterComponent
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SidebarModule {}
