import { NgModule } from '@angular/core';
import { BizyBarLineChartComponent } from './bar-line-chart.component';

const COMPONENTS: Array<any> = [
  BizyBarLineChartComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyBarLineChartModule {}
