import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BizyBarLineChartComponent } from './bar-line-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BizyBarLineChartComponent],
  exports: [BizyBarLineChartComponent],
  providers: [DecimalPipe]
})
export class BizyBarLineChartModule {}
