import { NgModule } from '@angular/core';
import { BizyBarLineChartComponent } from './bar-line-chart.component';
import { BizyBarLineChartPopupComponent } from './bar-line-chart-popup.component';
import { BizyBarChartComponent } from './bar-chart/bar-chart.component';
import { BizyLineChartComponent } from './line-chart/line-chart.component';


const COMPONENTS = [
  BizyBarLineChartComponent,
  BizyBarLineChartPopupComponent,
  BizyBarChartComponent,
  BizyLineChartComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class BizyBarLineChartModule {}
