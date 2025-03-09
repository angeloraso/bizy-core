import { NgModule } from '@angular/core';
import { BizyCalendarComponent } from './calendar.component';

const COMPONENTS: Array<any> = [
  BizyCalendarComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyCalendarModule {}
