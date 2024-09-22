import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyFilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';
import { BizyCheckboxModule } from '../checkbox';
import { BizyFilterPipe, BizyRangeFilterPipe } from './pipes';
import { BizyFilterSectionRangeOptionComponent } from './filter-section-range-option/filter-section-range-option.component';
import { BizyInputModule } from '../input';
import { BizyFilterSectionCheckboxOptionComponent } from './filter-section-checkbox-option/filter-section-checkbox-option.component';
import { BizyFilterSectionSearchOptionComponent } from './filter-section-search-option/filter-section-search-option.component';
import { BizyFilterSectionsComponent } from './filter-sections/filter-sections.component';
import { BizyFilterContentComponent } from './filter-content/filter-content.component';

const COMPONENTS: Array<any> = [
  BizyFilterComponent,
  BizyFilterContentComponent,
  BizyFilterSectionsComponent,
  BizyFilterSectionComponent,
  BizyFilterSectionCheckboxOptionComponent,
  BizyFilterSectionRangeOptionComponent,
  BizyFilterSectionSearchOptionComponent,
  BizyFilterPipe,
  BizyRangeFilterPipe,
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, BizyCheckboxModule, BizyInputModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [BizyFilterPipe, BizyRangeFilterPipe]
})
export class BizyFilterModule {}
