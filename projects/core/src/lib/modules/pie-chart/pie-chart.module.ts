import { NgModule } from '@angular/core';
import { BizyPieChartComponent } from './pie-chart.component';

const COMPONENTS: Array<any> = [
  BizyPieChartComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyPieChartModule {}
