import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CheckboxModule } from '../checkbox';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableColumnArrowsComponent } from './table-column-arrows/table-column-arrows.component';
import { TableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import { TableScrollingComponent } from './table-scrolling/table-scrolling.component';

const COMPONENTS: Array<any> = [
  TableComponent,
  TableHeaderComponent,
  TableFooterComponent,
  TableRowComponent,
  TableColumnComponent,
  TableColumnArrowsComponent,
  TableScrollingDirective,
  TableScrollingComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ScrollingModule, CheckboxModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TableModule {}
