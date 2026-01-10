import { NgModule } from '@angular/core';
import { BizyDonutChartComponent } from './donut-chart.component';
import { BizyDonutChartPopupComponent } from './donut-chart-popup.component';

const COMPONENTS: Array<any> = [
  BizyDonutChartComponent,
  BizyDonutChartPopupComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyDonutChartModule {}
