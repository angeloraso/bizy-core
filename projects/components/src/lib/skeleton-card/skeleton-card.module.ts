import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizySkeletonCardComponent } from './skeleton-card.component';

const COMPONENTS = [
  BizySkeletonCardComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BizySkeletonCardModule {}
