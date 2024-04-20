import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BizyBreadcrumbComponent } from './breadcrumb.component';

const COMPONENTS = [BizyBreadcrumbComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class BizyBreadcrumbModule {}
