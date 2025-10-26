import { NgModule } from '@angular/core';
import { BizyPieChartComponent } from './pie-chart.component';
import { BizyPieChartPopupComponent } from './pie-chart-popup.component';

const COMPONENTS: Array<any> = [
  BizyPieChartComponent,
  BizyPieChartPopupComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyPieChartModule {}
