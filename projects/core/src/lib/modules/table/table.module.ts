import { BizyTableScrollingDirective } from './table-scrolling/table-scrolling.directive';
import { NgModule } from '@angular/core';
import { BizyTableColumnFixedDirective } from './directives';
import { BizyTableComponent } from './table.component';
import { BizyTableColumnComponent } from './table-column/table-column.component';
import { BizyTableColumnArrowsComponent } from './table-column-arrows/table-column-arrows.component';
import { BizyTableFooterComponent } from './table-footer/table-footer.component';
import { BizyTableHeaderComponent } from './table-header/table-header.component';
import { BizyTableRowComponent } from './table-row/table-row.component';
import { BizyTableRowExpandContentComponent } from './table-row-expand-content/table-row-expand-content.component';
import { BizyTableScrollingComponent } from './table-scrolling/table-scrolling.component';

const COMPONENTS: Array<any> = [
  BizyTableComponent,
  BizyTableColumnComponent,
  BizyTableColumnArrowsComponent,
  BizyTableFooterComponent,
  BizyTableHeaderComponent,
  BizyTableRowComponent,
  BizyTableRowExpandContentComponent,
  BizyTableScrollingComponent
];

const DIRECTIVES: Array<any> = [
  BizyTableScrollingDirective,
  BizyTableColumnFixedDirective
];

@NgModule({
  imports: COMPONENTS.concat(DIRECTIVES),
  exports: COMPONENTS.concat(DIRECTIVES),
})

export class BizyTableModule {}
