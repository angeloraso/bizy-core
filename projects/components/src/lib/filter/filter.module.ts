import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { FilterSectionOptionComponent } from './filter-section-option/filter-section-option.component';
import { CheckboxModule } from '../checkbox';
import { FilterPipe } from './filter.pipe';

const COMPONENTS = [
  FilterComponent,
  FilterSectionComponent,
  FilterSectionOptionComponent,
  FilterPipe
];

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, CheckboxModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [FilterPipe]
})
export class FilterModule {}
