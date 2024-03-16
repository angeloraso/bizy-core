import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { CheckboxModule } from '../checkbox';
import { FilterPipe, RangeFilterPipe } from './pipes';
import { FilterSectionRangeOptionComponent } from './filter-section-range-option/filter-section-range-option.component';
import { InputModule } from '../input';
import { SliderModule } from '../slider';
import { FilterSectionCheckboxOptionComponent } from './filter-section-checkbox-option/filter-section-checkbox-option.component';

const COMPONENTS = [
  FilterComponent,
  FilterSectionComponent,
  FilterSectionCheckboxOptionComponent,
  FilterSectionRangeOptionComponent,
  FilterPipe,
  RangeFilterPipe,
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule, InputModule, SliderModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [FilterPipe, RangeFilterPipe]
})
export class FilterModule {}
