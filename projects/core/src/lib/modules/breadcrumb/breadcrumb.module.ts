import { NgModule } from '@angular/core';
import { BizyBreadcrumbComponent } from './breadcrumb.component';

const COMPONENTS: Array<any> = [
  BizyBreadcrumbComponent,
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})

export class BizyBreadcrumbModule {}
