import { NgModule } from '@angular/core';
import { BizySectionComponent } from './section.component';
import { BizySectionStartComponent } from './section-start/section-start.component';
import { BizySectionCenterComponent } from './section-center/section-center.component';
import { BizySectionEndComponent } from './section-end/section-end.component';

const COMPONENTS: Array<any> = [
  BizySectionComponent,
  BizySectionStartComponent,
  BizySectionCenterComponent,
  BizySectionEndComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizySectionModule {}
