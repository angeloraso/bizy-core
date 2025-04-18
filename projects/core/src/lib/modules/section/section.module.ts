import { NgModule } from '@angular/core';
import { BizySectionComponent } from './section.component';

const COMPONENTS: Array<any> = [
  BizySectionComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySectionModule {}
