import { NgModule } from '@angular/core';
import { BizyPieChartComponent } from './pie-chart.component';
import { BizyPieChartPopupComponent } from './pie-chart-popup.component';
import { BizyPieChartSectionComponent } from './pie-chart-section/pie-chart-section.component';
import { BizyPieChartService } from './pie-chart.service';

const COMPONENTS: Array<any> = [
  BizyPieChartComponent,
  BizyPieChartPopupComponent,
  BizyPieChartSectionComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
  providers: [BizyPieChartService]
})

export class BizyPieChartModule {}