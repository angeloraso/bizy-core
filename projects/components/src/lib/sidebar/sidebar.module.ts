import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  SidebarComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SidebarModule {}
