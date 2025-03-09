import { NgModule } from '@angular/core';
import { BizyFilterComponent } from './filter.component';
import { BizyFilterContentComponent } from './filter-content/filter-content.component';
import { BizyFilterSectionCheckboxOptionComponent } from './filter-section-checkbox-option/filter-section-checkbox-option.component';
import { BizyFilterSectionRangeOptionComponent } from './filter-section-range-option/filter-section-range-option.component';
import { BizyFilterSectionSearchOptionComponent } from './filter-section-search-option/filter-section-search-option.component';
import { BizyFilterSectionsComponent } from './filter-sections/filter-sections.component';
import { BizyFilterPipe, BizyRangeFilterPipe } from './pipes';
import { BizyFilterSectionComponent } from './filter-section/filter-section.component';

const COMPONENTS: Array<any> = [
  BizyFilterComponent,
  BizyFilterSectionComponent,
  BizyFilterContentComponent,
  BizyFilterSectionCheckboxOptionComponent,
  BizyFilterSectionRangeOptionComponent,
  BizyFilterSectionSearchOptionComponent,
  BizyFilterSectionsComponent
];

const PIPES: Array<any> = [
  BizyFilterPipe,
  BizyRangeFilterPipe
];

@NgModule({
  imports: COMPONENTS.concat(PIPES),
  exports: COMPONENTS.concat(PIPES),
  providers: PIPES
})

export class BizyFilterModule {}
