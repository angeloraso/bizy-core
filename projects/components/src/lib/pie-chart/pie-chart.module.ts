import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BizyPieChartComponent } from './pie-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BizyPieChartComponent],
  exports: [BizyPieChartComponent],
  providers: [DecimalPipe]
})
export class BizyPieChartModule {}
