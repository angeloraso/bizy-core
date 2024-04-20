import { NgModule } from '@angular/core';
import { BizySidebarNewComponent } from './sidebar-new.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyAccordionModule } from '../accordion';
import { BizySidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { BizySidebarFloatingOptionComponent } from './sidebar-floating-option/sidebar-floating-option.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizySidebarFloatingOptionTitleComponent } from './sidebar-floating-option-title/sidebar-floating-option-title.component';

const COMPONENTS = [
  BizySidebarNewComponent,
  BizySidebarOptionComponent,
  BizySidebarFloatingOptionComponent,
  BizySidebarFloatingOptionTitleComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, BizyAccordionModule, OverlayModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizySidebarNewModule {}
