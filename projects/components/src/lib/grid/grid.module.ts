import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyGridComponent } from './grid.component';
import { BizyGridForDirective } from './grid.directive';
import { BizyGridRowComponent } from './grid-row/grid-row.component';

const COMPONENTS: Array<any> = [
  BizyGridComponent,
  BizyGridForDirective,
  BizyGridRowComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ScrollingModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizyGridModule {}
