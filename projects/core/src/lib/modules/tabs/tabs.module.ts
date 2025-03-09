import { NgModule } from '@angular/core';
import { BizyTabsComponent } from './tabs.component';
import { BizyTabComponent } from './tab/tab.component';

const COMPONENTS: Array<any> = [
  BizyTabsComponent,
  BizyTabComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyTabsModule {}
