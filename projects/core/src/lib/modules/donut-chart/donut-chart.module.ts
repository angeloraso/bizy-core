import { NgModule } from '@angular/core';
import { BizyDonutChartComponent } from './donut-chart.component';
import { BizyDonutChartPopupComponent } from './donut-chart-popup.component';
import { BizyDonutChartSectionComponent } from './donut-chart-section/donut-chart-section.component';
import { BizyDonutChartService } from './donut-chart.service';

const COMPONENTS: Array<any> = [
  BizyDonutChartComponent,
  BizyDonutChartPopupComponent,
  BizyDonutChartSectionComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
  providers: [BizyDonutChartService]
})

export class BizyDonutChartModule {}