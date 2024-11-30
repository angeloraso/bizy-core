import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyTableComponent } from './table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BizyCheckboxModule } from '../checkbox';
import { BizyTableHeaderComponent } from './table-header/table-header.component';
import { BizyTableFooterComponent } from './table-footer/table-footer.component';
import { BizyTableRowComponent } from './table-row/table-row.component';
import { BizyTableColumnComponent } from './table-column/table-column.component';
import { BizyTableColumnArrowsComponent } from './table-column-arrows/table-column-arrows.component';
import { BizyTableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import { BizyTableScrollingComponent } from './table-scrolling/table-scrolling.component';
import { BizyAccordionModule } from '../accordion';
import { BizyTableRowExpandContentComponent } from './table-row-expand-content/table-row-expand-content.component';
import { BizyTableColumnFixedDirective } from './directives';

const COMPONENTS: Array<any> = [
  BizyTableComponent,
  BizyTableHeaderComponent,
  BizyTableFooterComponent,
  BizyTableRowComponent,
  BizyTableColumnComponent,
  BizyTableColumnArrowsComponent,
  BizyTableScrollingDirective,
  BizyTableScrollingComponent,
  BizyTableRowExpandContentComponent,
];

const DIRECTIVES: Array<any> = [
  BizyTableColumnFixedDirective
]

@NgModule({
  imports: [CommonModule, FormsModule, ScrollingModule, BizyCheckboxModule, BizyAccordionModule],
  declarations: COMPONENTS.concat(DIRECTIVES),
  exports: COMPONENTS.concat(DIRECTIVES)
})
export class BizyTableModule {}
