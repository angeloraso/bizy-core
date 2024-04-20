import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BizyLineChartComponent } from './line-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BizyLineChartComponent],
  exports: [BizyLineChartComponent],
  providers: [DecimalPipe]
})
export class BizyLineChartModule {}
