import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyTabsComponent } from './tabs.component';
import { BizyTabComponent } from './tab/tab.component';

const COMPONENTS = [
 BizyTabsComponent,
 BizyTabComponent
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyTabsModule {}
