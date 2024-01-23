import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';

const COMPONENTS = [
 TabsComponent,
 TabComponent
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TabsModule {}
