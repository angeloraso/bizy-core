import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BarChartComponent],
  exports: [BarChartComponent],
  providers: [DecimalPipe]
})
export class BarChartModule {}
