import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LineChartComponent],
  exports: [LineChartComponent],
  providers: [DecimalPipe]
})
export class LineChartModule {}
