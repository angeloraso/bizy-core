import { NgModule } from '@angular/core';
import { BizyStackedBarChartComponent } from './stacked-bar-chart.component';
import { BizyStackedBarChartSegmentComponent } from './stacked-bar-chart-segment/stacked-bar-chart-segment.component';

const COMPONENTS: Array<any> = [
  BizyStackedBarChartComponent,
  BizyStackedBarChartSegmentComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})

export class BizyStackedBarChartModule {}
