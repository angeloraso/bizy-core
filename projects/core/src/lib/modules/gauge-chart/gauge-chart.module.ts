import { NgModule } from '@angular/core';
import { BizyGaugeChartComponent } from './gauge-chart.component';
import { BizyGaugeChartPopupComponent } from './gauge-chart-popup.component';

const COMPONENTS: Array<any> = [
  BizyGaugeChartComponent,
  BizyGaugeChartPopupComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyGaugeChartModule {}
