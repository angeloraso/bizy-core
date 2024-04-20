import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BizyBarChartComponent } from './bar-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BizyBarChartComponent],
  exports: [BizyBarChartComponent],
  providers: [DecimalPipe]
})
export class BizyBarChartModule {}
