import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PieChartComponent],
  exports: [PieChartComponent],
  providers: [DecimalPipe]
})
export class PieChartModule {}
