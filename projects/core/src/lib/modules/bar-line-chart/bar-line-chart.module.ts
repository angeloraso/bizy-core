import { NgModule } from '@angular/core';
import { BizyBarLineChartComponent } from './bar-line-chart.component';
import { BizyBarLineChartPopupComponent } from './bar-line-chart-popup.component';

const COMPONENTS: Array<any> = [
  BizyBarLineChartComponent,
  BizyBarLineChartPopupComponent
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyBarLineChartModule {}
