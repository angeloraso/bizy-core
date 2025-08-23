import { NgModule } from '@angular/core';
import { BizyHeatMapChartComponent } from './heat-map-chart.component';

const COMPONENTS: Array<any> = [
  BizyHeatMapChartComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyHeatMapChartModule {}
